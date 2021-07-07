import express from "express";

import { fetchResults } from "../controllers/words.js";

const router = express.Router();

router.get("/", fetchResults);

export default router;
