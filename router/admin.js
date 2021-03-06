const router=require("koa-router")();
const login=require("./admin/login");
const account=require("./admin/account");
const races=require("./admin/races");
const hero=require("./admin/hero");
const equips=require("./admin/equips");
const home=require("./admin/home");

router
    .use('/login', login)
    .use('/accountInfo', account)
    .use('/home', home)
    .use('/races', races)
    .use('/hero', hero)
    .use('/equips', equips)

module.exports=router.routes();