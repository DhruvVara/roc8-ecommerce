const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
// //   secure: true,
//   auth: {
//     user: "reginald7@ethereal.email",
//     pass: "vntDH753rghUtYSsvP",
//   },
// });

var transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "8f076b6ebd67c8",
    pass: "cb15540f037d94",
  },
});

exports.sendEmail = async (to, subject, data) => {
  try {
    const mailOptions = {
      from: `"dhruv" <dhruv@gmail.com>`,
      to,
      subject,
      html: data,
    };

    console.log("mail options -------", mailOptions);

    await transporter.sendMail(mailOptions, (error, res) => {
      if (error) {
        return console.log("mail error ----- ", error.message);
      }
      console.log(res);
    });

    console.log("Message sent successfully!");
  } catch (err) {
    console.log("Error: ", err);
  }
};

// const transporter = nodemailer.transporter({
//   service: "gmail",
//   auth: {
//     user: process.env.GMAIL_EMAIL,
//     pass: process.env.GMAIL_PASSWORD,
//   },
// });

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: true,
//   auth: {
//     user: "",
//     pass: "",
//   },
// });

// exports.sendEmail = async (
//   to = "mailto:dhruv@zealousys.com",
//   subject = "logIn",
//   data = "Logged in successfully"
// ) => {
//   try {
//     const mailOptions = {
//       from: "mailto:dhruv@zealousys.com",
//       to,
//       subject,
//       text: data,
//     };

//     await transporter.sendMail(mailOptions, (err, res) => {
//       if (err) {
//         return console.log("mail error", err);
//       }
//       console.log(res);
//     });

//     console.log("Message sent successfully!");
//   } catch (err) {
//     console.log("Error: ", err);
//   }
// };

// transporter.verify(function (error, success) {
//   if (error) {
//     console.log(error.message);
//   } else {
//     console.log("Server is ready to take our messages");
//   }
// });

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.ZEALOUS_EMAIL_USER,
//     pass: process.env.ZEALOUS_EMAIL_PASS,
//   },
// });

// exports.sendEmail = async (email, url) => {
//   try {
//     const mailOptions = {
//       from: process.env.ZEALOUS_EMAIL_USER,
//       to: mailto:dhruv@zealousys.com,
//       subject: "Reset you password",
//       html: <h2>Please click on the following to reset your password ${url}</h2>,
//     };
//     await transporter.sendMail(mailOptions);
//   } catch (err) {
//     // throw new Error(err.message);
//     console.log("errorr", err.message);
//   }
// };
