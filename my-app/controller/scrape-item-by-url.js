import { get_site_content_by_url } from "../services/get-site-content-by-url-service.js"

export const getItemByUrl = async (req, res) => {
    const { url } = req.body;
    await get_site_content_by_url(url);
};