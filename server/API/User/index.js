import express from "express";
import passport from "passport";

import { UserModel } from "../../database/user/index";

const Router = express.Router();


/*
Route   /:_id
Desc    Get user data
Params  _id
Body    none
Access  Public
Method  GET
*/
Router.get("/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        const getUser = await UserModel.findById(_id);
        return res.status(200).json({ user: getUser });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});



/*
Route   /:_id
Desc    Update user id
Params  _id
Body    user data
Access  Public
Method  PUT
*/
Router.put("/update/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const { userData } = req.body;
        const updateUserData = await UserModel.findByIdAndUpdate(_id, {
            $set: userData,
        }, {
            new: true
        });
        return res.status(200).json({ user: updateUserData });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;


