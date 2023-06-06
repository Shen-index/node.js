const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs/promises");
const userrouter = require("./router/user");
const usershan = require("./router/goods");
const cookiep = require("cookie-parser")
const session = require("express-session")

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
        secret:"space",
        // ttl:10,
        // reapInterval:10

        
    }),
    secret:"哈哈"
}))




/*
    session是服务器的一个对象，存储用户的信息
        它是依赖cookie的，每一个session都会有一个id
            session创建后，id都会以cookie的形式发送给浏览器
        浏览器收到后，每次访问都会将id放回，服务器就可以根据id找到session
    id（cookie） --> session对象

    session失效
        - 浏览器的cookie没有
        - 服务器的session对象没有了
    express-session默认是将session存储到内存中，所以服务器一重启，session会自动重置
        所以使用session时，一般会对她进行持久化，将数据写到磁盘上
            方式一
                写到文件里
            方式二
                写到数据库（开发）
        如何将session存储到本文件中
            - 需要引入一个中间件
                使用步骤
                    安装
                        - npm i session-file-store
                    引入
                        - const filestore = require("session-file-store")(session) 

                    设置中间件      配置对象（是filestore的配置对象）
                        app.use(session({

                            secret:"zhou",
                            store: new FileStore({
                                // 配置对象
                                path:"./sessions"
                                    它是session的默认存储路径（参数也是默认值）
                                    也可以更改session的路径
                                        path:path.resolve(__dirname, "./sessions")

                                secret:"任意字母"
                                    这个是加密的意思，里面的参数可以是任意字母

                                ttl：1600
                                    session的有效时间（单位秒），默认一个小时
                                        它是一个闲置时间，意思就是讲，什么都不动的情况下
                                            点了刷新浏览器又重新开始计算
                                    一般这个不需要设置
                                默认情况下，fileStore会每隔一小时，清除一次session对象
                                    也可以通过属性去配置这个时间
                                    reapInterrrval:10
                                        每隔10s清除一次session，单位是秒

                                    

                            })
                        }))
            通过session我们浏览器的文件就不会根据服务器刷新而结束一次会话了，做到了持久化
            它就是将session存到本地文件里头

            - 配置对象（filestore的配置对象）
                - 它每次通过浏览器去访问，都会创建一个新的对象
                    1.这样会导致很占空间
                    2.而且它是明文保存的，安全性不高




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

        // 登录成功后，将用户信息放入到session中
        // res.cookie("username", username)


// 在开发中，这里只会存一个对象，对象里只有用户的信息
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
