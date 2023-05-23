/*
    ES模块化
*/ 
// 向外部导出内容
export let a = 10
export let b = 20
export let obj = {
    name:"悟空",
    age: 18
}

/*
    default设置默认导出，
        一个模块中，只能有一个默认导出,可以导出对象 default后面不能写let const这种
*/ 
export default function sum(a, b){
    return a + b
}
