const Koa=require("koa");
const Router=require("koa-router");
const Serve = require("koa-static");
const bodyParser = require("koa-bodyparser");
const jwt=require("jsonwebtoken");
const koaJwt=require("koa-jwt");
const session = require('koa-session');
const config = require("./node.config")
const cors = require('@koa/cors');

const app=new Koa();
const router=new Router();

// cors跨域
app.use(cors({
    origin: function (ctx) {
        return '*';
    },
    maxAge: 5,
    credentials: false,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}))

// session配置
app.keys = ["2416728360"];
const CONFIG = {
    key: 'koa:sess',
    maxAge: 1000*60*60*24   // 过期1天
}
app.use(session(CONFIG, app));


// 静态资源托管模块
app.use(Serve(__dirname + "/public"));


// body-parser
app.use(bodyParser());


// koa-jwt路由权限控制
const jwtSecret=config.jwt.secret;   // 秘钥

// 过滤
app.use(koaJwt({
    secret:jwtSecret
}).unless({
    path: [/\/admin\/login/,/^\/api_xcx\/login/, /\/uploads$/]
}));


/*
* 统一拦截
exp: jwt的过期时间，这个过期时间必须要大于签发时间
iat: jwt的签发时间
* */
app.use(async (ctx,next)=>{
    // 判断token
    const token=ctx.header.authorization ;
    if(token && token !== 'null' && token !== 'undefined'){
        // 验证token是否和缓存一致
        if(token!==ctx.session.token){
            ctx.body={
                code: 403,
                message:"token已失效,请重新登陆"
            }
            return;
        }
        //使用jsonwebtoken自行解析数据
        let payload = jwt.decode(token.split(' ')[1], jwtSecret);
        const { exp } = payload;
        const now = Date.now();
        // 过期
        if(now > exp){
            ctx.body={
                code: 402,
                message:"token过期，请重新登陆"
            };
            return;
        }
    }
    await next().catch(err=>{
        if(401 == err.status){
            ctx.body={
                code: 401,
                message:"未登录"
            }
        }else{
            throw err;
        }
    })
});

router.get('/', async (ctx) => {
    ctx.body = 'Hello koa-jwt'
});


// 嵌套路由
const admin=require("./router/admin");  //后台api
router.use("/admin",admin);
const  xcx=require("./router/api_xcx");
router.use("/api_xcx",xcx);


app.use(router.routes()).use(router.allowedMethods());
app.listen(config.base.port, config.base.url);


