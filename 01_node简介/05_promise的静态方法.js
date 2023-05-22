/*
	Promise.resolve()
		创建一个立即完成的Promise
	同等于	new Promise((resolve,reject) => {
			resolve(10)
		})
	Promise.reject()
		创建一个立即拒绝的Promise
	同等于	new Promise((resolve,reject) => {
			reject(10)
		})
	Promise.all([])
		- 添加一个数组
		- 返回的是一个数组，返回多个Promise的执行结果
		它类似于短路，只要有一个错误，就会返回错误
		
	Promise.allSettled([])
		- 同时返回多个Promise对象
		- 返回的对象数组，错误的数据也会返回，reason
		
	Promise.race([])
		- 多个Promise同时跑,谁快要谁
		- 返回最快的，无论对错
	
	Promise.any([])
		- 多个Promise同时跑,谁快要谁
		- 返回正确的
*/ 
// Promise.resolve(10)
// Promise.reject(10)

function fn(a, b) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(a + b);
		},1000);
	});
};

// Promise.all([
// 	fn(1, 2),
// 	fn(3, 4),
// 	Promise.reject("10")
// 	fn(5, 6)
// ]).then(result => {
// 	console.log(result)
// })


// Promise.allSettled([
// 	fn(1, 2),
// 	fn(3, 4),
// 	Promise.reject("10"),
// 	fn(5, 6)
// ]).then(result => {
// 	console.log(result)
// })


// Promise.race([
// 	Promise.reject(123),
// 	fn(1, 2),
// 	fn(3, 4),
// 	fn(5, 6)
// ]).then(result => {
// 	console.log(result)
// }).catch(reason => {
// 	console.log(reason)
// })

// Promise.any([
// 		Promise.reject(123),
// 	fn(1, 2),
// 	fn(3, 4),
// 	fn(5, 6)
// ]).then(result => {
// 	console.log(result)
// }).catch(reason => {
// 	console.log(reason)
// })


// 因为Promise里头的代码放到了消息队列中，所以222先执行
// Promise.resolve().then(result => {
// 	console.log(111)
// })

// console.log(222)