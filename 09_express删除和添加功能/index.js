const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs/promises");

// 模型
let ARR = require("./data/stu.json");

/*
    删除功能
      - 点击删除链接后，删除当前数据
      - 点击删除后，id为所点的就会删除
      - 流程
        1. 点击删除链接就会删除对应的学号信息
        2. 向路由发送请求
          写一个路由
        3.路由的功能
          获取学生的id n
            问题
              我们在向删除路径去发请求的时候，它需要id作为参数，不然会读不到

            解决
              用查询字符串
                语法
                  ?id=value
                    这里的id如果是需要读取就使用什么
              在html文件需要返回的响应，使用id=value
                id就是需要的id的，value就是对应的数值

          删除id为n的学生
              这里有很多方法，splice，什么的，这里使用过滤
                filter
              问题
                这里的判断是字符串和number进行比较，所以不管咋样都是true

              解决
                我们foo.id是number类型，而我们获取的id是字符串类型，将id做一个number类型转换即可
          删除后，将新的数组写入json文件
            使用fs.writeFile，
              问题
                这里删除都是直接删除，所以会勿操作
              解决
                写一个是否删除即可，在html请求删除哪里写onclick return confirm  
                                        绑定单机响应函数，返回true就发送请求，false就是拒绝发送请求

              问题二
                这里新添加用户信息后，提交会报错，因为这里的id是自增计算的
                  当没有学生后，取到的id是undefined
              解决
                在添加用户的get做一个判断
                  如果id存在就1+1，如果不存在就放回1

              问题三
                这里学生列表没有信息后，他就只剩一个表头
              解决
                在html页面中判断它的长度，如果是大于0，再去执行for循环
                  问题
                    这里应该在table外面去判断，因为需要是希望它能将目录去掉
                      然后这里没有数剧应该有提示信息
                  解决
                    所以将if判断放到table外边即可  
                    使用else，写一个提示信息就好了

          重定向到学生列表页面

    修改
      - 点击修改链接后
        - 显示一个修改表单，表单里头有要修改学生信息的表单
          用户对学生信息进行修改，修改以后点击按钮提交表单
        - 流程
          1.点击修改链接
          2.进入修改跳转到路由，路由会返回一个页面，页面中表单有需要修改的全部信息
            - 获取需要修改学生的信息
              获取学生的id
                html文件的请求也需要有id和value值，这边就可以获取到id值
              然后通过find方法，遍历里面的所有参数
              在去修改放回的表单中在用户信息里头添加这些获取的值
          3.用户填写表单点击按钮提交，提交到一个新的路由
            获取学生信息，并对信息进行修改
                使用结构赋值去获取post提交的用户信息
            获取学生的id
              利用地址的形式传、
                <form action="/update-students   ?id=<%=student.id %>   " method="post">
              利用表单项的形式传
                 <input type="hidden" name="id" value="<%=student.id %>">
            根据学生的id获取学生的信息
              const student = ARR.find((item) => item.id == id);
              然后将student的所有信息赋值给对应的信息



*/
app.post("/update-students", (req, res) => {
  // 获取学生的id
  // const id = req.query.id
  // console.log(id
  //   );

  const { id, name, age, gender, address } = req.body;
  console.log( id, name, age, gender, address );
  
  const student = ARR.find((item) => item.id == id);

  student.name = name;
  student.age = +age;
  student.gender = gender;
  student.address = address;

  fs.writeFile(path.resolve(__dirname, "./data/stu.json"), JSON.stringify(ARR))
  .then(() => {
    res.redirect("/students");
    // res.send("添加成功")
  })
  .catch(() => {
    console.log("异常");
  });
});

app.get("/toupdate", (req, res) => {
  // 拿到html的id
  const id = +req.query.id;
  // 获取学生信息
  const student = ARR.find((item) => item.id === id);

  console.log(student);

  res.render("update", { student });
});

app.get("/delete", (req, res) => {
  // 获取要删除学生的id
  const id = +req.query.id;

  // 根据id删除学生,不等于获取的id，保留的就是符合条件的
  ARR = ARR.filter((foo) => foo.id !== id);

  // 将新的数组写入到json文件中
  fs.writeFile(path.resolve(__dirname, "./data/stu.json"), JSON.stringify(ARR))
    .then(() => {
      res.redirect("/students");
      // res.send("添加成功")
    })
    .catch(() => {
      console.log("异常");
    });
});

let name = "猪八戒";

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
  name = req.query.name;
  res.send("修改成功");
});

// 按钮提交处理,创建一个学生添加的路由
app.post("/PSOT", (req, res) => {
  const { name, age, gender, address } = req.body;
  console.log(name, age, gender, address);

  // 生成一个id
  const id = ARR.at(-1) ? ARR.at(-1).id + 1 : 1;

  const user = {
    id,
    name: req.body.name,
    age: +req.body.age,
    gender: req.body.gender,
    address: req.body.address,
  };

  ARR.push(user);
  // res.render(
  //   "students",
  //   {ARR}
  // )
  fs.writeFile(path.resolve(__dirname, "./data/stu.json"), JSON.stringify(ARR))
    .then(() => {
      res.redirect("/students");
      // res.send("添加成功")
    })
    .catch(() => {
      console.log("异常");
    });
});

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
