import express from "express";
import { getItemByUrl } from "../../controller/scrape-item-by-url.js";

const router = express.Router();

router.post('/', getItemByUrl)

export default router;