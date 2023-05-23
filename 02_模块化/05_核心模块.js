/*
    核心模块
        - node自带的模块，可以在node直接使用
        - window是浏览器的宿主对象，node中没有 
        - global是node中的全局对象，作用类似于window
            ES标准下，全局对象的标准名是globalThis



    核心模块
        process
            - 表示当前node的进程
            学习新的知识该怎么做
            - 通过该对象可以获取进程的信息，或者对进程做操作
            - 如何使用
                1. 如何获取对象
                    - process是一个全局变量，可以直接使用
                    - 有哪些方法和属性
                        process.exit()
                            - 结束当前进程,终止执行
                            - 参数
                                传入数字也是结束，它是一个状态码
                                    表示结束的问题，一般不用

                        process.nextTick(callback[, ...args]);
                            它比微任务执行还快
                            将函数插入到tick队列中
                                tick队列中的代码会在下一次事件循环之间循环


                        调用栈
                        （tick队列）
                        微任务
                        宏任务

*/ 





// console.log(globalThis);
// console.log(process);
// console.log(111);
// process.exit()
// console.log(222);
// console.log(333);

setTimeout(() => {
    console.log(1);
})//宏任务


queueMicrotask(() => {
    console.log(3);
    
})//微任务


process.nextTick(() => {
    console.log(2);
})//tick队列


console.log(4);//调用栈
