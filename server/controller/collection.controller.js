import collectionModel from "../models/collectionModel.js";

const createCollection = async (req, res) => {
    try {
        console.log(req.body)
        const collection = await collectionModel.create(req.body);
        res.status(201).json(collection);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export default createCollection;
