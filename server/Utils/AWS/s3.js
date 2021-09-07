import AWS from "aws-sdk";

const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

//AWS S3 bucket config
const s3Bucket = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEYY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEYY,
    region: "ap-south-1",
});




export const s3Upload = (options) => {
    return new Promise((resolve, reject) => s3Bucket.upload(options, (error, data) => {
        if (error) {
            return reject(error);
        }
        return resolve(data);
    }));
};