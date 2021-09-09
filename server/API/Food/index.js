import express from "express";
import passport from "passport";

import { FoodModel } from "../../database/food/index";
import { ValidateCategory, ValidateRestaurantId } from "../../validation/food";
const Router = express.Router();

/*
Route   /
Desc    Get all food based on a particular restaurant
Params  id
Access  Public
Method  GET
*/
Router.get("/r/:_id", async (req, res) => {
    try {
        await ValidateRestaurantId(req.params);
        const { _id } = req.params;

        const foods = await FoodModel.find({ restaurant: _id });
        if (!foods) {
            return res.status(404).json({ error: "Not found" });
        }
        return res.json({ foods });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


/*
Route   /r
Desc    Get all food based on a particular category
Params  id
Access  Public
Method  GET
*/
Router.get("/r/:category", async (req, res) => {
    try {
        await ValidateCategory(req.params);
        const { category } = req.params;
        const foods = await FoodModel.find({ category: { $regex: category, $options: "i" } });
        return res.json({ foods });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});



export default Router;