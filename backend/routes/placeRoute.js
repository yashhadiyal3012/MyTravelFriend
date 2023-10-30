const express = require("express");
const router = express.Router();

const Place = require("../models/Places");

router.get("/getallplaces" , async(req,res)=>{
    try {
        const places = await Place.find({})
        res.send(places);
    } catch (error) {
        return res.status(400).json({ error });
    }
});
router.delete("/deleteplace/:roomId", async (req, res) => {
    const roomId = req.params.roomId;

    try {
        const deletedRoom = await Place.findByIdAndRemove(roomId);
        if (!deletedRoom) {
            return res.status(404).json({ message: "Room not found" });
        }

        return res.json({ message: "Room deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
});


router.post("/getPlaceById" , async(req,res)=>{

    const placesid = req.body.placesid

    try {
        const place = await Place.findOne({_id:placesid})
        res.send(place);
    } catch (error) {
        return res.status(400).json({ error });
    }
});

router.post("/getPlaceByIdFood" , async(req,res)=>{

    const placesid = req.body.placesid

    try {
        const place = await Place.findOne({_id:placesid})
        res.send(place);
    } catch (error) {
        return res.status(400).json({ error });
    }
});

router.post("/addroom",async(req,res) => {
    try {
        const newroom = new Place(req.body)
        await newroom.save()
        res.send("New Room Added Successfully !")
    } catch (error) {
        return res.status(400).json({ error })
    }
})
router.put("/updateplace/:roomId", async (req, res) => {
    const roomId = req.params.roomId;
    const updatedRoomData = req.body;
  
    try {
      // Find the room by ID and update its data
      const updatedRoom = await Place.findByIdAndUpdate(roomId, updatedRoomData, {
        new: true, // Return the updated room after the update
      });
  
      if (!updatedRoom) {
        return res.status(404).json({ message: "Room not found" });
      }
  
      return res.json({ message: "Room updated successfully", room: updatedRoom });
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
  });

module.exports = router;