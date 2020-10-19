const Router = require("express").Router();
const User = require("../Service/User");

Router.post("/login", async (req, res) => {
  try {
    let user = await User.login(req.body);
      res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});
Router.get('/:id',async(req,res)=>{
  try {
    let user = await User.getOne(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
})
Router.post("/register", async (req, res) => {
  try {
    let response = await User.register(req.body);
    res.status(201).send(response);
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message
    });
  }
});

Router.post("/send-otp", async (req, res) => {
  try {
    let response = await User.sendOtp(req.body);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

Router.post("/verify-otp", async (req, res) => {
  try {
    let response = await User.verifyOtp(req.body);
    res.status(200).send(response);
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
});

module.exports = Router;