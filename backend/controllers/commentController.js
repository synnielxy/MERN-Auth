import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Comment from "../models/commentModel.js";

// @desc    Save comment
// route    POST /comment/saveComment
// @access  Public
const saveComment = asyncHandler(async (req, res) => {
  try {
    const comment = new Comment(req.body);
    const savedComment = await comment.save();
    const result = await Comment.find({ '_id': savedComment._id })
                                .populate('writer')
                                .exec();
    res.status(200).json({ success: true, comment: result[0] });
  } catch (err) {
    res.status(400).send(err);
  }
});

// @desc    Get comment
// route    GET /comment/getComments
// @access  Public
const getComments = asyncHandler(async (req, res) => {
  try {
    const comments = await Comment.find({
      postId: req.body.movieId,
    }).populate('writer').exec();
    res.status(200).json({ success: true, comments });
  } catch (err) {
    res.status(400).send(err);
  }
});

export { saveComment, getComments };