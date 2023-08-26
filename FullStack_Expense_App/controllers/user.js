const User = require("../models/user");

exports.addUser = async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const phonenumber = req.body.phonenumber;

    const data = await User.create({
      name: name,
      email: email,
      phonenumber: phonenumber,
    });
    res.status(200).json({ newUserDetail: data });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ allUsers: users });
  } catch (err) {
    console.log("Get user is failing", JSON.stringify(err));
    res.status(500).json({
      error: err,
    });
  }
};

exports.editUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updatedData = {
      name: req.body.name,
      email: req.body.email,
      phonenumber: req.body.phonenumber,
    };

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ errpr: "User not found" });
    }

    await User.update(updatedData, { where: { id: userId } });
    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    if (req.params.id == "undefined") {
      console.log("ID is missing");
      return res.status(400).json({ err: "ID is missing" });
    }
    const uId = req.params.id;
    await User.destroy({ where: { id: uId } });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
