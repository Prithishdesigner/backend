const express = require("express");
const router = express.Router();



const axios = require('axios');



const formData = require("../models/forms");
const slackMessage = require("../utils/slackMessage");







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


router.post("/details", async function (req, res) {
    console.log(req.body);
    const email = req.body.email;
    try {

      const existingUser = await formData.findOne({email})
    if (existingUser){
      console.log("Email already exist's");

      return res.status(400).json({message:"Email already exist's"});

    }

      const newdata = new formData(req.body);
      await newdata.save();
      // await slack()
      await s2axios(req.body)
      res.json({ message: "Data added successfully" });
    } catch (error) {
      res.json({ message: "Failed" });
    }




  });


  const s2axios = async (userDetails) => {
    const config = {
      method: 'post',
      url: 'https://finmsme-2.dwtech.in/send-message',
      data: userDetails
    };
    try {
      const response = await axios(config);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }


  

  module.exports = router;