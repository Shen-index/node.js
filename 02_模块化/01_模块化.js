/*
    模块化
        将代码分成多个部分，好维护，也简介
        通过script标签来引入文件
            问题
                1.无法选择要引入模块的哪些内容
                2.在复杂的环境场景下容易出错
                ...
            解决
                commonJs
                    是node.js的模块化规范，并不是es的规范，自定义的规范系统

                在node中默认支持模块化规范叫CommonJS
                    在CommonJS中,一个js文件就是一个模块

                CommonJS规范（有两种）
                    - 引入模块
                        - 使用require()函数来引入模块
                        - 引入自定义模块时
                            - 模块名要以./或者是../开头
                            - 扩展名可省略
                                -在CommonJS中，省略js文件的扩展名
                                    node会自动为文件补全扩展名
                                        如果没有js，它会寻找json
                                        js -> json -> node（特殊）

                        - 核心模块
                            直接写核心模块的名字即可
                                const path = require("path");
                            加上node，这样会查询更快些
                                const path = require("node:path");

*/ 
const m1 = require("./m1");
console.log(m1);


// 核心模块
const path1 = require("node:path");
const path = require("path");
console.log(path);



// cjs文件CommonJS
const cjs = require("./02_m2.cjs");
console.log(cjs);

const hello = require("./hello")//./.hello/index.js
console.log(hello);
