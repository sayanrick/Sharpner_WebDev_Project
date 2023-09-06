const User = require("../models/users");

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if a user with the provided email already exists
    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      // User already exists, send an error response
      return res.status(400).json({ error: "User already exists" });
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

function isStringInvalid(string) {
  if (string == undefined || string.length === 0) return true;
  else return false;
}


exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (isStringInvalid(email) || isStringInvalid(password)) {
      return res
        .status(400)
        .json({ message: "Email Id or Password is missing", success: false });
    }
    console.log(password);
    const user = await User.findAll({ where: { email } });
    if (user.length > 0) {
      if (user[0].password === password) {
        return res
          .status(200)
          .json({ success: true, message: "User logged in successfully" });
      } else {
        return res
          .status(401)
          .json({ success: false, message: "Password is incorrect" });
      }
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

