import express from "express";
// import scrapeRoutes from "./v1/scrapeRouter.js"
import { getItemByUrl } from "../controller/scrape-item-by-url.js";
import { downloadItem } from "../controller/download-item.js";

const router = express.Router()

// router.use('/url', scrapeRoutes);
router.post('/url', getItemByUrl)
router.get('/download', downloadItem )
// router.get('/stream', async (req, res) => {
//   try {
//     const { url } = req.query;
    
//     if (!url) {
//       return res.status(400).json({ error: 'URL parameter is required' });
//     }

//     console.log('Streaming video from URL:', url);
//     await streamYouTubeVideo(url, res);
    
//   } catch (error) {
//     console.error('Streaming error:', error);
//     if (!res.headersSent) {
//       res.status(500).json({ error: 'Failed to stream video' });
//     }
//   }
// });
export default router;