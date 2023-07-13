const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./src/routes/spots-routes");
const path = require("path");
const bcrypt = require("bcrypt");
const User = require("./src/models/User");
const jwt = require('jsonwebtoken');

require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/api/spots", router);

app.use(express.static(path.join(__dirname, "/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/build", "index.html"));
});

app.post("/api/signup", async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(409).json({ message: "Username already exists" });
  }

  try {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user.id }, "your-secret-key");

  res.json({ userId: user.id, token });
});

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DataBase Connected!"))
  .then(() => {
    app.listen(PORT, () => {
      console.warn(`App listening on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
