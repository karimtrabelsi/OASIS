require('dotenv').config();
const express = require('express')
const app = express()
const User = require("../../models/user");
const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN)
const router = express.Router();
const code = Math.floor(100000 + Math.random() * 900000);

const sendOTP = async (req, res , next) => {
    const { phonenumber } = req.query;
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
};
router.route('/send').post(sendOTP);


const verifyOTP = async (req, res , next) => {

    const { phonenumber } = req.query;
    const { otpcode } = req.body;
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
};
router.route('/verify').post(verifyOTP);

module.exports = router;