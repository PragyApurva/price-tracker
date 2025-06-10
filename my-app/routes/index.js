import express from "express";
import scrapeRoutes from "./v1/scrapeRouter"
const router = express.Router()

router.use('/url', scrapeRoutes);