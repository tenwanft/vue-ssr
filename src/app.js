// 创建vue实例
import Vue from "vue";
import App from "./App.vue";
import createRouter from "./router";

// 每次渲染都需要重新创建一个vue实例，同router是一样的，所以要用函数的方法，并且在服务端不需要挂载，所以没有$mount
export default function createApp(){
    const router = new createRouter()
    const app = new Vue({
        router,
        render:h=>h(App)
    })
    return {app,router}
}

//nuxt
