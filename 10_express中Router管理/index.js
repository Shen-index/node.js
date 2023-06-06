const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs/promises");
const userrouter = require("./router/user");
const usershan = require("./router/goods");
const cookiep = require("cookie-parser")

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));
app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookiep())
/*
    Routers
        它是express中创建的一个对象
            创建
                const router = express.Router()

            使用
                - 在一个文件夹下编写用户或者是其他信息
                        const express =  require("express");

                        const app = express()

                        // 创建router对象
                        const router = express.Router();

                        router.get("/list", (req,res) => {
                            res.send("我是list路径，")
                        })

                        // 将router暴露到模块外
                        module.exports = router

                - 在需要使用的文件
                    - 定义一个表示信息的路径
                        const userrouter = require("./router/user")
                            这里的路径必须要是./这些开头
                - 在需要使用的文件（调用他）
                        app.use(userrouter)

            优先级
                在需要使用的文件如果有多个路由，它会先执行路由先生效那个

            干啥的
                它是一个中间件，可以在该件上绑定各种路由以及其他的中间件
            和app的区别
                router它不是一个对象，所以就可以不用定义到该文件下，可以新建一个文件夹单独去写这些请求，中间件
                        


        问题
            如果路由（接口）多了容易出现路径冲突的现象
        
        解决
            在需要使用路由的文件下
                app.use("./user", userrouter)       ./user/list
                app.use("./goods", goodsrouter)     ./goods/list
                这个意思就是，在目录前加上一个前缀，这里不管他们的路由的绝对路径是什么
                        他们的所有内容的前缀都是定义的第一个参数，他们的前缀都是按use中第一个参数定义的路径前缀
                            这样就不会发生冲突

            访问的时候在前缀加上名称即可
                127.0.0.1：3000/user/list
                127.0.0.1：3000/goods/list

    如果多个文件中有重复的代码我们就可以把重复的代码封装到一个函数里
        - 在router的请求体中的第三个参数next调用到
                routerr请求体最后就好，表示交给后面的路由继续处理
        - 在最后面编写代码
                        将重复的代码放到这里头
            router.use((req, res) => {

            })

*/
// app.use("/user", userrouter);
// app.use("/goods", usershan);

// 不需要再去定义一个新的const接收它
app.use("/students", require("./router/students"))

// 做一个默认的页面
app.get("/", (req, res) => {
    res.render("login")
})

app.get("/get-cookie", (req, res) => {

    // 给客户端发一个cookie
    res.cookie("username", "admin")

    res.send("cookie已经发送")
})
//第二次访问的时候，它就是携带cookie
app.get("/cookie", (req, res) => {
    // 从浏览器读取cookie===req.cookies
    console.log(req.cookies);
    
    res.send("cookie已经发送-2")
})
/*
    现在的问题是，即使有了登录进入学生信息页面，通过路径也可以直接跳过登录页面，直接进入学生列表信息
        HTTP协议是一个无状态的协议
            服务器无法区别请求是否发送自同一个客户端
        解决
            通过cookie来解决无状态的

    cookie
        它是HTTP协议中用来解决无状态问题的技术（服务器创建的）
        它其实就是一个头
            服务器以响应头的形式将cookie发送给客户端
            客户端收到后会将其存储，并在下次向服务器发送请求时将其传回
            这样服务器就可以根据cookie来识别客户端
        req.cookie
            从服务器读取cookie、

            安装中间件cookie-parser
                1.npm i cookie-parser

            引入cookie-parser
                const cookiep = require("cookie-parser")

            设置为中间件
                app.use(cookiep())
        
*/ 
// 默认页面登录的请求
app.post("/login", (req, res) => {
    // 获取用户的用户名和密码
    const {username, password} = req.body
    if(username === "admin" && password === "123123") {
        // 登录成功
        // res.send("成功")
        // 重定向
        // 登录后，将用户名放到cookie
        res.cookie("username", username)
        res.redirect("/students/list")
    }else{
        res.send("用户名或密码错误")
    }
})


app.use((req, res) => {
  res.status(404).send(`<h1>操作失败</h1>`);
});

app.listen(3000, () => {
  console.log("服务器启动成功");
});
