const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/register", async (req, res) => {

    const newUser = new User(req.body);

  try {
    const user = await newUser.save();
    res.send("User Registered Successfully");

  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/login",async(req,res)=>{

    const {email , password} = req.body

    try {
        
        const user = await User.findOne({email:email, password:password})

        if(user){
          res.send(user)
        }
        else{
            return res.status(400).json({ message : 'Login failed'})
        }
    } catch (error) {
        return res.status(400).json({ error })
    }


});

router.get("/getAllUsers", async(req,res)=>{
  try {
    const users = await User.find()
    res.send(users);
  } catch (error) {
    return res.status(400).json({ error });
  }
})
router.delete("/deleteUser/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    // Find the user by ID and delete it
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});


module.exports = router; 