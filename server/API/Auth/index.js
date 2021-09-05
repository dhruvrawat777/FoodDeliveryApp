
//Libraries
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//Models
import { UserModel } from "../../database/user";


const Router = express.Router();

/*
Route   /signup
Desc    Register new user
Params  none
Access  Public
Method  POST
*/

Router.post("/signup", async (req, res) => {
    try {
        //const { email, password, fullname, phoneNumber } = req.body.credentials;

        //check if email exists
        await UserModel.findByEmailAndPhone(req.body.credentials);

        //hash password
        // const bcryptSalt = await bcrypt.genSalt(8);
        //const hashedPassword = await bcrypt.hash(password, bcryptSalt);

        //save to dB
        const newUser = await UserModel.create(req.body.credentials);

        //generate JWT auth token
        const token = newUser.generateJwtToken();


        //respond
        return res.status(200).json({ token, status: "Success" });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
Route   /signin
Desc    signin with email and password
Params  none
Access  Public
Method  POST
*/



Router.post("/signin", async (req, res) => {
    try {

        const user = await UserModel.findByEmailAndPassword(req.body.credentials);
        const token = user.generateJwtToken();
        return res.status(200).json({ token, status: "Success" });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


export default Router;