// 引入expresss
const express = require("express");

// 引入path
const path = require("node:path")

// 服务器实例
const app = express();

// 配置中间件的静态资源
// public === 127.0.0.1
// 严谨写法
app.use(express.static(path.resolve(__dirname, "public")))

// 不严瑾(这样会导致路径不严瑾，因为这个参数是一个相对路径，如果我们改变了，那么它就还是原来的路径，所以不建议这种做法)
// app.use(express.static("public"))


// 引入解析请求体的中间件post请求
app.use(express.urlencoded())


// 创建一个路由 /login === http://127.0.0.1:3000/login
app.get("/login", (req, res) => {
    console.log("正在运行");
    
    // 获取用户发送的数据
    // get请求是通过查询字符串发送请求的，所以这里通过req.query获取数据
    if(req.query.passname === "wukong" && req.query.passwolid === "admin") {
        res.send(`<h1>登录成功</h1>`)
    }else{
        res.send(`<h1>错误列</h1>`)
    }
})

/*
    创建一个post路由去处理post.html提交的内容
    这里的req.params获取不了用户输入的信息
    因为req.params是获取字符串的方法
    这里post请求使用req.body获取post请求的参数（请求体中的参数）
        这里会报错undefined
            因为express在默认情况下并不会自动解析请求头
            所以这里可以利用中间件去增加功能
            express.urlencoded()
                解析请求体的功能

*/ 

app.post("/login", (req, res) => {
    const passname = req.body.passname
    const passwolid = req.body.passwolid

    if( passname === "wukong" && passwolid === "admin") {
        res.send("成功登录")
    }else{
        res.send("信息错误")
    }
    
})


// 设置服务器的端口
app.listen(3000, (req, res) => {
    console.log("服务器端口在执行里");
    
})

//复习如上







/*
    get请求发送参数的第二中方式
        - 第一个参数的地址必须要和定义参数和用户输入的地址相同
            不然会404
        - /hello/:id 这种定义的地址是动态地址
                        输入hello后，后面的地址可以随意更改
                        它可以多添加多个
            
                - req.params
                    表示获取hello后面用户输入的地址信息
    像表单优先选择post请求


    post请求
        它和get请求是一样的操做
            它读取用户的信息利用了body读取
                app.post("/login", (req, res) => {
                    console.log(res.body)
                    res.send("post表单提交了，并且放回了响应")
                })

                但是这里会读取不到(undefined)，因为express默认是不会自动解析请求体的

                所以这里需要做一个中间件去操作
                app.use(express.urlencoded())
                    这样就可以读取到用户的信息
                
*/ 
app.post("/hello/:id", (req, res) => {
    console.log(req.params)
    res.send("hello的子目录在执行")
})
