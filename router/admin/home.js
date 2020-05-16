const router = require("koa-router")();
const Hero=require("../../db/admin/hero");
const Equips=require("../../db/admin/equips");
const Races=require("../../db/admin/races");

router.get("/", async ctx=>{
    await Promise.all([Hero.countDocuments({}), Equips.countDocuments({}), Races.countDocuments({})]).then(res => {
        ctx.body = {
            code: 200,
            data: {
                hero: res[0],
                equip: res[1],
                race: res[2]
            }
        }
    }).catch(e => {
        ctx.body = {
            code: 203,
            message: e.toString()
        }
    })
});

module.exports = router.routes();