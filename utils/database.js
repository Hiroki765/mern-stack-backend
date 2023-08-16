const mongoose = require("mongoose");

const connectDB = async() => {
    await mongoose.connect(process.env.MONGOOSE_SID_API)
    .then(() => {
        console.log("Success:Connected to MongoDB");
    })
    .catch((error)=>{
        console.log("Falure: Unconnected to MongoDB");
        throw new Error();
    });
};

module.exports = connectDB;