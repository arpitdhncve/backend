const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["bhajan", "suvichar"],
    default: "bhajan"
  },
  "isDeleted": {
    type: Boolean,
    default: false
  },
  bhajanAudio : {
    type: String,
    required: false
  },
  bhajanImage: {
    type: String,
    required: false
  }
});

const Content = mongoose.model("Content", ContentSchema);

module.exports = Content;
