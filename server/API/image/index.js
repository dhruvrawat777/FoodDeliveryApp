import express from "express";
import passport from "passport";
import multer from "multer";


import { MenuModel } from "../../database/menu/index";
import { ImageModel } from "../../database/image/index"
const Router = express.Router();


//utilities
import { s3Upload } from "../../Utils/AWS/s3";

//multer config
const storage = multer.memoryStorage();
const upload = multer({ storage });

/*
Route   /image
Desc    Uploads image to S3 bucket and saves link to mongoDB
Params  _id
Access  Public
Method  POST
*/
Router.post("/", upload.single("file"), async (req, res) => {
    try {
        console.log(process.env.AWS_S3_SECRET_ACCESS_KEYY);
        const file = req.file;
        const bucketOptions = {
            Bucket: "dhruvrawat",
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read", //Access control list
        };

        const uploadImage = await s3Upload(bucketOptions);
        return res.status(200).json({ uploadImage });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});





export default Router;


