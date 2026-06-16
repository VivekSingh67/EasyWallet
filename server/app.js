const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const dotenv = require("dotenv");
const ConnectDB = require("./db/db.js")
dotenv.config()
ConnectDB()
const withDrawRouter = require("./routes/withDraw.routes.js")
const fundRouter = require("./routes/Fund.routes.js")



app.use(cors(
    {
        origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5000"],
        credentials: true,
    }
));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

app.use('/api', withDrawRouter)
app.use('/api', fundRouter)

module.exports = app;