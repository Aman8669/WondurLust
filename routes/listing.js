const express = require("express");
const router = express.Router();
const Listing = require("../model/listing");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner,validateListing } = require("../middleware.js");
const { populate } = require("../model/user.js");
const listingController = require("../controllers/listings.js");




// INDEX Route
router.get("/", wrapAsync(listingController.index));

// NEW Route
router.get("/new", isLoggedIn, (req, res) => {
    res.render("listings/new.ejs");
});

// SHOW Route
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({path :"reviews",populate:{path : "author"}})
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing you requested does not exist");
        return res.redirect("/listing");
    }

    res.render("listings/show.ejs", { listing });
}));

// CREATE Route
router.post("/", isLoggedIn, validateListing, wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New Listing Created");
    return res.redirect("/listing");
}));

// EDIT Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing you requested does not exist");
        return res.redirect("/listing");
    }

    res.render("listings/edit.ejs", { listing });
}));

// UPDATE Route
router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated!");
    return res.redirect(`/listing/${id}`);
}));

// DELETE Route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    return res.redirect("/listing");
}));

module.exports = router;