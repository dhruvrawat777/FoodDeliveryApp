import express from "express";
import passport from "passport";


import { ReviewModel } from "../../database/reviews/index";


const Router = express.Router();



/*
Route   /new
Desc    Add new food review
Params  none
Body    review object
Access  Public
Method  POST
*/
Router.get("/new", async (req, res) => {
    try {
        // const { _userID, _foodID } = req.params;
        const { reviewData } = req.body;
        await ReviewModel.create(reviewData);

        return res.status(200).json({ review: "Successfully created review" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


Router.delete("/delete/:_id", async (res, res) => {
    try {
        const { _id } = req.params;
        await ReviewModel.findByIdAndDelete(_id);
        return res.status(200).json({ review: "Successfully deleted review" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


export default Router;

