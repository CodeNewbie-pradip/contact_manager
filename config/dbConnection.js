const mongoose=require("mongoose");

const connectDb=async()=>{
    try{
        const dbPort=process.env.MONGO_URI
        mongoose.connect(dbPort)
        console.log("DAtabase connected")
    }catch(err){
        console.log(err.message);
        process.exit(1);
    }
};

module.exports=connectDb;