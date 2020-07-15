import nodemailer from "nodemailer";

const sendEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MARVEL_EMAIL,
    pass: process.env.MARVEL_PASSWORD // naturally, replace both with your real credentials or an application-specific password
  }
});

export default sendEmail

