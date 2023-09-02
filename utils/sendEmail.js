const nodemailer = require("nodemailer");
const { app_logo } = require("./b64Images");

const sampleSalutation = `Hello,`
const sampleContent = `
  <p>Kindly be informed that a customer has booked an appointment.</p>
  <p>Kindly find the details of the appointment below:</p>
  <ul>
      <li><strong>Name:</strong> {name}</li>
      <li><strong>Email:</strong> {email}</li>
      <li><strong>Service:</strong> {type}</li>
      <li><strong>Date:</strong> {str_date}</li>
  </ul>
`;

const sendEmail = async (options) => {
  if (!options) return

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL, 
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const html_style = `
  <style>
      /* Add some styling to your email */
      body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
      }
      
      .container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0px 3px 10px rgba(0,0,0,0.1);
      }
      
      .header {
          display: flex;
          align-content: center;
          justify-content: center;
          background-color: #a6448d;
          color: #ffffff;
          padding: 10px;
          text-align: center;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
      }
      
      .content {
          padding: 20px;
      }
  </style>
  `

  const html = options.html || `<!DOCTYPE html>
  <html>
  <head>
      ${html_style}
  </head>
  <body>
      <div class="container">
          <div class="header">
              ${app_logo}<h1>Ridge Dental</h1>
          </div>
          <div class="content">
              <h3>${options.salutation}</h3>
              ${options.content}
          </div>
      </div>
  </body>
  </html>`;

  const message = {
    from: `${process.env.FROM_NAME}, <${process.env.FROM_EMAIL}>`, // sender address
    to: options.email,
    cc: options.cc,
    subject: options.subject,
    text: options.message,
    html: html,
  }
const info= await transporter.sendMail(message);
  console.log("Message sent: %s", info.messageId);
  
}

module.exports = sendEmail;