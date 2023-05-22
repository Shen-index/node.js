
/*
	js是单线程，它运行是根据事件循环机制（event loop）
		- 调用栈
			- 栈
				栈是一种数据结构，类似一组数组，它的特点是后进先出（先枪一样）
			- 调用栈存放的是要执行的所有代码
		- 队列
			- 消息队列/任务对列/事件对列
				- 也是一种数据结构，先进先出，就像干饭，不着急就得排队-
					它的特点是将要执行的代码
					它会等调用栈的代码执行完后，对列的代码才会进入到调用栈中
			流程
				1.调用栈
				2.队列
					2-1.微任务
					2-2.宏任务
*/ 

/*
	 333先执行
		因为这里定时器是等1s后执行
		，所以Promise先执行
		即使定时器设置了0延时，也还是Promise先执行
			定时器的原理是，多少秒后将这个函数放入到队列中等待调用栈的代码执行完
			这里的疑点是
				为什么console.log就会在调用栈里头？
					因为console.log是在全局写的
						所以，只要是在全局作用域中写的代码都会放到调用栈里头
		Promise它执行快
			Promise在执行时，then就相当于给Promise了回调函数
				它的状态从pending到fulfileed时
					then的回调函数就会被放入到队列中
			为什么Promise和setTimeout都进入了消息队列，为啥是Promise先执行
				因为js任务队列有两种
				当我们微任务的代码执行完后，才会执行宏任务队列
					- 宏任务队列
						大部分代码都去这边排队咯
					- 微任务队列（）
						Promise的回调函数，then，catch finally相当于vip队列
						queueMicrotask()
							向微任务队列中添加一个微任务
							- 参数
								回调函数
					
*/	

// Promise.resolve(2).then(result => {
// 	// console.log(111)
// 	setTimeout(() => {
// 		console.log(222)
// 	}, 0)
// })




// console.log(333)



/*
	这里相当于
		我们的第一个promise会先加载到微任务队列中
			然后到queue的代码加载到微任务对列中
				然后第三个promise加载到queue的代码后面，同样都是加载到微任务对列中
*/ 
// Promise.resolve().then(() => {
// 	Promise.resolve().then(() => {
// 		console.log(1)
// 	})
// })

// queueMicrotask(() => {
// 	console.log(444)
// })

// 试题--1735264

console.log(1);

setTimeout(() => console.log(2));

Promise.resolve().then(() => console.log(3));

Promise.resolve().then(() => setTimeout(() => {console.log(4)}));

Promise.resolve().then(() => console.log(5));

setTimeout(() => console.log(6));

console.log(7);