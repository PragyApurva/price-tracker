import { get_site_content_by_url } from "../services/get-site-content-by-url-service.js"

export const getItemByUrl = async (req, res) => {
    const { url } = req.body;
    const result = await get_site_content_by_url(url);
    console.log("res = ", result);
    return res.status(result.statusCode).json({
        status: result.status,
        data: result.data
    });
};