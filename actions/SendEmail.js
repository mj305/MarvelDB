import nodemailer from "nodemailer";

const sendEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'marvelcomicsreactapp@gmail.com',
    pass: 'Marvel@123' // naturally, replace both with your real credentials or an application-specific password
  }
});





export default sendEmail

