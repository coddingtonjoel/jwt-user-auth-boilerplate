const express = require("express");
import bcrypt from "bcryptjs";
const router = express.Router();
const User = require("../models/User");
import jwt from "jsonwebtoken";
import { loginValidation, registerValidation } from "../models/validation";

interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    _id: string;
}

router.post("/register", async (req: any, res: any) => {
    // check if account data is valid
    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).send(error.message);
    }

    // check if user is already in db
    const emailExists: boolean = await User.findOne({ email: req.body.email });

    if (emailExists) {
        return res.status(400).send("Email already exists");
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // create new user using schema
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPassword,
    });

    try {
        // save user to db
        const savedUser = await user.save();
        res.send("Success!");
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post("/login", async (req: any, res: any) => {
    // check if account data is valid
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).send(error.message);
    }

    const user: User = await User.findOne({ email: req.body.email });

    // check if user exists based on email
    if (!user) {
        return res.status(400).send("Email or password is incorrect");
    }

    // check for valid password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
        return res.status(400).send("Email or password is incorrect");
    }

    // create jwt
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET!);
    res.header("auth-token", token);

    res.send("Logged in!");
});

module.exports = router;
