import { createTransport } from "nodemailer";

const sendMail = async ({ gmail, subject, html }) => {
    const transporter = createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "YOUR_GMAIL@gmail.com",
            pass: "GMAIL_APP_PASSWORD",
        },
    });

    await transporter.sendMail({
        from: '"Envvo" <YOUR_GMAIL@gmail.com>',
        to: gmail,
        subject,
        html,
    });
};

export default sendMail;
