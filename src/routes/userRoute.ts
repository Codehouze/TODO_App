import express from "express";

const router = express.Router();

router.post("/login"); // login

router.post("/signup"); // signup

router.get("/:id"); //  return a user

export default router;

7;
