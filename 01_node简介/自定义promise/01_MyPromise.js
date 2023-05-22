/*
	 像这种定义Promise就是定义一个类
*/ 

// class MyPromise{
// 	/*
// 		构造函数
// 			executor 和 resolve，reject就是形参和实参的关系
// 	*/ 
   
//     // 存储promise的结果
//     #result
   
//     // 记录Promise的状态
//     #state = 0  //0表示没有修改pending 1 fulfilled 2 rejected

// 	constructor(executor) {
// 		// 接受一个 执行器 作为参数
// 		// 调用bind会生成新的函数，就会把this给设置好，但是没有调用，
// 		executor(this.#resolve.bind(this), this.#reject.bind(this), )	//调用回调函数
// 	}
	
// 	// 私有的，存储正确和错误的数据
	
// 	// 这种添加到括号里都是添加到原型里
// 	#resolve(value){
//         // 禁止值被重新修改
        



// 	// 	console.log("resolve被调用了",value)
// 	// 	console.log(this)undefined  ，因为这里的this没有到实例对象
// 		this.#result = value
// 	}
	
// 	// 这种是在对象自身里头，解决this指向undefined
// 	// #resolve = () => {
// 	// 	console.log(this)
// 	// }
	
// /*
//     上面这两种方式有啥区别
//         答：上面这种省内存一点点，下面会浪费一点
//             第一种是添加到原型里，
//             第二中是添加对对象本身
// */ 

// 	#reject(reason){}
// };

// /*
//     这里的数据会被覆盖
//         所以要先创建一个变量去记录Promise的状态
// */ 
// const foo = new MyPromise((resolve,reject) => {
// 	resolve("悟空")
// 	resolve("八戒")
// });

// console.log(foo)






// 2.
// 解决Promise中的值被覆盖的问题
// 创建变量记录Promise的状态

const STATE = {
    pending:0,
    fulfilled:1,
    rejected:2
}

class MyPromise{
    // 存储promise的结果
    #result
   
    // 记录Promise的状态
    #state = STATE.pending  //0表示没有修改pending 1 fulfilled 2 rejected

    
	constructor(executor) {
		executor(this.#resolve.bind(this), this.#reject.bind(this), )	//调用回调函数
	}


	#resolve(value){
        // 禁止值被重复修改
        // 如果state不等于0，说明值被修改，函数直接放回
        if(this.#state !== STATE.pending) return

		this.#result = value
        this.#state = STATE.fulfilled //数据添加成功
	}
	#reject(reason){}

    // 添加一个用来读取数据then的方法，
    then(item1, item2){
        if(this.#state === STATE.fulfilled) {
            item1(this.#result)
        }
    }
};

/*
    这里的数据会被覆盖
        所以要先创建一个变量去记录Promise的状态
*/ 
const foo = new MyPromise((resolve,reject) => {
    
	resolve("悟空")
});

foo.then((bar) => {
    console.log(bar);
})