const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL
const DB_NAME = process.env.DB_NAME

module.exports = function () {
    mongoose.connect(
        `${DB_URL}/${DB_NAME}`,
       {
         useNewUrlParser: true,
         useUnifiedTopology: true
       },
       (db) => {
         console.log("Connected to DB");
       }
     );
}