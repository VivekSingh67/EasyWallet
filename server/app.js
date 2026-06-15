import express from 'express';
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import ConnectDB from "./db/db.js"
dotenv.config()
ConnectDB()
import collectionRouter from "./routes/collection.routes.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors(
    {
        origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5000"],
        credentials: true,
    }
));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

app.use('/api', collectionRouter)


export default app;