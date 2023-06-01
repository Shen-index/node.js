
// 引入expresss
const express = require("express");

// 引入path
const path = require("node:path")

// 服务器实例
const app = express();

//  创建数组
const USERS = [
    {
        username: "admin",
        password: "123123",
        nickname: "超级管理员"
    },
    {
        username: "悟空",
        password: "0524",
        nickname: "大师兄"
    }
]

// 配置中间件的静态资源
// public === 127.0.0.1
// 严谨写法
app.use(express.static(path.resolve(__dirname, "public")))

// 引入解析请求体的中间件post请求
app.use(express.urlencoded())

// 处理请求和相应
app.post("/login", (req, res) => {
    const username = req.body.username
    const password = req.body.password
    // console.log(req.body);
    

    /*
        目前这里的问题，像这种账户和密码都不会是写死的，例如
            用户更改了信息呀这些，所以这里需要用到数据库
            - 创建数组
    */ 
    // if( passname === "wukong" && passwolid === "admin") {
    //     res.send("成功登录")
    // }else{
    //     res.send("信息错误")
    // }


    // 获取到用户的信息后，需要根据用户名去用户的数组中查找用户
    // 这里只处理了登录成功的状态-方式一
    // for(const user of USERS) {
    //     // 判断用户名是否存在，存在执行下一步判断密码
    //     if(user.username === passname) {
    //         if(user.password === passwolid) {
    //             res.send(`登录成功${user.nickname}`)

    //             // 当用户名和密码都正确后，后面的代码就不需要执行
    //             return
    //         }
    //     }
        
    // }
    // res.send("登录失败，密码错误捏")

    // 方式二，利用数组中find方法
    const loginuser = USERS.find((item) => {
        return item.username === username && item.password === password
    })
    // console.log(loginuser);
    
    if(loginuser) {
        res.send(`登录成功 ${loginuser.nickname}`)
    }else{
        res.send("登录错误")
    }
    
})



/*
    注册demo
        注册的逻辑
            - 当用户在表单里头输入信息后，post请求到路由
            - 路由对这些数据进行处理
                添加路由
*/ 

// 路由
app.post("/regin", (req, res) => {
    // 获取用户输入的数据，解析用户输入的所有数据
    // console.log(req.body);
    // res.send("123")
    // 这里所有的命名是html那边表单的名称
    const {username, password, reqwd, nickname} = req.body
    // console.log(passname, passwolid, reqwd, nickname);

    // 验证用户名是否存在
    // 判断用户输入的用户名是否和我定义的数组有没有一样的
    const user = USERS.find((bar) => {
        return bar.username === username || bar.nickname === nickname
    })
    // console.log(user);
    
    
    if(!user){
        // 进入判断说明用户不存在，
        USERS.push({
            username,
            password,
            nickname
        })
        res.send("存入成功")
    } else{
        res.send("用户名已经存在")
    }
  
    
})



// 设置服务器的端口
app.listen(3000, (req, res) => {
    console.log("服务器 端口在执行里");
   
})

