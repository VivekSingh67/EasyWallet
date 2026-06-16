const express = require('express')
const router = express.Router()

const { addFund, getFunds, editFund, deleteFund } = require('../controller/fund.contoller')


router.post('/addFund', addFund)
router.get('/getFunds', getFunds)
router.put('/editFund/:id', editFund)
router.delete('/deleteFund/:id', deleteFund)

module.exports = router;