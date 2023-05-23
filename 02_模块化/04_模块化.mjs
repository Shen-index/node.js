/*
    ES模块化
         - 一般js尾缀都是CommonJS
    设置Es模块
         - 使用mjs扩展名
         - 修改package.json将模块化设置为ES模块
            当设置 "type":"module当前项目下的所有js文件都默认为es module"
            设置commonjs就是commonjs模块
*/ 

/*


    导入m4模块（这样没用，只导入了模块，并没有导入内容）
        es模块不能省略扩展名
        import "./m4.mjs"




    
    导入m4的模块的内容
        {}里面的内容要和导入的模块变量名要一一对应
            import {a, b, obj} from "./m4.mjs"
            console.log(a,b, obj);

        不想用导入模块的名
            通过as指定别名
                import {a as hello, b, obj} from "./m4.mjs"
                console.log(hello)

        将模块的所有内容一起引入,放入到一个对象中，名叫item
                 import * as item from "./m4.mjs"
            少用这种
                这种会导致一个文件全部都导入，全用，最好按需求引入，节省空间，提高访问速度
    default

*/ 





// import {a, b, obj} from "./m4.mjs"5
// import {a as hello, b, obj} from "./m4.mjs"
import * as item from "./m4.mjs"














// 默认导出内容，可以任意命名，也可以和其他的数据一起导出

// import sum from "./m4.mjs"
// import sum, { a, b } from "./m4.mjs"
// console.log(sum, a)












// 通过Es模块化，导入的内容都是常量，和导入声明的let const 没有关系
import {a, b, obj} from "./m4.mjs"
console.log(obj);
// 修改对象相当于重新赋值
obj.name  = " 八戒"
console.log(obj);
