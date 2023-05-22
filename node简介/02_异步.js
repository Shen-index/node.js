// 同步
// function foo(item1,item2) {


//     const bar = Date.now()

//         while(Date.now() - bar < 10000) 
//         {}

//     return item1 + item2
// }
// console.log("1112");
// const sum = foo(111,222)
// console.log(sum);
// console.log("222");

//异步
// function foo(item1,item2) {
//     const bar = Date.now()
//         setTimeout(() => {
//           return item1 + item2  
//         }, 10000)
    
// }
// console.log("1112");

// const sum = foo(111,222)

// console.log(sum);//underfined

// console.log("222");
 


// 解决undefined的问题
function foo(item1,item2,item) {
    const bar = Date.now()
        setTimeout(() => {
            item(item1 + item2)
            //这里的参数作为回调函数传回去
        }, 1000)
    
}
console.log("1111");

// 这里的参数接受上面的参数（需要算多少就加多少格回调函数）
foo(111,222,(result) => {
    foo(result,6,(result) => {
        foo(result, 7, (result) =>{
            foo(result, 8, (result) =>{
                foo(result, 9, (result) =>{
                    console.log(result);
                }) 
            }) 
        }) 
    })
    
})


console.log("2222");
