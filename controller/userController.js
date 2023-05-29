const userModel = require("../models/userModel")
const axios = require("axios");
const secrets = require("../secret.js")
const jwt = require("jsonwebtoken");


function generateJWTToken(userId) {
    const payload = {
      userId
    };
    return jwt.sign(payload, secrets.jwt);
  }


const check = function (req, res) { return res.status(200).send({
    status: true,
    message: "i am up"
}) }

const loginRegister = async function (req, res) {
    let { mobileNumber } = req.body
    if (!mobileNumber || mobileNumber.length !== 10) {
        res.status(400).send({
            status : false,
            message : "Invalid Phone Number"
        });
        return;
    }

    console.log("122332", mobileNumber)
    const client = axios.create();

    const response = await client.get(`https://2factor.in/API/V1/${secrets.secretKeyOtp}/SMS/+91${mobileNumber}/AUTOGEN/OTP1`)

    if (response.status !== 200) {
        res.send(response.error);
        return;
    }

    console.log("1212")

    const user = await userModel.findOne({ mobileNumber });
    if (user) {
        res.status(200).send({
            status : true,
            message : "Mobile Number already exist and OTP send"
        });
        return;
    }
    const newUser = new userModel({
        mobileNumber
    });

    await newUser.save();

    res.status(201).send({
        status : true,
        message : "User created successfully and OTP send"
    });

}


const verifyOtp = async function (req, res) {
    let { mobileNumber, otp } = req.body;

    if (!mobileNumber || mobileNumber.length !== 10) {
        res.status(400).send("Invalid mobile number");
        return;
    }

    if (!otp || otp.length !== 6) {
        res.status(400).send("Invalid OTP");
        return;
    }

    const user = await userModel.findOne({ mobileNumber });
    if (!user) {
        return res.status(200).send("User Does Not exist");
    }

    console.log(otp)
    const client = axios.create();
    const response = await client.get(`https://2factor.in/API/V1/${secrets.secretKeyOtp}/SMS/VERIFY3/+91${mobileNumber}/${otp}`);

    if(response.data.Status == "Error"){
         return res.send(response.data.Details)
    }

    //token generate
    token = generateJWTToken(user._id)
    console.log(token)

    data = {
        "token" : token,
        "mobileNumber" : mobileNumber
    }

    return res.send(data)

}

const getUser = function (req,res) {

}






module.exports.verifyOtp = verifyOtp
module.exports.loginRegister = loginRegister
module.exports.check = check
