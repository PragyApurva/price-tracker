import express from "express";
import scrapeRoutes from "./v1/scrapeRouter.js"
const router = express.Router()

router.use('/url', scrapeRoutes);

export default router;