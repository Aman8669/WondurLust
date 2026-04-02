// const express = require("express");
const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title :{ 
        type: String,
        required : true
    },
    description : String,
    image :{ 
        type: String,
        default : "http://media4.onsugar.com/files/2014/02/17/838/n/1922441/f0bd144ded7b1bfd_shutterstock_89720368.jpg.xxxlarge_2x.jpg",
        set : (v) => v === " " ? "http://media4.onsugar.com/files/2014/02/17/838/n/1922441/f0bd144ded7b1bfd_shutterstock_89720368.jpg.xxxlarge_2x.jpg" : v,
    },
    price : Number,
    location : String,
    country : String,
    reviews : [{
            type: Schema.Types.ObjectId,
            ref : "Review",
    }]
});

const Listing = mongoose.model("listing",listingSchema);
module.exports = Listing;