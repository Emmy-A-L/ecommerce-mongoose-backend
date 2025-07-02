import jwt from "jsonwebtoken";
import { User } from "../models/userModels.js";
import { splitFullName } from "../utils/tools.js";
import bcrypt from 'bcrypt';

export const registerController = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({
        error: "Fullname, email, and password are required",
      });
    }
    const { firstName, lastName } = splitFullName(fullName);
    // console.log(firstName, lastName, fullName, email, password);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ firstName, lastName, fullName, email, password: hashedPassword });
    console.log(user)
    await user.save();
    res.status(201).json({
      message: "User registered successfully",
      user: {
        firstName,
        lastName,
        fullName,
        email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Registration failed", error: error.message });
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and Password are required!" });
  }
  try {

    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password!" });
    }
    const token = jwt.sign({ email: User.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
    
    res.status(200).json({
      message: "Login successful",
      token: token,
      data: {
        userId: existingUser._id,
        fullName: existingUser.fullName,
        email: existingUser.email,
      },
    });
  } catch (error) {
    console.error("Error durin Login: ", error);
    res
      .status(500)
      .json({ message: "Inrernal server error", error: error.message });
  }
};
