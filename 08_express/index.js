const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs/promises")

// 模型
const ARR = require("./data/stu.json")

/*
  添加功能
    - 创建静态表单
    - 提交按钮
      - 将表单提交到后台路由
        - 创建路由
          {
                  - 配置它的初始路径
                  - 获取按钮提交的数据
                    const {name,age,gender,address} = req.body
                      使用结构赋值
                    - 验证用户的信息
                  - 将用户信息添加到数组中
                      ARR.push(user)
                      问题：这样无法数据持久化，每次都需要返回去刷新，表格才会新添加数据
                      解决：
                        对res重新渲染
                          res.render("students", {stus: ARR})

                        问题一：
                          表单重复提交
                            如果我们重行刷新后，它会根据添加的内容重行添加到表格中
                              因为是在添加路由中渲染ejs的，

                        解决
                            res.redirect()
                              用来发起请求重定向
                              重定向作用是告诉浏览器，向另外一个地址再发起一次请求
                              这样刷新浏览器就不会再重新请求，也不会再重新添加到表单中 
                              这里的重定向，请求有两个，我们刷新的是第二个请求，所以就不会有重行提交的提示，
                  - 目前问题（数据持久化）
                    现在刷新服务器的话，浏览器的内容会消失
                      解决：
                        利用fs读取文件
                        创建一个新的文件夹，把所有用户的数据添加到json文件当中
                        再将用户的文件重复赋值给js文件的用户
                        引入fs/promise模块
                          将新的数据写入到json文件当中
                          fs.writeFilse()
                            参数
                              - 第一一个参数为路径
                              - 第二个参数时需要传入的数据
                                这里将我们的数组转换为字符串
                                  再写入到文件当中
                            使用then方法添加成功后使用重定向
                            这样我们的数据就写入到了json当中
                              这样刷新就不会再消失数据

                          
                          代码
                            fs.writeFile(
                              path.resolve(__dirname, "./data/stu.json"), JSON.stringify(ARR)
                            ).then(() => {
                                res.redirect("/students")
                                // res.send("添加成功")
                            }).catch(() => {
                              console.log("异常");
                              
                            }) 

                      
          }
                  - 返回响应

*/ 


let name = "猪八戒"

// 配置模板引擎
app.set("view engine", "ejs");

//配置模板路径(配置的名字，配置的路径)
app.set("views", path.resolve(__dirname, "views"));

// 中间件如下
// 静态资源路径
app.use(express.static(path.resolve(__dirname, "public")));

// 配置请求体解析
// 终端会告诉你传入配置，不传也是默认配置---{extended: true}
app.use(express.urlencoded({ extended: true }));

// 配置路由
app.get("/hello", (req, res) => {
  res.send("放回请求");
});

// 用户访问students时，可以放回一个表单，并且有数据
app.get("/students", (req, res) => {
  res.render("students", { ARR });
});

// 路由
app.get("/set_name", (req, res) => {
    name = req.query.name
    res.send("修改成功")
})

// 按钮提交处理
app.post("/PSOT", (req, res) => {
  const {name,age,gender,address} = req.body;
  console.log(name,age,gender,address);

  // 生成一个id
  const id = ARR.at(-1).id + 1
  const user = {
    id,
    name:req.body.name,
    age:+req.body.age,
    gender:req.body.gender,
    address:req.body.address,
  }
  
  ARR.push(user)
  // res.render(
  //   "students",
  //   {ARR}
    // )
  fs.writeFile(
    path.resolve(__dirname, "./data/stu.json"), JSON.stringify(ARR)
  ).then(() => {
      res.redirect("/students")
      // res.send("添加成功")
  }).catch(() => {
    console.log("异常");
    
  }) 


  
})

// 在所有路由的后面配置错误路由
// 思路来源于报错的时候会出现寻找失踪人口的页面
app.use((req, res) => {
  // 只要这个中间件执行，相当于上面的所有请求地址都没有匹配
  res.status(404);
  res.send("您访问的页面被截胡咯");
});

app.listen(3000, () => {
  console.log("服务器启动成功");
});
