const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');



const axios = require('axios');



const formData = require("../models/forms");
const slackMessage = require("../utils/slackMessage");



// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  port: 465,               // true for 465, false for other ports
  host: "smtp.gmail.com",
     auth: {
          user: 'prithishdummy28@gmail.com',
          pass: 'naqogivfcadjkyie',
       },
  secure: true,
  });



// router.get('/pri',(req,res) =>{
//     res.send("success");
//     console.log("hello world my");
// });

// router.get('/details',(req,res) =>{
//     res.send("success");
//     console.log("hello world my");
// });



router.get("/details", async function (req, res) {
    // console.log(req.body);
    try {
      const newdata = await formData.find();
    //   res.json(newdata);
      res.json({data:newdata, message: "Data added successfully" });
    } catch (error) {
      res.json({ message: "Failed" });
    }
  });




router.post('/details', async function (req, res) {
  try {
    console.log(req.body);
    if (!req.body.email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    const email = req.body.email;

    const existingUser = await formData.findOne({ email });
    if (existingUser) {
      console.log("Email already exists");
      return res.status(400).json({ message: "Email already exists" });
    }

    const newdata = new formData(req.body);
    await newdata.save();

    // Uncomment and test
    // await slack()
    // await s2axios(req.body)

    // Send email
    const maildata = {
      from: 'prithishdummy28@gmail.com',
      to: email,
      subject: 'Hi Sir',
      text: 'Welcome',
      html: '<h1>Send Mail</h1>'
    };

    const info = await transporter.sendMail(maildata);
    console.log('Mail sent', info.messageId);
    res.status(200).json({ message: 'Data added successfully', message_id: info.messageId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed' });
  }
});




  router.post ('/detail', (req, res)=>{
    const {email} = req.body;
    const maildata = {
      from:'prithishdummy28@gmail.com',
      to:email,
      subject:'hi sir',
      text:'welcome',
      html:'<h1>send mail</h1>',
    };

        transporter.sendMail(maildata, (error, info)=>{
              if (error) {
                return console.log(error);
              }
              res.status(200).send({message: "mail send",message_id: info.message});

        });



  });

  


  // const s2axios = async (userDetails) => {
  //   const config = {
  //     method: 'post',
  //     url: 'https://finmsme-2.dwtech.in/send-message',
  //     data: userDetails
  //   };
  //   try {
  //     const response = await axios(config);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }


  

  module.exports = router;