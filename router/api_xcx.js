const router=require("koa-router")();

const login=require("./api_xcx/login");
router.use("/login",login);

module.exports=router.routes();