import express from "express";
import passport from "passport";
import { RestaurantModel } from "../../database/restaurant/index";
import { ValidateRestaurantCity, ValidateRestaurantSearchString,ValidateRestaurantId } from "../../validation/restaurant";

const Router = express.Router();

/*
Route   /restaurant
Desc    Get all restaurant details based on city
Params  none
Access  Public
Method  GET
*/
Router.get("/", async (req, res) => {
    try {
        await (ValidateRestaurantCity(req.query));
        const { city } = req.query;
        const restaurants = await RestaurantModel.find({ city });
        return res.json({ restaurants });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
Route   /
Desc    Get individual restaurant based on ID
Params  id
Access  Public
Method  GET
*/
Router.get("/:_id", async (req, res) => {
    try {
        await(ValidateRestaurantId(req.params))
        const { _id } = req.params;
        const restaurant = await RestaurantModel.findOne(_id);
        if (!restaurant) return res.status(404).json({ error: "Restaurant not found" });
        return res.json({ restaurant });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
Route   /search
Desc    Get restaurant details  based on search string
Params  none
Body    Search string
Access  Public
Method  GET
*/
Router.get("/search", async (req, res) => {
    try {
        await(ValidateRestaurantSearchString(req.body));
        const { searchString } = req.body;
        const restaurants = await RestaurantModel.find({
            name: { $regex: searchString, $options: "i" },
        });
        if (!restaurants) {
            return res.status(404).json({ error: `No restaurants matched with  ${searchString}` });
        }
        return res.json({ restaurants });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});



export default Router;