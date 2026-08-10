const mongoose = require('mongoose');
const EventOutbox = require('../models/eventOutbox');
const User = require('../models/user');
const { Resend } = require('resend');

const resend = new Resend(String(process.env.RESEND_API_KEY));

/**
 * Processes pending events in the EventOutbox collection.
 * This ensures atomic database updates aren't blocked by slow email dispatch,
 * while guaranteeing at-least-once delivery for notifications.
 */
async function processOutbox() {
    try {
        const pendingEvents = await EventOutbox.find({ status: 'pending' }).limit(50);
        
        for (const event of pendingEvents) {
            try {
                let toEmail, subject, html;

                if (event.type === 'SUCCESSION_NOTIFICATION') {
                    const { userId, teamName, role, trigger } = event.payload;
                    const user = await User.findById(userId);
                    if (!user) {
                        event.status = 'failed';
                        event.error = 'User not found';
                        await event.save();
                        continue;
                    }
                    toEmail = user.gmail;
                    subject = `You are now the ${role} of ${teamName}`;
                    html = `
                        <p>Hi ${user.firstName},</p>
                        <p>Due to the departure of the previous owner, you have been automatically promoted to <strong>${role}</strong> of the team <strong>${teamName}</strong>.</p>
                        <p>Thank you for your continued contributions!</p>
                    `;
                } else if (event.type === 'ADMIN_FALLBACK_NOTIFICATION') {
                    const { ownerId, teamName } = event.payload;
                    const owner = await User.findById(ownerId);
                    if (!owner) {
                        event.status = 'failed';
                        event.error = 'Owner not found';
                        await event.save();
                        continue;
                    }
                    toEmail = owner.gmail;
                    subject = `Admin departure in ${teamName}`;
                    html = `
                        <p>Hi ${owner.firstName},</p>
                        <p>An admin has left the team <strong>${teamName}</strong>. Any incomplete tasks assigned to them have been temporarily reassigned to you to prevent orphaned issues.</p>
                        <p>Please review your team's active issues and reassign them as needed.</p>
                    `;
                } else {
                    event.status = 'processed'; // Unknown type, just skip
                    await event.save();
                    continue;
                }

                if (toEmail) {
                    const { error } = await resend.emails.send({
                        from: 'CodeSarthi <nova@codesarthi.in>',
                        to: [toEmail],
                        subject: subject,
                        html: html
                    });

                    if (error) {
                        event.status = 'failed';
                        event.error = error.message;
                    } else {
                        event.status = 'processed';
                        event.processedAt = new Date();
                    }
                    await event.save();
                }

            } catch (err) {
                console.error(`Error processing outbox event ${event._id}:`, err);
                event.status = 'failed';
                event.error = err.message;
                await event.save();
            }
        }
    } catch (err) {
        console.error("Outbox processor failed to fetch events:", err);
    }
}

/**
 * Starts the outbox processor interval
 */
function startOutboxProcessor(intervalMs = 60000) {
    console.log(`Starting Outbox Processor with interval ${intervalMs}ms`);
    setInterval(processOutbox, intervalMs);
    // run immediately on start
    processOutbox();
}

module.exports = {
    processOutbox,
    startOutboxProcessor
};
