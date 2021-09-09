
//Libraries
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";
//Models
import { UserModel } from "../../database/user/index";

//validation
import { ValidateSignin, ValidateSignup } from "../../validation/auth";


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
        await ValidateSignup(req.body.credentials);
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
        await ValidateSignin(req.body.credentials);
        const user = await UserModel.findByEmailAndPassword(req.body.credentials);
        const token = user.generateJwtToken();
        return res.status(200).json({ token, status: "Success" });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


/*
Route   /google
Desc    google signin
Params  none
Access  Public
Method  GET
*/
Router.get("/google", passport.authenticate("google", {
    scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
    ],
}
)
);

/*
Route   /google/callback
Desc    google signin callback
Params  none
Access  Public
Method  GET
*/
Router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        return res.json({ token: req.session.passport.user.token });
    }
);


export default Router;