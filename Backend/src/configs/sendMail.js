require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.error("SMTP verification failed:", error);
    } else {
        console.log("SMTP server is ready to take messages");
    }
});

module.exports = async ({ gmail, subject, html }) => {
    await transporter.sendMail({
        from: "CodeSarthi Manager <codesarthi.axonic@gmail.com>",
        to: gmail,
        subject,
        html
    });
};
