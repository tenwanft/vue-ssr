// 挂载激活
import createApp from "./app";

const { app,router } = createApp();

router.onReady(()=>{
    app.$mount('#app');
})

