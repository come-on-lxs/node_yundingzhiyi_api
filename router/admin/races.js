const router=require("koa-router")();
const uploads=require("../../utils/upload").uploads('public/uploads/races');
const path=require("path");
const baseUrl=require("../../node.config").base;
const Races=require("../../db/admin/races")
const mongoose=require("mongoose")


// 上传图片
router.post('/upload', uploads.single('raceImg'), async (ctx)=>{
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

// 列表
router.get('/list', async (ctx)=>{
    await Races.find().then(res => {
        ctx.body = {
            code: 200,
            data: res
        }
    }).catch(e => {
        ctx.body = {
            code: 203,
            message: e.toString()
        }
    })
});

// 删除
router.post('/delete', async (ctx) => {
    let data = ctx.request.body;
    if(!data || !data.id) {
        ctx.body = {
            code: 201,
            message: '缺少参数_id'
        }
    } else {
        await Races.remove({
            _id: mongoose.Types.ObjectId(data.id)
        }).then(res => {
            ctx.body={
                code: 200,
                message: '成功'
            }
        }).catch(e => {
            ctx.body={
                code: 201,
                message: e.toString()
            }
        })
    }
});

// 添加
router.post("/add", async (ctx)=>{
    let data=ctx.request.body
    if(!data) {
        ctx.body={
            code: 201,
            message: '缺少参数'
        }
    } else {
        if(!data.name) {
            ctx.body={
                code: 201,
                message: '缺少种族名称'
            }
        } else if(!data.content) {
            ctx.body={
                code: 201,
                message: '缺少羁绊效果'
            }
        } else if(data.status !== 0 && !data.status) {
            ctx.body={
                code: 201,
                message: '缺少是否启用'
            }
        } else if(!data.imgUrl) {
            ctx.body={
                code: 201,
                message: '缺少图标'
            }
        } else {
            let newRace = new Races(data);
            await newRace.save().then(() => {
                ctx.body={
                    code: 200,
                    message: '成功'
                }
            }).catch(e=>{
                ctx.body={
                    code: 201,
                    message: e.toString()
                }
            });
        }
    }
});

// 修改
router.post('/edit', async ctx=>{
    let data = ctx.request.body;
    if(!data) {
        ctx.body={
            code: 201,
            message: '缺少参数'
        }
    } else {
        if(!data._id){
            ctx.body={
                code: 201,
                message: '缺少id'
            }
        } else if(!data.name) {
            ctx.body={
                code: 201,
                message: '缺少种族名称'
            }
        } else if(!data.content) {
            ctx.body={
                code: 201,
                message: '缺少羁绊效果'
            }
        } else if(data.status !== 0 && !data.status) {
            ctx.body={
                code: 201,
                message: '缺少是否启用'
            }
        } else if(!data.imgUrl) {
            ctx.body={
                code: 201,
                message: '缺少图标'
            }
        } else {
            await Races.where({
                _id: mongoose.Types.ObjectId(data._id)
            }).update({
                name: data.name,
                content: data.content,
                imgUrl: data.imgUrl,
                status: data.status,
                update_time: new Date()
            }).then(res => {
                ctx.body={
                    code: 200,
                    message: '成功'
                }
            }).catch(e => {
                ctx.body={
                    code: 201,
                    message: e.toString()
                }
            })
        }
    }
});

// 禁用启用
router.post('/change_status', async ctx=>{
    let data = ctx.request.body;
    if(!data || !data.id || !data.status) {
        ctx.body = {
            code: 201,
            message: '缺少参数'
        }
    } else {
        await Races.update({
            _id: mongoose.Types.ObjectId(data.id)
        }, {
            status: data.status
        }).then(() => {
            ctx.body={
                code: 200,
                message: '成功'
            }
        }).catch(e => {
            ctx.body={
                code: 201,
                message: e.toString()
            }
        })
    }
});

module.exports=router.routes()