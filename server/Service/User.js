const UserModel = require("../Model/UserModel");
const SMS = require("./SMS")
const NodeCache = require("node-cache");
const myCache = new NodeCache({
  stdTTL: 100,
  checkperiod: 120
});

let model = {
  sendOtp: async function (data) {
    try {
      if ((data.mobile + "").length != 10) {
        return {
          status: true,
          message: `Mobile number should be 10 digit`
        }
      }
      let otp = Math.floor(1000 + Math.random() * 9000);
      let text = `Your OTP is ${otp}`
      console.log("Text: ", text)
      await SMS.send(data.mobile, text)
      success = myCache.set(data.mobile, otp, 300);
      return {
        status: true,
        message: `OTP sent to ${data.mobile}`
      }
    } catch (error) {
      throw error;
    }
  },
  verifyOtp: async function (data) {
    try {
      if (!(data.hasOwnProperty("otp") && data.hasOwnProperty("mobile"))) {
        return {
          status: false,
          message: "Please provide mobile number and otp"
        }
      }
      let otp = await myCache.get(data.mobile);
      console.log("OTP", otp, myCache.keys())
      if (otp == data.otp) {
        return {
          status: true,
          message: `OTP verified successfully`
        }
      } else {
        return {
          status: false,
          message: `Invalid otp`
        }
      }
    } catch (error) {
      throw error;
    }
  },
  register: async function (data) {
    try {
      let userData = await UserModel.findOne({
        $or: [{
          email: data.email
        }, {
          mobile: data.mobile
        }]
      })
      if (userData) {
        return {
          message: "User already register",
          status: false
        }
      }
      let user = new UserModel(data);
      let savedData = await user.save();
      return {
        message: "User register Successfully",
        status: true,
        data: savedData
      }
    } catch (error) {
      throw error;
    }
  },
  getOne: async function (id) {
    try {
      let userData = await UserModel.findOne({
        _id: id
      })
      return {
        message: "User found",
        status: true,
        data: userData
      }
    } catch (error) {
      throw error;
    }
  },
  login: async function (data) {
    try {
      let user = await UserModel.findOne({
        mobile: data.mobile
      })
      if (!user) {
        return {
          message: "User not found",
          status: false
        }
      }
      let verificationData = await this.verifyOtp(data)
      if (!verificationData.status) {
        return verificationData
      }
      return {
        message: "Login Successful",
        status: true,
        data: user
      }
    } catch (error) {
      throw error
    }
  }
};
module.exports = model;