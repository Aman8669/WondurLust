const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./model/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("./schema.js");
const Review = require("./model/review.js");


let MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust2";

main().then((res)=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err)
})
async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname, "public")));


const validateListing = (req,res,next) =>{
    const { error } = listingSchema.validate(req.body); // validate
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400, errMsg); 
    } else {
        next();
    }
}

const validateReview = (req,res,next) =>{
    const { error } = reviewSchema.validate(req.body); // validate
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400, errMsg); 
    } else {
        next();
    }
}

// index Route
app.get("/listing",wrapAsync(async (req,res)=>{
 const allListings =   await Listing.find({});
 res.render("listings/index.ejs",{allListings});
}));

//new route
app.get("/listing/new", (req,res)=>{
    res.render("listings/new.ejs");
});

//edit route
app.get("/listing/:id/edit",wrapAsync(async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}));


//show route
app.get("/listing/:id",wrapAsync(async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs",{listing});
}));



//update route
app.put("/listing/:id",validateListing, wrapAsync(async(req,res)=>{
    let {id} = req.params;
   await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect("/listing");
}));


//delete route
app.delete("/listing/:id",wrapAsync( async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listing");
}));

//post review route 
app.post("/listing/:id/reviews", validateReview,wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    console.log("New review saved");
    res.redirect(`/listing/${listing._id}`);
}));

// Post Delete Route

app.delete("/listing/:id/reviews/:reviewId", wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listing/${id}`);
}));


//create route
app.post("/listing",validateListing, wrapAsync(async (req,res,next)=>{
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listing");  
}));


app.get("/",(req,res)=>{
    res.send("Hi i am root node");
});

app.use((req,res,next)=>{
    next(new ExpressError(404,"Page Not Found!"));
});

app.use((err,req,res,next)=>{
    let {statusCode=500, message="Something went wrong"} = err;
    res.status(statusCode).render("error.ejs",{err});
    // res.status(statusCode).send(message);
});

app.listen(8080,()=>{
    console.log("Server is Listening on port 8080");
});