const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../model/listing");
const Review = require("../model/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview, isLoggedIn, isAuthor} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

// Review Create Route
router.post("/",isLoggedIn,validateReview, wrapAsync(reviewController.createReview));

// Review Delete Route
router.delete("/:reviewId",isLoggedIn,isAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;