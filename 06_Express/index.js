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
                - 使用启动
                    - npx nodemon
                      表示执行node模块，后面就是表示指令
                    - npx nodemon xxx
                        表示nodemon需要执行那个js文件
                        这里的终端代码多，就可以设置命令
                        在script中设置别名
                            
                    
*/ 
const express = require("express");


// 创建服务器的实例
const app = express()

// use()中间价


// 配置路由
app.get("/", (req, res) => {
    res.send("路由122ww23wqeqw")
})

// 启动服务器
app.listen(3000,() => {
    console.log("端口号");
    
})