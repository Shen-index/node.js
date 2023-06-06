const express = require("express");
const router = express.Router();
let ARR = require("../data/stu.json");
const fs = require("fs/promises");
const path = require("path");
const uuid = require("uuid").v4;

// 这样就不管是添加还是删除，如果有，它都会进入next()
router.use((req, res, next) => {
  const referer = req.get("referer");
  console.log(referer);
  if (!referer || !referer.startsWith("http://127.0.0.1:3000/")) {
    res.status(403).send("没有权限");
    return;
  }

  /*
      登录后，这里打印的是undefined
        clg(req.session.loginuser)

  */

  if (req.session.loginuser) {
    next();
  } else {
    res.redirect("/");
  }
});
// 添加学生列表的路由
router.get("/list", (req, res) => {
  // if (req.session.loginuser) {
  //   res.render("students", { ARR });
  // } else {
  //   res.redirect("/");
  // }

  // 生成一个token
  const csrf = uuid();

  // 将这个token添加到session中
  req.session.csrf = csrf;
  // 立即执行一下，然后把这个参数传给render中
  req.session.save(() => {
    res.render("students", { ARR, username: req.session.loginuser, csrf });
  });
});

// 添加学生的路由
router.post("/add", (req, res, next) => {
  // 客户端发送的token
  const csrfTOken = req.body._token;
  const sessiontoken = req.session.csrfTOken;
  req.session.csrfTOken = null;

  // 将客户端的token和session中的token比对
  if (sessiontoken === csrfTOken) {
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

    req.session.save(() => {
      next();
    });

    // 调用next交由后续路由继续处理
  }else{
    res.status(403).send(
      "token错误"
    )
  }
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
