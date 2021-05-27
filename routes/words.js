import express from "express";

import { fetchResults } from "../controllers/words.js";

const router = express.Router();

router.get("/:term/:type/:position/:skip/:limit", fetchResults);

export default router;
