const express = require("express");
const router = express.Router();
let ARR = require("../data/stu.json");
const fs = require("fs/promises");
const path = require("path");


// 这样就不管是添加还是删除，如果有，它都会进入next()
router.use((req,res, next) => {
  if (req.session.loginuser) {
      next()
    } else {
      res.redirect("/");
    }
})
// 学生列表的路由
router.get("/list", (req, res) => {
  // if (req.session.loginuser) {
  //   res.render("students", { ARR });
  // } else {
  //   res.redirect("/");
  // }
  res.render("students", { ARR, username:req.session.loginuser });

});

// 添加学生的路由
router.post("/add", (req, res, next) => {
  const { name, age, gender, address } = req.body;
  const id = ARR.at(-1) ? ARR.at(-1).id + 1 : 1;
  const user = {
    id,
    name: req.body.name,
    age: +req.body.age,
    gender: req.body.gender,
    address: req.body.address,
  };

  ARR.push(user);

  // 调用next交由后续路由继续处理
  next();
});

// 删除功能的路由

router.get("/delete", (req, res, next) => {
  // 获取要删除学生的id
  const id = +req.query.id;

  // 根据id删除学生,不等于获取的id，保留的就是符合条件的
  ARR = ARR.filter((foo) => foo.id !== id);

  // 将新的数组写入到json文件中
  //    这里的代码交由后续路由执行
  next();
});

// 修改学生信息
router.post("/update-students", (req, res, next) => {
  // 获取学生的id
  // const id = req.query.id
  // console.log(id
  //   );

  const { id, name, age, gender, address } = req.body;
  console.log(id, name, age, gender, address);

  const student = ARR.find((item) => item.id == id);

  student.name = name;
  student.age = +age;
  student.gender = gender;
  student.address = address;
  next();
});

router.get("/toupdate", (req, res) => {
  // 拿到html的id
  const id = +req.query.id;
  // 获取学生信息
  const student = ARR.find((item) => item.id === id);

  console.log(student);

  res.render("update", { student });
});

// 处理文件的中间件
router.use((req, res) => {
  fs.writeFile(path.resolve(__dirname, "../data/stu.json"), JSON.stringify(ARR))
    .then(() => {
      res.redirect("/students/list");
    })
    .catch(() => {
      console.log("处理失败");
    });
});

module.exports = router;
