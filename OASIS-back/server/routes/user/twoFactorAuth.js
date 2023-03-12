require("dotenv").config();
const express = require("express");
const app = express();
const User = require("../../models/user");
const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);
const router = express.Router();
const code = Math.floor(100000 + Math.random() * 900000);

<<<<<<< HEAD
const sendOTP = async (req, res , next) => {
    const { phonenumber } = req.body;
    try {
        const otpResponse = await client.verify.v2.services(process.env.SERVICE_ID)
            .verifications
            .create({
                to: `+${phonenumber}`,
                channel: 'sms',
            });
        res.status(200).send(`OTP sent successfully : ${JSON.stringify(otpResponse)}`);
    } catch (error) {
        res.status(error?.status || 400).send(error?.message || 'Something went wrong');
    }
=======
const sendOTP = async (req, res, next) => {
  const phonenumber = req.body.number;
  console.log(phonenumber);
  try {
    const otpResponse = await client.verify.v2
      .services(process.env.SERVICE_ID)
      .verifications.create({
        to: `+216${phonenumber}`,
        channel: "sms",
      });
    res
      .status(200)
      .send(`OTP sent successfully : ${JSON.stringify(otpResponse)}`);
  } catch (error) {
    res
      .status(error?.status || 400)
      .send(error?.message || "Something went wrong");
  }
>>>>>>> ac170f3abc4be6960606f9dc10592b788a232b4d
};
router.route("/send").post(sendOTP);

<<<<<<< HEAD

const verifyOTP = async (req, res , next) => {

    const { phonenumber } = req.query;
    const { otpcode } = req.query;
    try {
        const verifiedResponse = await client.verify.v2.services(process.env.SERVICE_ID)
            .verificationChecks
            .create({
                to: `+${phonenumber}`,
                code: otpcode,
            });
        res.status(200).send(`OTP verified successfully : ${JSON.stringify(verifiedResponse)}`);
    } catch (error) {
        res.status(error?.status || 400).send(error?.message || 'Something went wrong');
    }
=======
const verifyOTP = async (req, res, next) => {
  const otpcode = req.body.code;
  const phonenumber = req.body.number;
  try {
    const verifiedResponse = await client.verify.v2
      .services(process.env.SERVICE_ID)
      .verificationChecks.create({
        to: `+216${phonenumber}`,
        code: otpcode,
      });
    res
      .status(200)
      .send(`OTP verified successfully : ${JSON.stringify(verifiedResponse)}`);
  } catch (error) {
    res
      .status(error?.status || 400)
      .send(error?.message || "Something went wrong");
  }
>>>>>>> ac170f3abc4be6960606f9dc10592b788a232b4d
};
router.route("/verify").post(verifyOTP);

module.exports = router;
