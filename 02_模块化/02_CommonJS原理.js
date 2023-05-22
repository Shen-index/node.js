/*
    module
    exports
    require
    这三不是全局变量
        所有的CommonJS的模块都会被包装到一个函数中
            所有的实参都会传入到arguments中
            module,exports,require这三作为参数

// (function(exports,require, module, __filename, __dirname){})

*/ 
let a = 10
console.log(arguments);
console.log(__filename);//表示当前模块的绝对路径
console.log(__dirname);//表示当前所在目录的路径


