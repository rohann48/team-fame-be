const nodemailer = require("nodemailer");

export const mailService = (name, toMail) => {
  // Create a transporter using SMTP or other service like Gmail
  const transporter = nodemailer.createTransport({
    service: "gmail", // you can use other services like 'smtp.mailtrap.io', 'sendgrid', etc.
    auth: {
      user: "your-email@gmail.com",
      pass: "your-email-password",
    },
  });

  // Email data
  const mailOptions = {
    from: "your-email@gmail.com", // Sender address
    to: "customer-email@example.com", // List of recipients
    subject: "Order Confirmation – Your Order #[Order Number]", // Subject line
    text: `Dear [Customer Name],\n\nThank you for your order #[Order Number]! We’re processing it now.\n\nOrder Details:\n- Item 1: [Quantity] x [Price]\n- Item 2: [Quantity] x [Price]\n\nShipping Address:\n[Customer Address]\n\nYour order will be shipped soon. You will receive tracking info once it's on the way.\n\nBest regards,\n[Your Company Name]`,
    // Optionally, you can use HTML to format the email
    // html: '<p>Your HTML content</p>',
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent successfully:", info.response);
    }
  });
};
