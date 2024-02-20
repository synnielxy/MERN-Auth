import express from "express";
import { 
  favoriteNumber, 
  favorited, 
  addToFavorite, 
  removeFromFavorite,
  getFavoredMovies
 } from "../controllers/favoriteController.js";

const router = express.Router();
router.post('/favoriteNumber', favoriteNumber)
router.post('/favorited', favorited)
router.post('/addToFavorite', addToFavorite)
router.post('/removeFromFavorite', removeFromFavorite)
router.post('/getFavoredMovies', getFavoredMovies)

export default router;