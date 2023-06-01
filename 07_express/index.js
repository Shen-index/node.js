const express = require("express");
const path = require("node:path");
const app = express();

const ARR = [
  {
    name: "悟空",
    age: 18,
    address: "花果山",
  },
  {
    name: "八戒",
    age: 28,
    address: "高老庄",
  },
  {
    name: "沙僧",
    age: 38,
    address: "流沙河",
  },
];

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
app.get("/students", (req, res, ) => {
  /*
        默认HTML都是静态页面，它不会根据服务器中数据的变化而变化
            所以这里就需要另一种网页来表示了
            ejs尾缀的文件可以随服务器的改变去改变
            这个东西被称为模板
            node里头有很多的模板，像这种需要html代码的用ejs模板就可以了
                ejs是node模板中的其中之一(配置的统一流程)
                    - 安装ejs
                        npm i ejs
                    - 配置express的模板引擎为ejs
                        app.set("view engine", "ejs")

                    - 模板引擎要被express渲染后才能访问
                        res.render()    渲染一个模板引擎并放回给浏览器
                            它是先解析为网页，然后再发给用户
                            参数
                                这个参数跟着网页文件名是一样的，只是不用写后缀名
                                    如果前面有路径写上路径即可
                                
                            第二个参数
                                可以传一个对象作为参数
                                    这样在模板中就可以访问对象的参数

                        问题：这里会出现路径问题
                            - 这里ejs默认路径是ejs，但是这里的默认路径是node下面找views，所以报路径错
                                这里也只有在有多个文件夹才会这样，一般都是只有一个文件夹
                        解决
                            直接在终端使用 node index.js就可以解决问题
                        
                            问题：但是这里就一定要使用f5执行
                            解决
                    - 配置模板路径
                            app.set("views", path.resolve(__dirname, "views"))
                    - 语法
                        大部分都和html是一样滴
                        <%= %>
                            通过它可以将render传递进来的数据直接在网页中显示出来
                                如果写了一个没有定义的名称，那么会报服务器的错误
                                使用<%= %>ejs输出内容时，它会自动对字符串中的特殊符号进行转义
                                    这样就是为了避免xss攻击    
                        <%- %>
                            这种就不会特殊处理了，会直接装换为html代码输出
                        <% %>
                            可以直接编写js代码，就是逻辑等
    */
//   res.render("students", { name: "悟空", age: "18" });
  res.render("students", { name });
});

// 路由
app.get("/set_name", (req, res) => {
    name = req.query.name
    res.send("修改成功")
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
