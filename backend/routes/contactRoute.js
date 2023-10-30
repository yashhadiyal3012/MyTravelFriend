const express = require("express");
const router = express.Router();

const Contact = require("../models/Contacts");

router.get("/getcontacts", async(req,res)=>{

    try {
        const contacts = await Contact.find({})
        res.send(contacts)
    } catch (error) {
        return res.status(400).json({ error })
    }
});

module.exports=router;