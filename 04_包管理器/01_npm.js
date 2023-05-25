/*
    npm
        是一个世界最大的包管理器
            下载和上传包

        由三部分组成
            - npm网站
            - npm CLi   命令行工具！！
            - 仓库 用来存储包和包的信息

        package.json
            - 它是一个包的描述文件
            - node中通过该文件对项目进行描述 
            - 每一个node项目必须有package.json
                - 是一个对象{}
                    必须有的内容，其他可选
                        name 说明名字，项目的大概
                        version 说明版本
                            1.1.1
                            大版本，增加新功能 ，补丁

        如何使用
            - 手动创建json文件
                在该目录下创建package.json

            - 自动创建json文件
                在该目录下的终端输入命令

                命令
                    npm init，往下依次执行文件的名字信息等
                    名称
                    版本
                    描述（可有可无）
                    main  一般index.js\
                    author 名字
                
                    npm init -y
                        表示所有的都按照默认的操作
                        问题：包名和路径名一模一样，所以会报错

        下载其他的包
            - npm install 包名
                将指定的包下载到当前项目当中
                install 发生了这些情况
                    - 将包下载到当前项目的node——modules目录中
                    - 会在package-json中的dependenccies中设置依赖  就添加了一个新属性
                        例如删除了一个包
                            使用npm i 就可以创建一个node__modules
                             "lodash": "^4.17.21"
                                        三角表示匹配4的最新的的版本
                                        ~表示匹配4.17的最新版本
                                        *表示匹配最新版本
                    - 会自动添加package-lock.json文件
                        lock:锁
                            它的作用就是帮助加速npm下载的


                added 1 package, and audited 2 packages in 3s 
                下载了一个新包，检查了两个包，没有检查到错误  
            
            - npm uninstall 包名
                    删除这个包

            如果需要用以前的版本
                npm install 包名@版本
        
        全局安装
            npm install 包名 -g 全局安装，这样就是安装到计算机里头
            全局安装的通常都是一些工具
*/ 

/*
    引入从npm下载的包时，不需要书写路径，直接写包名
        const _ = require("lodash")
        console.log(_);
*/ 

/*
    package.json
        scripts
            可以自定义一些命令,然后通过命名直接调用这个命令
                test和start 直接使用npm test 或者是npm test和start或者是 npm test和start就可以直接调用它定义的数值
                其他自定义的命名就需要使用npm run 命名才能使用定义的命令
    npm镜像
        - npm仓管的服务器可以通过路径去更改（镜像），这样可以解决速度问题
        - 有两种方法可以更改这个镜像
            - 通过码云的路径安装系统cnpm
                   npm install -g cnpm --registry=https://registry.npmmirror.com
                        通过终端配置更改为国内镜像
                        问题
                            这种方式会有快捷方式,多了很多其他的东西
            - 通过命令行直接更改npm的镜像路径
                    npm set registry https://registry.npmmirror.com
                    还原到原版仓库
                        npm config delete registry
                    查看当前的npm地址
                        npm config get registry
*/ 
