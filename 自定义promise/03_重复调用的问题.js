/*
	解决同步和异步的问题
		为什么就会出现同步代码就读取不到，而异步代码就能读取
			Promise中的resolve直接执行，callback就没有了，所以就报错
				resolve中判断callback是否有值，有就输出结果，没有就不输出
				
		- 像then catch 这些方法都是在微任务执行的
			所以这些then方法里的回调函数都应该放入到微任务对列中
			resolve里头的代码也一样
				
			then的回调函数并没有使代码进入到微任务对列中，而是直接就执行了
			解决
				使用函数，将这些方法插入到微任务对列中
				- queueMicrotask()
	
	
	解决代码不能重复读取的问题
		- 为什么会出现不能重复使用的问题
			- 因为callback的值是then的第一个函数
				当第一次使用then相当于把callback的值赋值给了then
				第二次的话就会被覆盖 以此类推
		- 解决
			创建一个数组，因为回调函数不止一个
				then里头往callbackAll里头添加then的第一个回调函数
					并且将Promise的值传入第一个回调函数中
				
			再遍历他们的数据就可以了
				
				
*/
const STATE = {
    PENDING: 0,
    FULFILLED: 1,
    REJECTED: 2
}

class MyPromise{
    #result;

    #state = STATE.PENDING;

    // 创建变量存储回调函数
    #callbackAll = [];

    constructor(executor) {
		executor(this.#resolve.bind(this), this.#reject.bind(this), )	//调用回调函数
	}

    #resolve(value) {
        if(this.#state !== STATE.PENDING) return

        this.#result = value 
        this.#state = STATE.FULFILLED

        queueMicrotask(() => {
            this.#callbackAll.forEach(baz => {
                baz()
            })
        })

    }

    #reject(reason){ }


    then(item1, item2) {
        if(this.#state === STATE.PENDING) {
            this.#callbackAll.push(() => {
                item1(this.#result)
            })
        }else if(this.#state === STATE.FULFILLED) {
            queueMicrotask(() => {
                item1(this.#result)
            })
        }
        
    }
}
const foo = new MyPromise((resolve, reject) => {
    setTimeout(() =>{
        resolve("悟空")
    })
})

foo.then((s) => {
    console.log("第一次",s);
    
})
foo.then((s) => {
    console.log("第二次",s);
    
})