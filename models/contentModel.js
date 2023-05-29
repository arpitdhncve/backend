const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum : ["bhajan","suvichar"],
    default : "bhajan"
  },
});

const Content = mongoose.model("Content", ContentSchema);

module.exports = Content;
