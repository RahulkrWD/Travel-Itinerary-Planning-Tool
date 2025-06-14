const userModel = require("../models/user.model");
const addressModel = require("../models/address.model");

const getUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await userModel
      .findById(userId)
      .select("-_id -password -role");
    res.status(200).json({
      message: "User fetched successfully",
      data: user,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    await userModel.findByIdAndUpdate(userId, req.body);
    res.status(200).json({
      message: "User updated successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
};

const addAddress = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    const newAddress = new addressModel({ userId, ...req.body });
    await newAddress.save();
    res.status(200).json({
      message: "Address added successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
};

const getAddress = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    const address = await addressModel.find({ userId }).select("-userId");
    res.status(200).json({
      message: "Address fetched successfully",
      data: address,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const address = await addressModel.findById(addressId);
    if (!address) {
      return res.status(404).json({
        message: "Address not found",
        success: false,
      });
    }
    await addressModel.findByIdAndDelete(addressId);
    res.status(200).json({
      message: "Address deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
};

const updateAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const address = await addressModel.findById(addressId);
    if (!address) {
      return res.status(404).json({
        message: "Address not found",
        success: false,
      });
    }
    await addressModel.findByIdAndUpdate(addressId, req.body);
    res.status(200).json({
      message: "Address updated successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
};

module.exports = {
  getUser,
  addAddress,
  deleteAddress,
  updateAddress,
  updateUser,
  getAddress,
};
