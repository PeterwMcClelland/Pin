// const { request } = require("express");
const Spot = require("../models/Spots");
const User = require("../models/User");

const getAllSpots = async (req, res, next) => {
  let spots;
  try {
    spots = await Spot.find();
  } catch (err) {
    console.log(err);
  }

  if (!spots) {
    return res.status(404).json({ message: "No Spot Found" });
  }
  return res.status(200).json({ spots });
};

const getById = async (req, res, next) => {
  const id = req.params.id;
  let spot;
  try {
    spot = await Spot.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!spot) {
    return res.status(404).json({ message: "No Spot Found" });
  }
  return res.status(200).json({ spot });
};

const addSpot = async (req, res, next) => {
  const { name, address, spot_type, notes, image } = req.body;
  const userId = req.user.id;
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    console.log(err);
  }

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  let spot;
  try {
    spot = new Spot({
      name,
      address,
      spot_type,
      notes,
      image,
      user: user._id,
    });
    await spot.save();
  } catch (err) {
    console.log(err);
  }

  if (!spot) {
    return res.status(500).json({ message: "Unable to add" });
  }
  return res.status(201).json({ spot });
};

const updateSpot = async (req, res, next) => {
  const id = req.params.id;
  const { name, address, spot_type, notes, image } = req.body;
  let spot;
  try {
    spot = await Spot.findByIdAndUpdate(
      id,
      {
        name,
        address,
        spot_type,
        notes,
        image,
      },
      { new: true }
    );
  } catch (err) {
    console.log(err);
  }
  if (!spot) {
    return res.status(404).json({ message: "Unable To Update By this ID" });
  }

  return res.status(200).json({ spot });
};

const deleteSpot = async (req, res, next) => {
  const id = req.params.id;
  let spot;
  try {
    spot = await Spot.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }
  if (!spot) {
    return res.status(404).json({ message: "Unable To Delete By this ID" });
  }
  return res.status(200).json({ spot });
};

exports.getAllSpots = getAllSpots;
exports.addSpot = addSpot;
exports.getById = getById;
exports.updateSpot = updateSpot;
exports.deleteSpot = deleteSpot;
