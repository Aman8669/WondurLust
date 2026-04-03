const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./model/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");


const listing = require("./routes/listing.js");
const review = require("./routes/review.js");

let MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust2";

main().then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};



// Create Listing Route
app.post("/listing", validateListing, wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listing");
}));



app.use("/listing", listing);
app.use("/listing/:id/reviews",review);

app.get("/", (req, res) => {
    res.send("Hi i am root node");
});

app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { err });
});

app.listen(8080, () => {
    console.log("Server is Listening on port 8080");
});