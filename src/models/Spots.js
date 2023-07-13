const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spotsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  spot_type: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("spots", spotsSchema);
