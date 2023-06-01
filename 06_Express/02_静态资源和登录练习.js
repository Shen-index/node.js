/*
    当我们每次编写的新的功能，如果服务器不刷新重启
        它就不会生效，所以这里就有组件可以自动重启服务器
        nodemon插件工具
            他就会自动监视服务器自动重启
        安装方式
            全局安装
                npm i nodemon -g
                
                这里安装会出现环境目录并不在路径中
                    解决问题
                        使用管理员打开Windows PowerShell
                            并输入set-ExecutionPolicy RemoteSigned 
                                输入Y更改即可

                删除这个全局包
                    npm r nodemon -g            
                启动
                    - nodemon
                        运行index.js
                    - nodemon xxx
                        指定运行的js文件


            在项目中安装(开发常用)
                - 设置开发依赖
                    npm i nodemon -D

                    
                    问题
                    json文件
                        "devDependencies": {
                            "nodemon": "^2.0.22"
                        }
                        这里只是调试中使用
                            打包的时候就可以删除了
                - 使用启动express
                    - npx nodemon
                      表示执行node模块，后面就是表示指令
                    - npx nodemon xxx
                        表示nodemon需要执行那个js文件
                        这里的终端代码多，就可以设置命令
                        在script中设置别名
                            
                    
*/ 
const express = require("express");

const path = require("node:path")

// 创建服务器的实例
const app = express()

// use()中间价
app.use(express.static(path.resolve(__dirname, "./public")))

// 配置路由
// 像这钟路由的斜杠开头的，它都是绝对路径
app.get("/", (req, res) => {

    /*
        这里的响应，应该是放回html网页而不是一句话
            利用末班字符串（这样就相当于在这里编写html代码）不太行的做饭
                    res.send(`
                //     <!doctype html>
                //     <html>
                //         <head>
                //             <meta charset="UTF-8">
                //             <title>Document</title>
                //         </head>
                //         <body>
                //             <h1>这是一个静态网页</h1>
                //         </body>
                //     </html>

                // `)

            二
                - 做一个公共的库
                    存放html代码
                    问题
                        这里的代码是不能被其他人看见的包括node的代码
                            如果希望浏览器可以访问，那么要将页面所在的目录设置为静态资源的目录
                    解决
                        使用中间件
                            app.use(express.static("public"))
                            设置中间件以后，浏览器访问会自动去public目录下寻找是否有
                                匹配的静态资源,所以我们的所有需要访问的资源图片啥的
                                    都要放在public中，这样才能让浏览器访问它
                                    这里如果要利用文件去访问外部的内容，是访问不到的
                            问题
                                当我们去查找public目录的时候，路径是会出现问题
                                导致读取不到html的代码文件，  所以需要使用它的当前位置
                              
                            解决
                                使用path的包
                                    它的现在的相对路径就可以了
                                    path.resolve(__dirname, "./public")

                            注意，我们需要把静态文件让浏览器去访问，我们的中间件就
                                一定要设置在get请求的前面
    */ 



    // res.send(`
    //     <!doctype html>
    //     <html>
    //         <head>
    //             <meta charset="UTF-8">
    //             <title>Document</title>
    //         </head>
    //         <body>
    //             <h1>这是一个静态网页</h1>
    //         </body>
    //     </html>

    // `)

    // res.send("没有了呢")

})

// 登录验证
/*
    req.query
        - 表示查询字符串中的请求参数
        这里还可以使用表单设置的name和wolid，获取他们的用户名和密码
*/ 
app.get("/login", (req, res) => {
    console.log("已经在执行咯");

    // 获取用户输入的账号和密码
    console.log(req.query);
    
   console.log(req.query.passname);
   console.log(req.query.passwolid);
    


//    验证用户名和密码是否正确(一般都会在数据库里判断)
    if(req.query.passname === "shunwukong" && req.query.passwolid === "shunwukong"){
        res.send("登录成功")
    }else{
        res.send("用户名或密码错误捏")
    }




   
    
})

// 启动服务器
app.listen(3000,() => {
    console.log("端口号");
    
})