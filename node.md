# node

## 1.简介

- 运行在服务器端的js
- 编写服务器
- 特点
  - 单线程
  - 异步
  - 非阻塞
  - 统一API

- 客户端（用户）
- 服务器（线程）负责给客服端工作，服务器调用数据库的数据放回给到客户端
- 线程负责从数据库调用数据放回给客户端（用户）

这里相当于咱（客户端）去餐厅（服务器）吃饭，餐厅的服务员（线程）负责给我们提供菜的信息，帮助我们如何点菜，点完菜后，厨师负责做菜，然后再由服务员给到我们



当我们需要服务时，餐厅的服务员就会创建线程，创建线程给用户处理服务，然后再从数据库里调用数据，再返回给用户





### 1.1.安装方式

- 官网

  - [节点.js (nodejs.org)](https://nodejs.org/en)
    - 这种方式有一些难免会出现不支持

- nvm

  - [发布 ·CoreyeButler/NVM-Windows (github.com)](https://github.com/coreybutler/nvm-windows/releases)

  - nvm list - 显示已安装的node版本

  - nvm install 版本 - 安装指定版本的node

    - 上面这种下载最新的直接在命令行编写 nvm install latest
    - 或者是需要下载指定版本编写编号就可以

  - nvm install lts

    - 这种是下载稳定版本（lts）

  - nvm use 版本

    - 指定使用node版本

  - 配置nvm的镜像服务器

    - 在国内下载(阿里云)，不去国外下

    - ```bash
      nvm node_mirror https://npmmirror.com/mirrors/node/
      ```

  这种方式兼容不同版本，更广泛，直接安装下载

  - 执行流程

    - 下载nvm

    - 检测是否安装完成 (nvm version)	

    - 使用命令行下载版本（可指定）

      - nvm install latest   最新版本 
      - nvm install lts   稳定版本

    -  使用那个版本 

      - nvm use latest 最新的版本
      - nvm use lts 稳定的版本
      - nvm use 版本号

    - 配置镜像的服务器

      - 使用国内的阿里云

        - ```bash
          nvm node_mirror https://npmmirror.com/mirrors/node/
          
          ```

        - 复制到终端就可以了



### 1.2.运行环境

- 终端可以直接像浏览器控制台一样输出
- 创建一个文件夹
  - 在文件夹打开终端，
  - node .\路径打开文件
- 使用vscode创建文件夹使用
  - 使用f5选中node.js运行环境



js和node.js的区别

- ECMAscript 标准  DOM  BOM（js由三部分组成）
- （node标准也是和js一样，没有DOM BOM）

## 2.异步

### 2.1.进程和线程

- 进程
  - 代码存储到计算机，当它在内存中开辟空间后，代码运行后就存储到里头，这个空间也就是进程（相当于厂房）
- 线程
  - 代码实际进行运算的东西（相当于工人）

### 2.2.同步和异步

- 同步
  
  - 代码一般都是自上而下的运行方式
  
- 这种方式和js（单线程）一样，会随着上一行代码的速度影响下一个
  
  - 同步的代码执行会出现阻塞
  
  - ```js
    function foo(a, b) {
        const bar = Date.now()
        
       	white(Date.now() - bar < 10000) {
               
        }
        return a + b
    } 
    console.log("1111")//立刻执行
    
    const sum = foo(1,1)
    
    console.log(sum)//2
    
    console.log("2222")//会等10s后执行
    
    ```





- 解决同步问题

  - 像其他的语言（java），会利用多线程解决
  - node就会通过异步来解决

- 异步

  - 一段代码的执行不会影响到其他的代码

  - 但是需要通过回调函数来返回值

    - 问题

      - 回调地狱

      - ```js
        function foo(item1,item2,item) {
            const bar = Date.now()
                setTimeout(() => {
                    item(item1 + item2)
                    //这里的参数作为回调函数传回去
                }, 1000)
            
        }
        console.log("1111");
        
        // 这里的参数接受上面的参数（需要算多少就加多少格回调函数）
        //6s后执行，并不会影响前后的代码
        
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
        
        ```

      - 代码的可读性差

      - 可调试性差

    - 解决

      -   不管它哈哈哈

      -   因为这个函数需要回调函数返回结果，所以要在返回值这里解决

          -   promise

          -   他就是一个容器，可以存储数据的对象

          -   创建Promise时，构造函数中需要一个函数作为参数

          -   promise构造函数的回调函数中，它会在创建promise时调用，调用时会有两个参数传递进去

              -   他可以存储异步调用的数据

                  ```js
                  const promise = new Promise((resolve, reject) => {
                     // resolve 和 reject是两个函数，通过这两个函数可以向promise中存储数据
                      
                 ```
         
         //resolve在执行正常时存储数据
                  	//reject在执行错误时存储数据                 
                     //resolve("第一");
                     reject("第二");
                  })
                  
         
                  console.log(promise);
      ```
            
          
      -   通过函数来向promise中添加数据，可以用来添加异步调用的数据
      
      -   ```js
          const promise = new Promise((resolve, reject) => {
             setTimeout(() => {
                 resolve("异步")
             }, 3000)
          })
          
          console.log(promise)//undefined,因为上面是异步代码，这行会立即执行，异步代码会等3s后执行
          
          
          //解决undefined
          setTImeout(() => {
              console.log(promise)
          },4000)
    
          
```
      
-   问题一：我们该如何从promise中读取数据呢
      
-   解决：通过promise实例方法then来读取promise中存储的数据
      
    -   then需要两个回调函数作为参数，回调函数用来获取promise中的数据
      
          -   第一个then的回调函数
      
          -   ```js
              //第一个读取到promise中的数据
              const promise = new Promise((resolve, reject) => {
                 setTimeout(() => {
                     resolve("异步")
                 }, 3000)
              })
              
              setTImeout(() => {
                  console.log(promise)
              },4000)
              
              //读取promise中存储的数据
              //第一个读取到promise中的数据
              promise.then((result) => {
                  console.log("promise中的数据"+ result)
              },(resultEl) => {
                  console.log("第二个参数",+resultEl)
        })
              
        ```
      
          -   第二个then的回调函数
      
              ```js
              //第二个读取到promise中的数据
              const promise = new Promise((resolve, reject) => {
                	reject("promise数据")
              })
              
              setTImeout(() => {
                  console.log(promise)
              },4000)
              
              //读取promise中存储的数据
              //then实例中有两个参数
              promise.then((result) => {
                  console.log("1"+ result)
              },(resultEl) => {
                  console.log("2",+resultEl)
        })
              
              ```
      
              



### 2.3.Promise中的静态方法

- Promise.resolve()

  - ```js
    创建一个立即完成的Promise
    等同于
    new Promise((resolve,reject) => {
      resolve("内容")  
    })
    ```

- Promise.reject()

  - ```js
    创建一个立即拒绝的Promise
    等同于
    new Promise((resolve,reject) => {
        reject("拒绝")
    })
    ```

    

- Promise.all([])

  - 添加一个数组

  - 放回的是一个数组，放回多个Promise的执行结果

  - 有一个错误，就会返回错误

    

- Promise.allSettled([])

  - 同时返回多个Promise对象
  - 返回的是对象数组，错误的数据也会返回
  - 相当有then中的第二个执行结果reason

- 

- 

  

  

  

  

  

  

  

  

  

  

  

  

​	