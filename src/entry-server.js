import createApp from "./app";

export default context=>{
    // 服务端有些东西是异步的，所以用promise
    return new Promise((resolve,reject)=>{
        const { app, router } = createApp()
        // 进入到首屏
        router.push(context.url)
        router.onReady(()=>{
            resolve(app)
        },reject)
    })

}
