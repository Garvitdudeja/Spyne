import express from "express";
import { userLogin, userSignUp } from "../Controller/auth.controller.js";

const router = express.Router();


router.post("/sign-up",  userSignUp);

router.post("/log-in", userLogin);






export default router;
