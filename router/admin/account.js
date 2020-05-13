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
});

router.get("/list", async ctx => {
    let data = ctx.request.query;
    let page_index = data.page_index ? Number(data.page_index) : 1;
    let page_size = data.page_size ? Number(data.page_size) : 10;
    let count = await  Account.countDocuments({});
    let res = await Account.find({}, {password: 0}).skip((page_index - 1) * page_size).limit(page_size);
    if(res) {
        ctx.body = {
            code: 200,
            data: res,
            total: count
        }
    } else {
        ctx.body = {
            code: 203,
            message: '失败'
        }
    }
});


module.exports=router.routes();