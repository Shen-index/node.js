/*
    1.Promise
        - promise就是一个存储数据的对象
        - 由于它的存取数据特殊，所以可以直接将异步调用的结果存储到promise中  
*/ 

// const promise = new Promise((resolve, reject) => {
//     reject("今天周三啦")    
// })

// promise.then((result) => {
//     console.log(promise);
// },(reason) => {
//     console.log("出错了",promise);
// })
 
// function fn(a, b, c) {
//     setTimeout(() => {
//         c(a + b) 
//     }, 1000)
// }
// fn(1,1,function(sum) {
//     console.log(sum);
    
// })




/*
    1.1.解决异步循环地狱的问题
        - 异步的promise都是通过返回值去编写代码
            如果我们接收的数值最终是promise
                那么我们就不要去接收函数，直接利用then或者是catch取就好了
        - then catch finally 都会放回一个新的promise
            then
                - then里面的回调函数的返回值会成为新的promise的result
*/
    
// function fn(a, b) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(a + b)
//         }, 1000)
//     })
// }
// fn(1, 2).then(result  => {
//     console.log(result)
// })


const promise = new Promise((resolve, reject) => {
    resolve("哈哈哈")
})

const sum = promise.then(result => {
    console.log("这是then里面的数据",result);
    return "返回值"//undefined
    
})
// setTimeout(() => {
//     console.log(sum);//返回值
// }, 2000);


    // 读取sum里面的数据
    sum.then((item) => {
        console.log(item);
        
    })