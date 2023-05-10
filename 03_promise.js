// 第一段：回调函数

//  function fn(a, b, sum) {
//     sum(a + b)
//  }
// //  fn(12,12,function(result){
// //     console.log("111");
// //     console.log(result);
      
// //  })





//1-2之间，promise的使用
// // 创建Promise时，构造函数中需要一个函数作为参数
// // promise构造函数的回调函数中，它会在创建promise时调用，调用时会有两个参数传递进去
// const promise = new Promise((resolve, reject) => {
//    // resolve 和 reject是两个函数，通过这两个函数可以向promise中存储数据
//    setTimeout(() => {
//       resolve("哈哈")
//    },3000)

// })
// setTimeout(() => {
//    console.log(promise);
// }, 5000)






// 第二段，利用promise中的then实例读取promise的数据
// 2-1.第一个then的回调函数
// const promise = new Promise((resolve, reject) => {
//    setTimeout(() => {
//       resolve("异步")
//   }, 3000)
// })


// // 读取promise中的数据
// promise.then((item) => {
//       console.log(item);
      
// },(item2) => {
//    console.log(item2);
   
// })


//第二个读取到promise中的数据
// const promise = new Promise((resolve, reject) => {
//    throw new Error("出错了")
//    resolve("promise中返回的书局");
//    // reject("promise数据")
// })

/*
   then回调的两个函数
      第一个
        通过resolve存储的数据，会调用promise中第一个函数返回

      第二个
        通过reject存储的数据或者出现异常时，会调用promise第二个函数返回
         那我们处理这个promise的异常就要在then的第二个回调函数中处理

      这里的then中两个回调函数和promise中的参数没有关系
         因为promise中的函数是promise自己创建的
         then中两个回调函数是我们创建的，因为我们要拿到promise的数据
*/ 
// promise.then((result) => {
//   console.log("1", result)
// }, (resultEl) => {
//   console.log("2", resultEl)
// })






// 第三段：then的原理
/*
   promise
      promise.resolve()静态方法也可以向resolve中添加数据

   promise中维护了两个隐藏属性
   衍生知识点
      异步调用最大的问题？
         答：什么时候拿（时机）
      PromiseResult
         - 用来存储数据，意思就是不管是resolve或者是reject他们两那个存储的数据
            最后都是它的
      PromiseState
         - 记录Promise的状态（三种状态）
            - fulfilled （完成）
               通过resolve存储的数据
            - rejected （出错）
               通过reject存储的数据
            - pending (数据正在进行中)
               通过计时器存储的，因为计时器要倒计时才执行
         - State只能修改一次，修改以后就不会在变

      PromiseState的流程
         promiseState的默认值就是pending
               通过resolve存储的数据,PromiseState就是fulfilled
                  PromiseResult变成存储的数据
               通过reject存储数据，或出错时，PromiseState就是rejected
                  PromiseResult变成存储的数据或者是异常对象哦
         
         promise的实例then
            当我们使用then时，其实就有两个回调函数放回
               当我们PromiseState设置了resolve时，就调用第一个then的回调函数
               当我们promiseState设置了reject时，就调用第二个then的回调函数

            延伸知识：then中的代码因为是监听所以是后执行

      const promiseEl = new Promise((resolve, reject) => {
         // resolve("hello")
         reject("wolid")
      })

      console.log(promiseEl);
      promiseEl.then((item) => {
         console.log(item);
      })



  
      
*/ 








//第四段-catch()
      // Promise.catch()
      // 只有一个参数（回调函数）
      // 它的回调函数只会在promise被拒绝时才调用
      // 它就像then中的第二个参数then(null, reject)
      // 他就是专门为了处理promise异常的方法
// const promise = new Promise((resolve,reject) => {
//    reject('这是catch方法');
// })

// promise.catch((item) =>{
//    console.log("1",item);
// },(item1) => {
//    console.log("2",item1);
// })






/*
   5.finally()少用
      - finally()
      - 不管是正常还是出现异常，它都会执行
      - 它的回调函数中不会接收数据
      - 一般用在对还是错都要执行的代码
*/
// const promise = new Promise((resolve,reject) => {
//    reject("没有什么能够阻挡哥");
// })
// promise.finally(() => {
//    console.log(promise)
// })