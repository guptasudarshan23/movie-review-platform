import express from "express";
import { login, register } from "../controllers/authcontroller.js";
import { loginValidator, registerValidator } from "../validators/authValidators.js";
import { validate } from "../validators/validate.js";

const router = express.Router();

router.post("/register", registerValidator, validate, register);
router.post("/login", loginValidator, validate, login);

export default router;
