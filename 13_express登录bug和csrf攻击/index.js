const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs/promises");
const userrouter = require("./router/user");
const usershan = require("./router/goods");
const cookiep = require("cookie-parser")
const session = require("express-session")
const uuid = require("uuid").v4
// 引入file-store, require函数调用了一个参数，然后返回了一个对象
const FileStore = require("session-file-store")(session)
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
    store: new FileStore({
        path:path.resolve(__dirname, "./sessions"),
    }),
    secret:"哈哈"
}))

/*
    问题：每次重新登录要输几遍才能登录进去？
    解决:
        思路
            - 它是因为存储没有立即存进文件，而是存进了内存中，
                这样就导致了sessions文件和提交不一致，就导致了session识别不到name
            - 所以这里使用save方法去做
                req.session.save(() => {
                      res.redirect("/students/list")
                 })


*/ 



/*
    csrf攻击
        - 跨站请求伪造
            http://127.0.0.1:3000/students/delete?id=3

            这种是通过链接直接执行某个功能
        - 很多浏览器都不会在跨域的情况下去发送cookie
                 这种设计就是为了防止csrf攻击
        它无论是什么请求都会攻击
                 ie浏览器还行
    
    怎么处理这种csrf攻击呢
        - 使用referer头来检查请求的来源
            const referer = req.get("referer")
            检查referer判断它是否为登录后的地址，不是就放回文字
        - 使用验证码
        - 多使用post请求（结合token）
                 因为get请求很容易泄露数据，也很容易伪装
        - token（令牌）
                可以在创建表单时随机生成令牌，将令牌存储到session中
                    并通过ejs（模板）发送给用户
                    用户提交表单时，必须将token发回踩可以进行后续操作
                这种就像对暗号是一个理
                使用uuid去生成令牌
                    安装
                        npm i uuid
                    使用
                        const uuid = require("uuid").v4

                        
*/ 

app.get('/', (req, res) => {
    const token = uuid()
    console.log(token);
    res.render("login")
})


// 默认页面登录的请求
app.post("/login", (req, res) => {
    // 获取用户的用户名和密码
    const {username, password} = req.body
    if(username === "admin" && password === "123123") {

// 在开发中，这里只会存一个对象，对象里只有用户的信息
// 这里是添加到了内存的sessino，而没有写入文件中
        req.session.loginuser = username
        // 为了让session立即存储，要使用save
        req.session.save(() => {
            res.redirect("/students/list")
        })
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

// 退出登录
app.get("/li", (req, res) => {
    // 需要使当前用户退出，使session失效就可以了
// 这样输入地址都是跳转到登录页面
// destroy是销毁session的
    req.session.destroy(() => {
     res.redirect("/")
    })
})

app.use((req, res) => {
  res.status(404).send(`<h1>操作失败</h1>`);
});

app.listen(3000, () => {
  console.log("服务器启动成功");
});
