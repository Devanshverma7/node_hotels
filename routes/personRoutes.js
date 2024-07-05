const express = require('express');
const router = express.Router();
const Person = require("../models/person");

// POST route to add a Person
router.post("/person", async (req, res) => {
  try {
    // Body data after HTTP req's body parsing
    const data = req.body;

    // Create a new Person doc using the mongoose model
    const newPerson = new Person(data);

    // Save the response to the database
    const response = await newPerson.save();
    console.log("Data saved");
    res.status(200).json(response);
  } catch (err) {
    // Catch block if an error occurs
    console.error("Error saving data", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched!");
    res.status(200).json(data);
  } catch (err) {
    console.log("Error Fetching Data: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    // validation of req - for workType exist in db or not
    if(workType=='chef' || workType=='waiter' || workType=='manager'){
      const response = await Person.find({work: workType});
      console.log("response fetched!");
      res.status(200).json(response);
    }
    else{
      res.status(404).json({error: 'Invalid work type'});
    }
  } catch (err) {
    console.log("Error Fetching Data: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.put("/:person_id", async (req,res)=>{
  try{
    const person_id = req.params.person_id;
    const update = req.body;

    const response = await Person.findByIdAndUpdate(person_id,update,{
      new: true, // return the updated docs
      runValidators: true, // run mongoose validation (model validations)
    })

    if(!response){
      return res.status(404).json({error: "Person not found"});
    }

    console.log('data updated!');
    res.status(200).json(response);
  } catch (err) {
    console.log("Error Fetching Data: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
})
router.delete("/:person_id", async (req,res)=>{
  try{
    const person_id = req.params.person_id;

    const response = await Person.findByIdAndDelete(person_id);

    if(!response){
      return res.status(404).json({error: "Person not found"});
    }
    console.log(`person deleted!`);
    res.status(200).json(response);
  } catch (err) {
    console.log("Error Fetching Data: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

module.exports = router;