import express from "express";
import { getAllUsers, getUserById, updateUser } from "../controllers/userControllers.js";

const router = express.Router();

// get all users
router.get("/getAllUsers", getAllUsers);

// get users by id
router.get("/getuser/:id", getUserById);

// update user
router.patch("/:id", updateUser);

// delete user
router.delete("/:id", (req, res) => {
  res.send("user deleted by ID: ");
});

export default router;