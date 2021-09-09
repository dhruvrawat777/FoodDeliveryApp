//Importing ENV variables
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

//Libraries
import express from "express";
import cors from "cors";
import helmet from "helmet";
import ConnectDB from "./database/connection";
import passport from "passport";


//configs
import googleAuthConfig from "./config/google.config";
import routeConfig from "./config/route.config";

//microservice routes
import Auth from "./API/Auth/index";
import Restaurant from "./API/Restaurants/index";
import Food from './API/Food/index';
import Image from "./API/image/index";
import Order from './API/orders/index';
import Reviews from "./API/reviews/index";


const zomato = express();


//middlewares
zomato.use(express.json());
zomato.use(express.urlencoded({ extended: false }));
zomato.use(helmet());
zomato.use(cors());
zomato.use(passport.initialize());
zomato.use(passport.session());

//passport configuration
googleAuthConfig(passport);
routeConfig(passport);


//Application routes
zomato.use("/auth", Auth);
zomato.use("/restaurant", Restaurant);
zomato.use('/food', Food);
zomato.use("/image", Image);
zomato.use("/order", Order);
zomato.use("/reviews", Reviews);

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