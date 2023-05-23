const fs = require('node:fs/promises');
const path = require('node:path');
// const { buffer } = require('stream/consumers');

// fs.appendFile(
//     path.resolve(__dirname, "./hello1.txt"),
//     "文本内容",
// ).then(r => {
//     console.log("添加成功");
    
// })

// 复制图片路径
// D:\1\img\07.webp

fs.readFile("D:\\1\\img\\01.jpg")
.then(buffer => {
    return fs.appendFile(
        path.resolve(__dirname, "./hha.jpg"),
        buffer
        )
}).then(() => {
    console.log("完成");
    
})

