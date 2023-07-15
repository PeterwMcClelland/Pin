import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

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

export { register, login };
