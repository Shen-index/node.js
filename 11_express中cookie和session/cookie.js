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


app.get("/set", (req, res) => {
    /*
        cookie默认有效期是一次会话（session）
            会话就是从打开到关闭的过程
        不足
          cookie是由服务器创建，浏览器保存
            每次浏览器访问服务器时都需要将cookie放回
            1.这就导致不能在cookie存放较多的数据
            2.并且它是直接存储在客户端的，容易被篡改盗用
        注意
          使用cookie一定不会在cookie存储敏感数据
            cookie大小限制（不主要）
        
        为了解决cookie的不足，统一将用户的数据存储到服务器中，每一个用户的数据都有对应的id
          我们只需通过cookie将id发送给浏览器
          浏览器每次访问时将id放回，就可以读取到服务器中存储的数据
          这个技术就是sesion(会话)
    */ 
    res.cookie("name", "wukong", {
      // 配置对象
      expires: new Date()
      // maxAge:3000
    })
    res.send("设置cookie")
})

app.get("/get", (req, res) => {
    const name = req.cookies.name
    // console.log(name);
    res.send("读取cookie")
    
})

app.get("/dete", (req, res) => {
  res.cookie("name", "", {
    maxAge: 0

  
  })
  res.send("删除cookie")
})

app.use((req, res) => {
  res.status(404).send(`<h1>操作失败</h1>`);
});

app.listen(3000, () => {
  console.log("服务器启动成功");
});
