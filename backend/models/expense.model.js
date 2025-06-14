const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trip",
    required: true,
  },
  title: {
    type: String,
    required: true, //"Hotel Booking", "Train Tickets"
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    enum: ["Food", "Travel", "Accommodation", "Shopping", "Other"],
    default: "Other",
    required: true,
  },
  paidBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const expenseModel = new mongoose.model("Expense", expenseSchema);
module.exports = expenseModel;
