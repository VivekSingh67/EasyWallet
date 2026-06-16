const withDrawModel = require("../models/withDrawModel.js");


const getCategories = async (req, res) => {
    try {
        const categories = withDrawModel.schema.path("category").enumValues;
        res.status(200).json(categories);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const withdrawnMoney = async (req, res) => {
    try {
        const { title, amount, category, date } = req.body;

        if (!title || !amount || !category || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const collection = await withDrawModel.create({ title, amount, category, date });

        res.status(201).json(collection)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getWithdrawnMoneyData = async (req, res) => {
    try {
        const data = await withDrawModel.find()
        res.status(200).json({
            success: true,
            data: data
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

const editWithdrawnMoneyData = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, amount, category, date } = req.body;
        if (!id || !title || !amount || !category || !date) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        const data = await withDrawModel.findByIdAndUpdate(id, { title, amount, category, date })
        res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

const deleteWithdrawnMoneyData = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        const data = await withDrawModel.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

module.exports = { getCategories, withdrawnMoney, getWithdrawnMoneyData , editWithdrawnMoneyData, deleteWithdrawnMoneyData };
