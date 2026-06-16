const fundModel = require('../models/fundModel')

const addFund = async (req, res) => {
    try {
        const { title, amount, date } = req.body;
        if (!title || !amount || !date) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        const fund = await fundModel.create({
            title,
            amount,
            date
        })
        res.status(201).json({
            success: true,
            fund
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}


const getFunds = async (req, res) => {
    try {
        const funds = await fundModel.find()
        res.status(200).json({
            success: true,
            funds
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

const editFund = async (req,res)=>{
    try {
        const { id } = req.params;
        const { title, amount, date } = req.body;
        if (!id || !title || !amount || !date) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        const fund = await fundModel.findByIdAndUpdate(id, {title, amount, date})
        res.status(200).json({
            success: true,
            fund
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

const deleteFund = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        const fund = await fundModel.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            fund
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

module.exports = {addFund, getFunds, editFund, deleteFund}