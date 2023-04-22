import express from "express";
import userCtrl from "../controller/userCtrl";
import validator from "../middleware/Validate";

const router = express.Router();

router.post("/login", validator.signupValidator, userCtrl.login); // login

router.post("/signup", validator.signupValidator, userCtrl.signUp); // signup

router.get("/:id", userCtrl.getOne); //  return a user

export default router;

7;
