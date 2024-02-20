import asyncHandler from "express-async-handler";
import Favorite from "../models/favoriteModel.js";

// @desc    Get favorite number
// route    POST /favorite/favoriteNumber
// @access  Public
const favoriteNumber = asyncHandler(async (req, res) => {
  try {
    const subscribe = await Favorite.find({ movieId: req.body.movieId }).exec();
    res.status(200).json({ success: true, subscribeNumber: subscribe.length });
  } catch (err) {
    res.status(400).send(err);
  }
});

// @desc    Get if favorited
// route    POST /favorite/favorited
// @access  Public
const favorited = asyncHandler(async (req, res) => {
  try {
    const subscribe = await Favorite.find({
      movieId: req.body.movieId,
      userFrom: req.body.userFrom,
    }).exec();
    let result = false;
    if (subscribe.length !== 0) {
      result = true;
    }
    res.status(200).json({ success: true, subcribed: result });
  } catch (err) {
    res.status(400).send(err);
  }
});

// @desc    Mark as favorite
// route    POST /favorite/addToFavorite
// @access  Public
const addToFavorite = asyncHandler(async (req, res) => {
  try {
    const favorite = new Favorite(req.body);
    const savedFavorite = await favorite.save();
    res.status(200).json({ success: true,  savedFavorite: savedFavorite});
  } catch (err) {
    res.status(400).send(err);
  }
});

// @desc    Remove from favorite
// route    POST /favorite/removeFromFavorite
// @access  Public
const removeFromFavorite = asyncHandler(async (req, res) => {
  try {
    await Favorite.findOneAndDelete({
      movieId: req.body.movieId,
      userFrom: req.body.userFrom,
    }).exec();
    res.status(200).json({ message: "Remove from favorite" });
  } catch (err) {
    res.status(400).send(err);
  }
});

// @desc    Get favored movies
// route    POST /favorite/getFavoredMovies
// @access  Public
const getFavoredMovies = asyncHandler(async (req, res) => {
  try {
    const favorites = await Favorite.find({
      userFrom: req.body.userFrom,
    });
    res.status(200).json({ success: true, favorites });
  } catch (err) {
    res.status(400).send(err);
  }
});


export { favoriteNumber, favorited, addToFavorite, removeFromFavorite, getFavoredMovies };