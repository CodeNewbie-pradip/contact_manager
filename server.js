const express=require("express");
const errorHandler = require("./middleware/errorhandlers");
const connectDb = require("./config/dbConnection");
const dotenv=require("dotenv").config();

connectDb();
const app=express();

app.use(express.json());
app.use("/api/contact", require("./routes/contactRoutes.js"));
app.use(errorHandler);

const port=process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`your server is running port ${port}`);
})