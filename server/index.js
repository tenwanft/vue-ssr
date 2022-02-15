const express = require('express')
const Vue = require('vue')
const fs = require('fs')
const path = require('path')
// 也可以用koa，随便用
//创建express,vue实例
const app = express()

// 将来用渲染器渲染pages可以得到html内容
const pages = new Vue({
    data:{
        title:'这是ssr渲染'
    },
    template:'<div>Hello World<h1>{{title}}</h1></div>'
})
//创建渲染器
const { createBundleRenderer } = require('vue-server-renderer')
// 客户端清单
const clientManifest = require('../dist/client/vue-ssr-client-manifest.json')
// 服务端打包路径
const serverBundle = require('../dist/server/vue-ssr-server-bundle.json')
const renderer = createBundleRenderer(serverBundle,{
    // 要告诉需要有哪些js的清单要渲染
    runInNewContext:false,//上下文

    // template:fs.readFileSync(path.resolve(__dirname,'..','public/index.temp.html'),'utf-8'),//读取宿主文件,改成绝对地址path
    template:fs.readFileSync('../public/index.temp.html','utf-8'),//读取宿主文件,改成绝对地址path
    clientManifest
})

//中间件处理静态文件请求,必须要加后面这个，即不让他渲染index.html。
app.use(express.static('../dist/client',{index:false}))
// const renderer = require('vue-server-renderer').createRenderer()
// 由于renderer.renderToString是异步的 ，建议使用async方法,路由请求变为*，都通过，即通过renderer去接管
app.get('*',async (req,res)=>{
    try{
        // 对应vue里面的context
        const context = {
            url:req.url,
            title:'哈哈哈哈哈'
        }
        // 不再接受page，接收上下文context，即交给vue内部处理
        const html = await renderer.renderToString(context)
        console.log(html)
        res.send(html)
    }catch (e) {
      res.status(500).send('服务器渲染错误')
    }

})

app.listen('3000',()=>{
    console.log('启动了---')
})
