import express from "express";
import createCollection from "../controller/Collection.controller.js";

const router = express.Router();

router.post("/collection",createCollection)


export default router