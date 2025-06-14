const mongoose = require("mongoose");

const collaboratorSchema = new mongoose.Schema(
  {
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    invitedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    joinedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
const collaborateModel = new mongoose.model("Collaborate", collaboratorSchema);

module.exports = collaborateModel;
