const TeamMember = require("../../models/teamMember");
const { broadcastService } = require("./BroadcastService");

async function broadcastToTeam(teamId, payload) {
    try {
        const members = await TeamMember.find({ teamId, status: "active" });
        const participants = members.map(m => ({ _id: m.userId }));
        broadcastService(participants, payload);
    } catch (err) {
        console.error("Error in broadcastToTeam:", err);
    }
}

module.exports = { broadcastToTeam };
