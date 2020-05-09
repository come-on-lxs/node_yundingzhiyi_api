const router=require("koa-router")();
const Account=require("../../db/admin/account");

router.get('/', async ctx => {
    try {
        let { username, password } = ctx.state.user
        let result = await Account.findOne({
            username: username,
            password: password
        },{ password: 0 })
        if(result) {
            ctx.body = {
                data: result
            }
        } else {
            ctx.body = {
                code: 202,
                message: '获取用户信息失败'
            }
        }
    } catch (e) {
        ctx.body = {
            code: 202,
            message: '获取用户信息失败'
        }
    }
})


module.exports=router.routes();