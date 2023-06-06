const express = require("express");

const router = express.Router()

router.get("/list", (req,res) => {
    res.send("这是商品目录")
})

module.exports = router