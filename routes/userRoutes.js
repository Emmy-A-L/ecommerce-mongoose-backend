import express from "express";
import { deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/userControllers.js";

const router = express.Router();

// get all users
router.get("/getAllUsers", getAllUsers);

// get users by id
router.get("/getuser/:id", getUserById);

// update user
router.patch("/:id", updateUser);

// delete user
router.delete("/:id", deleteUser);

export default router;