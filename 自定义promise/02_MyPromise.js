/*
    解决了异步和同步读取数据不能读取的问题
        - 首先，想要读取异步的代码，就得调回调函数的返回值
			- 目前这里只有then和resolve里可以有回调函数
				- resolve调用的话说明数据进入了Promise
					这个时候then的第一个回调函数就有值了，
						通过then第一个回调函数的返回值获取他的结果
						
						疑点
							then的第一个回调函数吗，resolve的函数并不知道？
						解决
							- 创建一个私有属性（变量）存储回调函数
								然后then的第一个回调函数的情况判断他会出现为零
								也就是数据没有进入Promise，也就是resolve并咩有调用
									将（then的第一个回调函数）设置为callback的值
								然后resolve里面 this设置存储的回调函数也就是callback
								这样就能访问到then的第一个回调函数的值了
									设置callback的参数为result（Promise的值）
								这样就能读取到异步存储的数据
*/ 
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
        this.#callback && this.#callback(this.#result)

	}
	#reject(reason){}

    // 添加一个用来读取数据then的方法，
    then(item1, item2){
        if(this.#state === STATE.pending) {
            // 说明数剧还没有进入Promise，将回调函数设置为callback的值
            this.#callback = item1
        }else if(this.#state === STATE.fulfilled) {
            
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