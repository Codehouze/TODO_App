import express from "express";
import userCtrl from "../controller/userCtrl";

const router = express.Router();

router.post("/login",userCtrl.login); // login

router.post("/signup",userCtrl.signUp); // signup

router.get("/:id",userCtrl.getOne); //  return a user

export default router;

7;
