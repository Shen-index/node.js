/*
		Promise的值还可以链式调用
			- 前提是前面的Promise必须得有返回值
		现在就需要解决then代码可以链式调用
		解决
			- then的返回值得有放回值是Promise
			- 在then里头设置return的返回值
*/
const STATE ={
    PENDING: 0,
    FULFILLED: 1,
    REJECTED: 2
}

class MyPromise{

#result;

#state = STATE.PENDING;

// 创建变量存储回调函数
#callbackAll = []

constructor(executor) {
    executor(this.#resolve.bind(this), this.#reject.bind(this), )	//调用回调函数
}

#resolve(value) {
    
    if(this.#state !== STATE.PENDING)  return
    
    this.#result = value
    this.#state = STATE.FULFILLED
    
    // 使代码进入微任务对列
    queueMicrotask(() => {
        // this.#callback && this.#callback(this.#result)
        
        // 调用callbackAll中的所有函数,遍历他们
        this.#callbackAll.forEach(baz => {
            baz()
        })
    })
}

#reject(reason){ }

then(item1, item2) {
    
    /*
        这里的问题是state的数一直是0，Promise就没有意义了
            所以
    */ 
    return new MyPromise((resolve, reject) => {
        
        if(this.#state === STATE.PENDING) {
            // 进入说明数据没有进入Promise,将回调函数设置为callback
            // this.#callback = item1
            this.#callbackAll.push(() => {
                resolve(item1(this.#result))
            })
        }else if(this.#state === STATE.FULFILLED) {
            // 使代码进入微任务对列
            queueMicrotask(() => {
                resolve(item1(this.#result))
                
            })
        }
    })
    
    
}
};

const foo = new MyPromise((resolve,reject) => {
setTimeout(() => {
    resolve("悟空")
})
});

let fooEl = foo.then((s) => {
console.log("读取数据1",s)
    return "八戒"
}).then(r => {
console.log("读取数据2",r)
    return "沙僧"
}).then(r => {
    console.log("读取数据3",r)
})
