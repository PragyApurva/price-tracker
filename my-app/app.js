import express from "express"
import v1Routes from "./routes/index.js"

const app = express();


app.use(express.json())
app.use("/api/v1", v1Routes);
app.use("/", (req,res)=>{
    res.status(200).json({
        "status": "success",
    });
});
export default app;