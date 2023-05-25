/*
    path
        - 路径
        - 获取路径
        - 如何使用
            - 先引入
            - path.resolve([...paths])！！！
                - 用来生成一个绝对路径
                    相对路径
                        ./ 或者是../
                    绝对路径
                        - 在计算机本地
                            c:\
                            User:\
                        - 网络中
                            http：//www.example.com
                            https://
                - 如果直接调用path.resolve
                    会返回当前的工作目录
                    如果参数时相对路径
                        则resolve会自动将其装换为绝对路径 
                        此时根据工作目录的不同，产生的绝对路径也不同
                     
                    - 一般会将一个绝对路径作为第一个参数
                        第二个作为相对路径

*/              

// const path = require("node:path")

// // const result1 = path.resolve("PS D:\\1\\node.js\\03_包管理器> ","01_path.js")//少用
// // console.log(result1);


// // 对上面的形态做简介化 __dirname查看当前位置信息
// // 它不会像上面一样地址写死，在其他系统也可以读取它的位置，不会像上面兼容性差
// const result = path.resolve(__dirname, "./01_path.js");
// console.log(result);


// const result = path.resolve()

// console.log(result);


// console.log(path);









/*
    fs(File System)
        - fs用来帮助mode来操作磁盘中的文件
        - 文件操作就是I/O，input output
        使用fs
            - 先引入

        方法
            fs.readFileSync()
                同步的读取文件内容，这样会阻塞后边代码执行,所以就相当于白学
                当通过fs模块读取磁盘中的文件时，读取到的数据总会以Buffer（缓冲区）对象形式放回
                Buffer时一个临时存储数据的缓冲区
                把硬盘中的数据存储到内存条当中
                读取的数字利用toString()方法读取内容
        
            fs.readFile()！！！
            异步读取文件的方法
                第一个参数路径（err）
                    err表示错误信息
                        出错了才会有对象
                第二个参数回调函数(buffer)
                    因为要将读取的内容放回
            fs.mkdir()
                - 创建目录
            fs.rmdir()
                - 删除目录
            fs.rm()
                - 删除文件
            fs.rename()
                - 重命名
            fs.copyFile()
                - 复制文件
*/ 

// const fs = require("node:fs")
// const path = require("node:path")
// const buf = fs.readFileSync(path.resolve(__dirname, "./hello.txt"))
// fs.readFile(path.resolve(__dirname, "./hello.txt"),(err,buffer) => {
//     if(err){
//         console.log("吃醋列")
//     }else{
//         console.log(buffer.toString());
        
//     }
// })
// // console.log(buf.toString());

// fs.readFile(path.resolve(__dirname, "./hello.txt"),(err, buffer) => {
//     if(err) {
//         console.log("出错列")
//     }else {
//         console.log(buffer.toString());
        
//     } 
// })
//  console.log("全局变量");
 

/*
    Promise版本的fs方法
        引入promises方法

*/  

// const fs = require("node:fs/promises");
// const { buffer } = require("stream/consumers");
// const path = require("path");
// fs.readFile(path.resolve(__dirname, "./hello.txt"))
// .then(buffer => {
//     console.log(buffer.toString())
// }).catch(e => {
//     console.log("出错列");
    
// });

// fs.readFile(path.resolve(__dirname, "./hello.txt"))
// .then(buffer => {
//     console.log(buffer.toString());
    
// })
// .catch(e => {
//     console.log("出错列");
    
// });

/*
    async版本
*/ 

// const fs = require("node:fs/promises");
// const { buffer } = require("stream/consumers");
// const path = require("path");


// (async () => {
//     try{
//     const buffer  = await fs.readFile(path.resolve(__dirname, "./hello.txt"))
//     console.log(buffer.toString());
    
//     }catch(e){      
//         console.log("出错 ； ");
        
//     }
// })()
// (async () => {
//     try {
//         const buffer = await fs.readFile(path.resolve(__dirname, "./hello.txt"));
//         console.log(buffer.toString());
        
//     } catch (error) {
//         console.log("出错列");
        
//     }
// })()
