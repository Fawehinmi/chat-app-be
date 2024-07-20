const asyncHanler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHanler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({ ...user._doc, token: generateToken(user._id) });
  } else {
    res.status(400);
    throw new Error("Failed to create user");
  }
});

const loginUser = asyncHanler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({ ...user._doc, token: generateToken(user._id) });
  } else {
    res.status(400);
    throw new Error("Incorrect email or password");
  }
});

const allUsers = asyncHanler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        $or: [
          {
            name: { $regex: req.query.keyword, $options: "i" },
            email: { $regex: req.query.keyword, $options: "i" },
          },
        ],
      }
    : {};

    console.log(keyword)

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });

  res.send(users);
});

module.exports = { registerUser, loginUser, allUsers };
