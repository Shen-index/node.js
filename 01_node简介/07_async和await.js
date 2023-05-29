/*
	async
		- 通过async快速创建异步函数(语法糖)
			异步函数的返回值会自动封装到一个Promise中放回
		- 在async声明的异步函数中可以使用await方法
		- 它声明的函数中没有写await，那就会依次执行
		
		await
			等待异步函数的结果出来后才会返回结果
			await只能用于async声明的异步函数中，或es模块的顶级作用域中
			它不会阻塞异步函数以外的代码
				也就是阻塞异步函数内部的代码
			通过await调用的代码，需要通过try-catch来处理异常
			  		
*/ 
// async function fn() {
// 		return 10
// }
// fn().then(r => {
// 	console.log(r)
// })

// function sum(a, b) {
// 	return new Promise(resolve => {
// 		setTimeout(() => {
// 			resolve(a + b)
// 		}, 2000)
// 	})
// }

// /*
// 	Promise中的链式调用解决了回调地狱，但是链式会很多
// */ 
// async function fn() {
// 	// sum(1, 1)
// 	// 	.then(r => sum(r, 2))
// 	// 	.then(r => sum(r, 3))
// 	// 	.then(r => console.log(r))
// 	try{
// 		let result = await sum(1, 1)
// 		result = await sum(result, 9)
// 		result = await sum(result, 9)
// 		console.log(result)
// 	}catch(e){
// 		console.log("ccl")
// 		//TODO handle the exception
// 	}
	
// 	// console.log(1)
// 	// console.log(2)
// }

// fn()
// 	console.log(3)
	
	
	
	
	// 执行顺序--1-2-3-4
	// async function fn() {
	// 	console.log(1)
	// 	console.log(2)
	// 	console.log(3)
	// }
	
	// fn()
	
	// console.log(4)
	
	// function fn2() {
	// 	return new Promise(resolve => {
	// 		 console.log(1)
	// 		 console.log(2)
	// 		 console.log(3)
	// 		 resolve()
	// 	})
	// }
	
	/*
		当使用await调用函数后，当前函数后面的所有代码
			会在当前函数执行完毕后，被放入到微任务队列中
	*/ 
    // async function fn3(){
    //     console.log(1)
    //     await console.log(2)
    //     console.log(3)
    // }
    
    // fn3()
    
    // console.log(4)

	function fn(a , b) {
		return new Promise(resolve => {
			resolve
		})
	}
	fn(1,1)
	console.log(fn(1,1))