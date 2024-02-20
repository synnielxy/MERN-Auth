import express from "express";
import {saveComment, getComments} from "../controllers/commentController.js"
const router = express.Router();

router.post('/saveComment', saveComment)
router.post('/getComments', getComments)

export default router;