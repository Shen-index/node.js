/*
    express
        它试试node中的服务器软件
            通过expresss可以快速的在node中搭建一个web服务器
        
        - 使用步骤
            - 创建并初始化项目
                npm init -y
            - 安装express
                npm install express
            - 创建index.js并编写代码

    服务器的斜杆表示根目录
*/ 

// 引入express
const express = require("express");

// 获取服务器的实例（对象）
const app = express()

/*
    中间件
        它是干啥的？
            - 中间价的作用就相当于一个可以活动的桥
                如果你要去食堂，那么这座桥就会链接到食堂
            - 权限检查
            - 



        app.use()
            - 第一个参数
                传路径
                    如果不传就是父目录
            - 第二个参数
                回调函数，处理客户端的请求和服务器的回报请求

            - 第三个参数
                next函数
                    调用这个函数后，可以触发后面的中间件
                        它会放行，相当于这里就不管了，将请求让下面的处理
                它的响应如果处理了再使用next函数，就会报错
                    因为我已经将这件事做完了，再喊其他人做，就没有必要了
                    所以这个next函数不能在处理响应完毕后再去调用

        - 在express我们使用app.use()来定义一个中间件
            中间件的作用和路由差不多，它就会高速公路收费站一样，拦路是滴
            它不会区分请求的方式，返回路径
            它不会跟路径冲突，例如说路径只要是 / 里头的一部分，它
                都会访问的到子目录，只匹配开头（模糊匹配）
            
        - 多次使用中间件
            - 它会处理第一个，往下的中间件就会被截胡咯



        它和路由的区别！！
            1. 它会匹配所有的请求
            2. 路径设置的是父目录，不会说只有那个目录才能访问到！
*/ 

app.use( (req, res, next) => {
    console.log("111",Date.now());
    res.send("中间件放回的响应");
    next()//报错
})

app.use( (req, res, next) => {
    console.log("222",Date.now());
    // res.send("2222捏");
    next()
})

app.use( (req, res) => {
    console.log("333",Date.now());
    res.send("3333捏");
})

/*
    服务器要正常访问，需要为服务器设置路由
        路由可以根据不同的请求方式和地址来处理用户的请求

        app.名(...)
            名可以是 get 或 post 或者其他
            - 参数
                路径
                回调函数
                    只要有人访问路径，这个回调函数就会执行
        
            在路由中，有两件事要做
                - 读取用户的请求（request）
                - 根据用户的请求返回响应（response）

                需要拿到这两个的请求
                    通过路由的回调函数的参数
                        request === req
                            表示用户的请求信息
                        response === res
                        表示服务器发送给客户端的响应信息
                            res.sendStatus()
                                表示向客户端发送一个响应状态码
                            res.status()
                                表示设置响应状态码，但是不发送
                            res.send()
                                表示设置并发送响应体
                                可以不设置，这里会默认200
*/
// 这里的斜杠表示 http://localhost:3000
// app.get("/hello", (req,res) => {
//     console.log("访问ing");
//     // console.log(req.url);
//     // res.sendStatus(404)
//     res.status(200)
//     res.send("<h1>请求收到，没得问题</h1>")
    
// })


/*
    - 启动服务器（端口号）
        app.listen（端口号，回调函数） 监听
            端口号：它类似于身份证
        
    - 访问服务器
        协议名：//ip地址：端口号/路径dzd
        http://localhost:3000
        http://127.0.0.1:3000
        两都是表示本地

*/ 


app.listen(3000, () => {
    console.log("执行s中");
    
})