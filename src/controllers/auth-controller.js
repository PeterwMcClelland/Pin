const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Spot = require("../models/Spots");

const register = async (req, res, next) => {
  const { username, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ username });
  } catch (err) {
    console.log(err);
  }

  if (existingUser) {
    return res.status(409).json({ message: "Username already exists" });
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch (err) {
    console.log(err);
  }

  const user = new User({
    username,
    password: hashedPassword,
  });

  try {
    await user.save();
  } catch (err) {
    console.log(err);
  }

  let token;
  try {
    token = jwt.sign({ userId: user.id }, "Peter741!", { expiresIn: "1h" });
  } catch (err) {
    console.log(err);
  }

  res.status(201).json({ userId: user.id, token });
};

const login = async (req, res, next) => {
  const { username, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ username });
  } catch (err) {
    console.log(err);
  }

  if (!existingUser) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    console.log(err);
  }

  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  let token;
  try {
    token = jwt.sign({ userId: existingUser.id }, "Peter741!", {
      expiresIn: "1h",
    });
  } catch (err) {
    console.log(err);
  }

  res.json({ userId: existingUser.id, token });
};

const addFavorite = async (req, res, next) => {
  const { userId } = req.body;
  const spotId = req.params.id;

  let user;
  let spot;
  try {
    user = await User.findById(userId);
    spot = await Spot.findById(spotId);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Could not retrieve user or spot information." });
  }

  if (!user || !spot) {
    return res.status(404).json({ message: "User or spot not found." });
  }

  if (!user.favorites.includes(spotId)) {
    user.favorites.push(spot);
    await user.save();
  }

  res.json(user);
};

const removeFavorite = async (req, res, next) => {
  const { userId } = req.body;
  const spotId = req.params.id;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Could not retrieve user information." });
  }

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  const index = user.favorites.indexOf(spotId);
  if (index > -1) {
    user.favorites.splice(index, 1);
    await user.save();
  }

  res.json(user);
};

exports.register = register;
exports.login = login;
exports.addFavorite = addFavorite;
exports.removeFavorite = removeFavorite;
