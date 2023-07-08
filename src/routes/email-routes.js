const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/requestUpdate/:id', async (req, res) => {
  const spotId = req.params.id;
  const spotData = req.body;

  // Typically, you'll want to fetch the current spot data from the database here.
  // For simplicity, we're skipping that step.

  const transporter = nodemailer.createTransport({
    service: 'gmail', // or another email service
    auth: {
      user: 'peterwmcclelland@gmail.com', // your email
      pass: 'Dogbath741!' // your email password
    }
  });

  const mailOptions = {
    from: 'tilebarespresso@gmail.com', // sender address
    to: 'peterwmcclelland@gmail.com', // list of receivers
    subject: `Update request for spot ${spotId}`, // Subject line
    text: JSON.stringify(spotData, null, 2), // plain text body
    // Here we're just sending the new data as plain text for simplicity.
    // In a real application, you'd probably want to format this in a more readable way,
    // and include a link to a page where the approver can view the changes and approve or reject them.
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent');
    }
  });
});

module.exports = router;
