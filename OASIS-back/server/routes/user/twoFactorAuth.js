require("dotenv").config();
const express = require("express");
const app = express();
const User = require("../../models/user");
const localIpAddress = require("local-ip-address");

const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);
const router = express.Router();
const code = Math.floor(100000 + Math.random() * 900000);

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
};
router.route("/send").post(sendOTP);

const verifyOTP = async (req, res, next) => {
  const otpcode = req.body.code;
  const phonenumber = req.body.number;
  try {
    console.log("bbbb");
    console.log(otpcode);
    console.log(phonenumber);

    const verifiedResponse = await client.verify.v2
      .services(process.env.SERVICE_ID)
      .verificationChecks.create({
        to: `+216${phonenumber}`,
        code: otpcode,
      });
    console.log("aaa");
    const ip = localIpAddress();
    const user = await User.findOne({ phonenumber: phonenumber });
    user.ip = [...user.ip, ip];
    user.save();
    res
      .status(200)
      .send(`OTP verified successfully : ${JSON.stringify(verifiedResponse)}`);
  } catch (error) {
    res
      .status(error?.status || 400)
      .send(error?.message || "Something went wrong");
  }
};
router.route("/verify").post(verifyOTP);

module.exports = router;
