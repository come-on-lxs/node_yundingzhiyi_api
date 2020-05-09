const router=require("koa-router")();
const login=require("./admin/login");
const account=require("./admin/account");
const races=require("./admin/races");
const hero=require("./admin/hero");

router
    .use('/login', login)
    .use('/accountInfo', account)
    .use('/races', races)
    .use('/hero', hero)

module.exports=router.routes();