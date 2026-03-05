const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    helper_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    title: {
      type: String,
      required: true,
    },

    description: String,

    location: String,

    start_time: {
      type: Date,
      required: true,
    },

    end_time: Date,

    status: {
      type: String,
      enum: ["open", "accepted", "completed"],
      default: "open",
    },

    picture: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);