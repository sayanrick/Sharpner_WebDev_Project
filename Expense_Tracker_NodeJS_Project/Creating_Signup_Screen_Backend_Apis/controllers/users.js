const User = require('../models/users');

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if a user with the provided email already exists
    const existingUser = await User.findOne({
        where: { email },
      })
  
      if(existingUser) {
        // User already exists, send an error response
        return res.status(400).json({ error: "User already exists"})
      }
  
      // Create a new user if the email is not already in use
    const newUser = await User.create({
      name,
      email,
      password,
    });
    res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Error Signing up" });
  }
};
