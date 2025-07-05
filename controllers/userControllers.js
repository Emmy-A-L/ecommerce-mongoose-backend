import { User } from "../models/userModels.js";



export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({}, {password: 0});
    res.status(200).json({
      message: "Data retrieved successfully",
      data: allUsers,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  const userId = req.params.email;
  if (!userId) {
    return res.status(400).json({
      message: "email is required",
    });
  }

  try {
    const user = await User.findById(userId, {password: 0});
    if (!user) {
      return res
        .status(404)
        .json({ message: "User does not exist on our database!" });
    }
    res.status(200).json({
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user by email:", error);
    res.status(400).json({
      message: "email does not exist in database",
      error: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  const userId = req.params.email;
  const { fullName, email, phone, password } = req.body;
  if (!userId) {
    return res.status(400).json({
      message: "email is required",
    });
  }

  try {
    const existingUser = User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        fullName: fullName,
        email: email,
        phone: phone,
        password: password,
      },
      { new: true }
    );

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error Updating user:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.params.email;
  if (!userId) {
    return res.status(400).json({
      message: "email is required",
    });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
