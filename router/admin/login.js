const router=require("koa-router")();
const jwt=require("jsonwebtoken"); // 生成token
const config=require("../../node.config");   // token加密秘钥
const Account=require("../../db/admin/account");
const crypto = require("crypto");   // 加密

router.post('/', async (ctx) => {

    const user = ctx.request.body;

    // 判断用户是否存在
    if (user && user.username && user.password){
        // 获取MD5加密后的密码
        let md5 = crypto.createHash("md5"); // 创建 md5
        let md5Pwd = md5.update(user.password)
        // 查询数据库
        let result = await Account.findOne({
            username: user.username,
            password: md5Pwd.digest("hex")
        })
        if(result) {
            // 判断是否禁用
            if(result.status === '1') {
                let payload = {
                    exp:Date.now() + config.jwt.expressTime,
                    username:result.username,
                    password: result.password
                };
                // 生产token
                let token = jwt.sign(payload, config.jwt.secret);
                token = `Bearer ${token}`
                // session缓存
                ctx.session.token = token;
                // 返回
                ctx.body = {
                    code:200,
                    token
                }
            } else {
                ctx.body = {
                    code:202,
                    message: '账户不可用'
                }
            }
        } else {
            ctx.body = {
                code:202,
                message: '账户不存在'
            }
        }
    }else {
        if(!user.username) {
            ctx.body = {
                code:201,
                message: '用户名不能为空'
            }
        }else if(!user.password) {
            ctx.body = {
                code:201,
                message: '密码不能为空'
            }
        } else {
            ctx.body = {
                code:201,
                message: '用户名和密码不能为空'
            }
        }
    }
});

module.exports=router.routes();