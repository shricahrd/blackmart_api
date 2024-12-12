
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const bcryptfun = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  };
  
const bcryptCompare = async function (password, pass) {
    const compare_password = bcrypt.compare(password, pass)
    return compare_password
}

const jwtToken = async function (body) {
    const token = jwt.sign(body, process.env.JWT_SECRET_KEY, { expiresIn: "1y" });
    return token;
};

const otpjwtToken = async function (body) {
    const token = jwt.sign(body, process.env.JWT_SECRET_KEY, { expiresIn: "5m" });
    return token;
};

const generateOTP = async function(){
    const length = 4
    const characters = '0123456789'

    let otp = ''
    for (let o=0; o<length; o++) {
        const getRandomIndex = Math.floor(Math.random() * characters.length)
        otp += characters[getRandomIndex]
    }
    otp = 1234;
    return otp
}

module.exports = {
    jwtToken,
    bcryptfun,
    bcryptCompare,
    generateOTP,
    otpjwtToken
 };