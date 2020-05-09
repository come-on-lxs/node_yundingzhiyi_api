const router=require("koa-router")();

router.get("/",async (ctx,next)=>{
    ctx.set('Access-Control-Allow-Origin', "http://localhost:8078");
    ctx.set('Access-Control-Allow-Credentials', true);
    console.log(ctx.request.body)
    ctx.body= {
        msg: 1
    }
})

module.exports=router.routes();