const tripModel = require("../models/trip.model");
const collaborateModel = require("../models/collaboration.model");
const expenseModel = require("../models/expense.model");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS,
  },
});

const createTrip = async (req, res) => {
  try {
    const { userId } = req.user;
    await tripModel.create({ user: userId, ...req.body });
    res.status(200).json({ message: "Trip created", success: true });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
};
const getTrip = async (req, res) => {
  try {
    const trip = await tripModel.find();
    res
      .status(200)
      .json({ message: "Fetch Trip Data", success: true, data: trip });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
};

const getTripById = async (req, res) => {
  try {
    const { id } = req.params;
    const tripDetails = await tripModel.findById(id);
    if (!tripDetails)
      return res
        .status(404)
        .json({ message: "Trip Details not Found", success: false });

    res.status(200).json({
      message: "fetch trip details",
      success: true,
      data: tripDetails,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      success: false,
      error: error.message,
    });
  }
};
const deleteTrip = async (req, res) => {
  try {
    const { tripId } = req.body;
    // find the trip;
    const trip = await tripModel.findById(tripId);
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    // delete the trip
    await tripModel.findByIdAndDelete(tripId);
    // delete related expenses
    await expenseModel.deleteMany({ tripId });
    // delete related collaborations
    await collaborateModel.deleteMany({ tripId });

    res.status(200).json({
      message: "Trip and related data deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error while deleting trip",
      success: false,
      error: error.message,
    });
  }
};

// collaboration
const inviteCollaborator = async (req, res) => {
  try {
    const { tripId, email } = req.body;
    const invitedBy = req.user.userId;
    // check if trip exists
    const trip = await tripModel.findById(tripId);
    if (!trip)
      return res
        .status(404)
        .json({ message: "Trip not found", success: false });

    // create collaborator entry;
    const collaboration = await collaborateModel.create({
      tripId,
      email,
      invitedBy,
    });

    // generate invite link
    const inviteLink = `${process.env.CLIENT_URL}/respond/${collaboration._id}`;
    // send email with link

    const mailOption = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Trip Collaboration Invite",
      html: `
        <h2>You're been invited to join a trip!</h2>
        <p>Click the link Below to respond to the invitation</p>
        <span>${inviteLink}</span>
        `,
    };
    await transporter.sendMail(mailOption);
    res
      .status(201)
      .json({ message: "Invitation send  successFully", success: true });
  } catch (error) {
    res.status(500).json({
      message: "Error sending invitation",
      success: false,
      error: error.message,
    });
  }
};
const respondToInvite = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body;
    // find collaboration
    const collaboration = await collaborateModel.findById(id);

    if (!collaboration)
      return res.status(404).json({ message: "Invite not Found" });

    collaboration.status = action;
    if (action == "accepted") {
      collaboration.joinedAt = new Date();
    }
    await collaboration.save();
    res.status(201).json({ message: `Invitation ${action}`, success: true });
  } catch (error) {
    res.status(500).json({
      message: "Error responding to invite",
      success: false,
      error: error.message,
    });
  }
};
const getCollaborations = async (req, res) => {
  try {
    const { tripId } = req.params;
    const collaboration = await collaborateModel.find({ tripId });
    res.status(200).json({
      message: "Fetch Collaboration Trip",
      success: true,
      data: collaboration,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching collaborations",
      success: false,
      error: error.message,
    });
  }
};

// expense
const addExpense = async (req, res) => {
  try {
    const { tripId, amount } = req.body;
    await expenseModel.create(req.body);
    // update  total cost in trip
    await tripModel.findByIdAndUpdate(tripId, {
      $inc: { totalCost: amount },
    });
    res.status(201).json({ message: "Expense added", success: true });
  } catch (error) {
    res.status(500).json({
      message: "Faild to add expense",
      success: false,
      error: error.message,
    });
  }
};
const getExpense = async (req, res) => {
  try {
    const { tripId } = req.params;
    const expense = await expenseModel.find({ tripId });
    res
      .status(200)
      .json({ message: "fetch expenses", success: true, data: expense });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get expenses",
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  createTrip,
  getTrip,
  deleteTrip,
  inviteCollaborator,
  respondToInvite,
  getCollaborations,
  addExpense,
  getExpense,
  getTripById,
};
