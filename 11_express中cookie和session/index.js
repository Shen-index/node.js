const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs/promises");
const userrouter = require("./router/user");
const usershan = require("./router/goods");
const cookiep = require("cookie-parser")
const session = require("express-session")
/*
    利用session使地址不能直接访问到学生列表中
        登录成功后才可有权限访问
        它默认有效期是一次会话
*/ 

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));
app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookiep())
app.use(session({
    secret:"zhou"
}))

// 默认页面登录的请求
app.post("/login", (req, res) => {
    // 获取用户的用户名和密码
    const {username, password} = req.body
    if(username === "admin" && password === "123123") {
        // 登录成功
        // res.send("成功")
        // 重定向
        // 登录后，将用户名放到cookie

        // 登录成功后，将用户信息放入到session中
        // res.cookie("username", username)

        req.session.loginuser = username

        res.redirect("/students/list")
    }else{
        res.send("用户名或密码错误")
    }
})


// 不需要再去定义一个新的const接收它
app.use("/students", require("./router/students"))


// 做一个默认的页面
app.get("/", (req, res) => {
    res.render("login")
})


app.use((req, res) => {
  res.status(404).send(`<h1>操作失败</h1>`);
});

app.listen(3000, () => {
  console.log("服务器启动成功");
});
