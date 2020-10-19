const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, x-auth-token, X-Auth-Token"
    );
    next();
});

if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
}

require('./db')()


// add more controller for new like usercontroller
const UserController = require("./Controller/UserController");

// use controller for new route
app.use("/User", UserController);

app.get("/", (req, res) => {
    res.send("Working");
});

app.listen(3001, () => {
    console.log("Listening on 3001");
});