const express = require("express");
const router = express.Router();

const Location = require("../models/Locations");


router.get("/getAllBookings", async(req,res)=>{

    try {
        const bookiongs = await Location.find()
        res.send(bookiongs)
    } catch (error) {
        return res.status(400).json({ error })
    }

});

// admin screen add new locations

router.post("/addlocation",async(req,res) => {
    try {
        const newlocation = new Location(req.body)
        await newlocation.save()
        res.send("New Room Added Successfully !")
    } catch (error) {
        return res.status(400).json({ error })
    }
})



router.get('/getlocations', async (req, res) => {
  try {
    const locations = await Location.find(); // Fetch locations from your database
    res.json(locations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to delete a location by ID
router.delete('/getlocations/:locationId', async (req, res) => {
  const { locationId } = req.params;

  try {
    // Find the location by ID and delete it
    await Location.findByIdAndDelete(locationId);
    res.json({ message: 'Location deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports=router;