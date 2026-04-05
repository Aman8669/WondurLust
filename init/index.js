const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../model/listing");

let MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust2";

main().then((res)=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err)
})
async function main() {
    await mongoose.connect(MONGO_URL);
}

const intiDB = async ()=>{
   await Listing.deleteMany({});
   initData.data = initData.data.map((obj)=>({...obj, owner :"69d129c80a5a6a042c826a75"}));
   await Listing.insertMany(initData.data);
   console.log("Data was initialized");
}

intiDB();