
// 解决setTImeout的问题，读取不到数据
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

    // 创建一个变量存储一个回调函数、
    #callback

	constructor(executor) {
		executor(this.#resolve.bind(this), this.#reject.bind(this))	//调用回调函数
	}


	#resolve(value){
        // 禁止值被重复修改
        // 如果state不等于0，说明值被修改，函数直接放回
        if(this.#state !== STATE.pending) return

		this.#result = value
        this.#state = STATE.fulfilled //数据添加成功

        // 当resolve执行时，说明数据已经进来了，需要调用then的回调函数
        this.#callback(this.#result)

	}
	#reject(reason){}

    // 添加一个用来读取数据then的方法，
    then(item1, item2){
        if(this.#state === STATE.pending) {
            // 说明数剧还没有进入Promise，将回调函数设置为callback的值
            this.#callback = item1
        }
        if(this.#state === STATE.fulfilled) {
           
            /*
                现在then只能读取已经存储进Promise中的数据
                    而不能读取异步存储的数据
            */ 
            item1(this.#result)
        }
    }
};

/*
    这里的数据会被覆盖
        所以要先创建一个变量去记录Promise的状态
*/ 
const foo = new MyPromise((resolve,reject) => {
    setTimeout(() => {
        resolve("悟空")
    }, 1000)
});

foo.then((bar) => {
    console.log(bar);
})