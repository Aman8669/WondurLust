const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../model/listing");
const Review = require("../model/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview, isLoggedIn, isAuthor} = require("../middleware.js")

// Review Create Route
router.post("/",isLoggedIn,validateReview, wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created");
    res.redirect(`/listing/${listing._id}`);
}));

// Review Delete Route
router.delete("/:reviewId",isLoggedIn,isAuthor, wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted");
    res.redirect(`/listing/${id}`);
}));

module.exports = router;