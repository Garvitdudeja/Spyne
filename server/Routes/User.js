import express from "express";
import Auth from "../middleware/Auth.js";
import {
  deleteUser,
  getUserById,
  getUserList,
  logoutUser,
  updateUser,
} from "../Controller/user.controller.js";

const router = express.Router();


router.get("/user/:id", Auth, getUserById);

router.get("/users", Auth, getUserList);

router.patch("/user/info", Auth, updateUser);

router.get("/users/logout", logoutUser);

router.delete("/user/info", Auth, deleteUser);

export default router;
