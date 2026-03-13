const mongoose = require ("mongoose");
const initData = require("./data.js");
const Listing = require ("../models/listing.js");
Mongo_URL='mongodb://127.0.0.1:27017/GlobeTrotter'

main().then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log("error occurred in db connection");
})

async  function main (){
    mongoose.connect(Mongo_URL)
}

let initdb = async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:'69858f62e5db93b96838caa5'}));
    await Listing.insertMany(initData.data);
    console.log("data inserted");
}

initdb();