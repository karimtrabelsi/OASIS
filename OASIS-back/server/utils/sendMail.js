const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host:  'smtp.gmail.com',
      //service: process.env.SERVICE,
      port: 587,
      secure: true,
      auth: {
        user: 'testahmedahmed210@gmail.com',
        pass: 'rrvhansvnylaxsux'
      },
    });

        await transporter.sendMail({
      from: 'testahmedahmed210@gmail.com',
      to: email,
      subject: subject,
      text: text,
    });

    
    console.log("email sent sucessfully");
  } catch (error) {
    console.log(error, "email not sent");
    console.log(process.env.USER);
    console.log(process.env.PASS);
  }
};

module.exports = sendEmail;
