//Importing ENV variables
const dotenv=require("dotenv");
dotenv.config({path:"./.env"});

//Libraries
import express from "express";
import cors from "cors";
import helmet from "helmet";
import ConnectDB from "./database/connection";


//microservice routes
import Auth from "./API/Auth/index";

//const express = require("express");

const zomato = express();


//middlewares
zomato.use(express.json());
zomato.use(express.urlencoded({ extended: false }));
zomato.use(helmet());
zomato.use(cors());

//Application routes
zomato.use("/auth",Auth);


zomato.get("/", (req, res) => {
    res.json({ message: "Setup success" });
});

zomato.listen(4000, () => {
    ConnectDB().then(() =>
        console.log("Server Started")
    ).catch((err) =>
        console.log(err)
    )
});