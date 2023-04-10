import express from "express";


const router = express.Router();

router.post("/login");

router.post("/signup");

router.get("/:id");

export default router;
