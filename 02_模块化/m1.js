let a = 10
let b = 20

// console.log("我还是模块")

/*
    在定义模块时，模块中的内容时不能被外部看见的
        模块和模块之间是相互独立的
        可以通过exports来设置要向外部暴露的内容
            有两种访问方式
                exports
                module.exports
                - 当我们在其他模块中引入当前模块时，require函数返回的就是exports
                    相当于require函数的返回值就是exports
                - 可以将希望给外部模块的内容设置为exports的属性

// */ 
// console.log(exports);
// console.log(module.exports);
// console.log(exports === module.exports);

//定义暴露外部可以访问的内容
// 可以通过exports一个一个导出
// 也可以通过module.exports同时导出多  个数值
// exports.a = "悟空"
// exports.b = "八戒"
// exports.c = "唐僧"
// exports.foo = function fn1() {
//     console.log('哈哈')
// }
// exports.bar = {
//     name: "八戒",
//     age:28
// }



// 同时导出多个
module.exports = {
    a: "哈哈啊",
    b: [1,2,3,4],
    c: () => {
        console.log('函数');
    }
}


// // 改变量
// exports = {
//     a: "哈哈啊",
//     b: [1,2,3,4],
//     c: () => {
//         console.log('函数');
//     }
// }






