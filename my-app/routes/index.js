import express from "express";
// import scrapeRoutes from "./v1/scrapeRouter.js"
import { getItemByUrl } from "../controller/scrape-item-by-url.js";
import { downloadItem } from "../controller/download-item.js";
import logger from "../config/logger.js";

const router = express.Router()

// router.use('/url', scrapeRoutes);
router.post('/url', getItemByUrl)
router.get('/download', downloadItem )

export default router;