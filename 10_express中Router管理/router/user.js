const express = require("express");

const app = express();

// 创建router对象
const router = express.Router();

router.get("/list", (req, res) => {
  res.send("我是学生信息板块");
});

// 将router暴露到模块外
module.exports = router;
