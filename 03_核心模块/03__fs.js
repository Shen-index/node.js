const fs = require("node:fs/promises");
const path = require("node:path");
console.log(fs);

/*
             fs.mkdir()
                - 创建目录
                    - 参数
                        1.绝对路径
                        2.需要创建的路径名称
                    - 它可以接受一个配置对象作为第二个参数
                        配置对象：就是一个普通js对象，通过这个对象，可以对方法的功能进行配置
                            - recursive
                                递归的循环的，默认值为false
                                    设置true以后，会自动创建不存在的上一级目录
                                        递归


                    fs.mkdir(path.resolve(__dirname, "./hello")).then((e) => {
                        console.log("操作成功");
                        
                    }).catch( err => {
                        console.log("操作失败");
                    })

                    问题一
                        当它创建二级目录的时候，一级目录如果没有就会报错
                            因为没有一级目录
                            所以当我们创建二级目录或者是更低的，前几级目录能自动创建

                            使用第二个参数
                            recursive 设置为true
            fs.rmdir()
                - 删除目录

                    
                fs.rmdir(path.resolve(__dirname, "./hello"))
                .then(r=> {
                    console.log("成功");
                    
                })
            fs.rm()
                - 删除文件
            fs.rename()
                - 重命名
                    -第一个参数为目前的路径
                    - 下一个参数为新的名称
                fs.rename(path.resolve(__dirname, "./hah.png"),
                path.resolve(__dirname,  "./haha.png")
                ).then( r => {
                    console.log("重命名成功");
                    
                })
            fs.copyFile()
                - 复制文件
*/ 

// fs.mkdir(path.resolve(__dirname, "./hello1/abc"),{recursive: true}).then((e) => {
//     console.log("操作成功");
    
// }).catch( err => {
//     console.log("操作失败");
// })

// fs.rmdir(path.resolve(__dirname, "./hello1"),{recursive: true})
// .then(r=> {
//     console.log("成功");
    
// })


fs.rename(path.resolve(__dirname, "./hah.png"),
          path.resolve(__dirname,  "./haha.png")
).then( r => {
    console.log("重命名成功");
    
})