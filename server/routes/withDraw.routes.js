const express = require("express");
const router = express.Router();
const { getCategories, withdrawnMoney, getWithdrawnMoneyData , editWithdrawnMoneyData, deleteWithdrawnMoneyData } = require("../controller/withDraw.controller.js");

router.get('/categories', getCategories);
router.post("/withdraw", withdrawnMoney)
router.get("/getWithdrawnMoneyData", getWithdrawnMoneyData)
router.put("/editWithdrawnMoneyData/:id", editWithdrawnMoneyData)
router.delete("/deleteWithdrawnMoneyData/:id", deleteWithdrawnMoneyData)


module.exports = router;    