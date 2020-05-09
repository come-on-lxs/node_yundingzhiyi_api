const router=require("koa-router")();
const uploads=require("../../utils/upload").uploads('public/uploads/heros');
const path=require("path");
const baseUrl=require("../../node.config").base;
const mongoose=require("mongoose");
const Hero=require("../../db/admin/hero")

// 上传图片
router.post('/upload', uploads.single('heroImg'), async (ctx)=>{
    if(ctx.file) {
        let filePath = ctx.file.path
        filePath = filePath.substring(7, filePath.length);
        ctx.body={
            code: 200,
            data: path.join(`${baseUrl.url}:${baseUrl.port}`, filePath)
        }
    } else {
        ctx.body={
            code: 203,
            message: '上传失败'
        }
    }
});

// 添加
router.post('/add', async ctx=>{
    let data=ctx.request.body;
    if(!data) {
        ctx.body = {
            code: 201,
            message: "缺少参数"
        }
    } else {
        if(!data.name) {
            ctx.body = {
                code: 201,
                message: "缺少参数:name"
            }
        } else if (!data.skill_name) {
            ctx.body = {
                code: 201,
                message: "缺少参数:skill_name"
            }
        } else if (!data.skill_type && data.skill_type !== 0) {
            ctx.body = {
                code: 201,
                message: "缺少参数:skill_type"
            }
        } else if (!data.skill_content) {
            ctx.body = {
                code: 201,
                message: "缺少参数:skill_content"
            }
        } else if(!data.heroImg) {
            ctx.body = {
                code: 201,
                message: "缺少参数:heroImg"
            }
        } else if(!data.skillImg) {
            ctx.body = {
                code: 201,
                message: "缺少参数:skillImg"
            }
        } else if(!data.status && data.status !== 0) {
            ctx.body = {
                code: 201,
                message: "缺少参数:status"
            }
        } else if(!data.cost) {
            ctx.body = {
                code: 201,
                message: "缺少参数:cost"
            }
        } else if(!data.attr) {
            ctx.body = {
                code: 201,
                message: "缺少参数:attr"
            }
        } else {
            let newHero = new Hero(data)
            await newHero.save().then(() => {
                ctx.body={
                    code: 200,
                    message: '成功'
                }
            }).catch(e =>{
                ctx.body={
                    code: 201,
                    message: e.toString()
                }
            })
        }
    }
});


// 列表
router.get('/list', async ctx => {
    await Hero.find({}).populate('races').exec().then(res => {
        ctx.body={
            code: 200,
            data: res
        }
    }).catch(e => {
        ctx.body={
            code: 201,
            message: e.toString()
        }
    })
});

// 删除
router.post('/delete', async ctx => {
    let data = ctx.request.body;
    if(!data || !data.id){
        ctx.body = {
            code: 201,
            message: '缺少参数: id'
        }
    } else {
        await  Hero.deleteOne({
            _id: mongoose.Types.ObjectId(data.id)
        }).then(() => {
            ctx.body={
                code: 200,
                message: '成功'
            }
        }).catch(e => {
            ctx.body ={
                code: 203,
                message: e.toString()
            }
        })
    }
});


// 编辑
router.post('/edit', async ctx => {
    let data=ctx.request.body;
    if(!data) {
        ctx.body = {
            code: 201,
            message: "缺少参数"
        }
    } else {
        if(!data._id) {
            ctx.body = {
                code: 201,
                message: "缺少参数:_id"
            }
        } else if(!data.name) {
            ctx.body = {
                code: 201,
                message: "缺少参数:name"
            }
        } else if (!data.skill_name) {
            ctx.body = {
                code: 201,
                message: "缺少参数:skill_name"
            }
        } else if (!data.skill_type && data.skill_type !== 0) {
            ctx.body = {
                code: 201,
                message: "缺少参数:skill_type"
            }
        } else if (!data.skill_content) {
            ctx.body = {
                code: 201,
                message: "缺少参数:skill_content"
            }
        } else if(!data.heroImg) {
            ctx.body = {
                code: 201,
                message: "缺少参数:heroImg"
            }
        } else if(!data.skillImg) {
            ctx.body = {
                code: 201,
                message: "缺少参数:skillImg"
            }
        } else if(!data.status && data.status !== 0) {
            ctx.body = {
                code: 201,
                message: "缺少参数:status"
            }
        } else if(!data.cost) {
            ctx.body = {
                code: 201,
                message: "缺少参数:cost"
            }
        } else if(!data.attr) {
            ctx.body = {
                code: 201,
                message: "缺少参数:attr"
            }
        } else {
            await Hero.where({
                _id: mongoose.Types.ObjectId(data._id)
            }).updateOne({
                name: data.name,
                attr: data.attr,
                cost: data.cost,
                skill_name: data.skill_name,
                heroImg: data.heroImg,
                skillImg: data.skillImg,
                status: data.status,
                skill_type: data.skill_type,
                skill_content: data.skill_content,
                update_time: new Date()
            }).then(res => {
                ctx.body={
                    code: 200,
                    message: '成功'
                }
            }).catch(e => {
                ctx.body={
                    code: 203,
                    message: e.toString()
                }
            })
        }
    }
});


// 改变状态
router.post('/change_status', async ctx => {
    let data = ctx.request.body;
    if (!data || !data.id) {
        ctx.body= {
            code: 201,
            message: "缺少参数:id"
        }
    } else if(!data.status && data.status !== 0) {
        ctx.body= {
            code: 201,
            message: "缺少参数:status"
        }
    } else {
        await Hero.updateOne({
            _id: mongoose.Types.ObjectId(data.id)
        }, {
            status: data.status === '1' ? '0' : '1'
        }).then(() => {
            ctx.body={
                code: 200,
                message: '成功'
            }
        }).catch(e => {
            ctx.body={
                code: 203,
                message: e.toString()
            }
        })
    }
});

module.exports=router.routes();