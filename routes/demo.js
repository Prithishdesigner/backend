const express = require("express");
const router = express.Router();



const formData = require("../models/forms");



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
      res.json({ message: "Data added successfully" });
    } catch (error) {
      res.json({ message: "Failed" });
    }
  });

  module.exports = router;