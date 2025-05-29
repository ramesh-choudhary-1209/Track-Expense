const userModel = require("../models/userModel");

const logincontroller = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json({
      success: true,
      user,
    });
    // if(user.password!==password){
    //     return res.status(401).json({message:"Invalid Password"});
    // }
    // return res.status(200).json({message:"Login Successfull"});
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

// Register Callback
const registercontroller = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Email already registered" });
    }

    const newUser = new userModel({ name, email, password });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
module.exports = {
  logincontroller,
  registercontroller,
};
