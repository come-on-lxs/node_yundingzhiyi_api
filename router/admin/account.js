const router=require("koa-router")();
const Account=require("../../db/admin/account");
const crypto=require("crypto");
const mongoose=require("mongoose");

// 用户信息
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

// 列表
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

// 添加账户
router.post('/add', async ctx => {
    let data = ctx.request.body;
    if(!data.username) {
        ctx.body = {
            code: 201,
            message: '缺少参数: username'
        }
    } else if (!data.status && data.status !== 0) {
        ctx.body = {
            code: 201,
            message: '缺少参数: status'
        }
    } else {
        let md5=crypto.createHash("md5");
        let newAccount = new Account({
            username: data.username,
            desc: data.desc ? data.desc : '',
            status: data.status,
            password: md5.update('123456789').digest('hex')   // 密码默认123456789
        })
        await newAccount.save().then(res => {
            ctx.body = {
                code: 200,
                message: '成功'
            }
        }).catch(e => {
            ctx.body = {
                code: 203,
                message: e.toString()
            }
        })
    }
});

// 删除
router.post('/delete', async ctx => {
    let data = ctx.request.body;
    if(!data.id) {
        ctx.body = {
            code: 201,
            message: '缺少参数: id'
        }
    } else {
        await Account.deleteOne({
            _id: mongoose.Types.ObjectId(data.id)
        }).then(() => {
            ctx.body = {
                code: 200,
                message: '删除成功'
            }
        }).catch(e => {
            ctx.body = {
                code: 203,
                message: '删除失败'
            }
        })
    }
});

// 修改密码
router.post('/resetPwd', async ctx=>{
    let data = ctx.request.body;
    if(!data.id) {
        ctx.body = {
            code: 201,
            message: '缺少参数: id'
        }
    } else if(!data.password) {
        ctx.body = {
            code: 201,
            message: '缺少参数: password'
        }
    } else {
        await Account.updateOne({_id: mongoose.Types.ObjectId(data.id)}, { password: data.password }).then(() => {
            ctx.body = {
                code: 200,
                message: '修改密码成功'
            }
        }).catch(e => {
            ctx.body = {
                code: 203,
                message: e.toString()
            }
        })
    }
})


module.exports=router.routes();