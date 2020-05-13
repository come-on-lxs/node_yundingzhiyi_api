const router=require("koa-router")();
const Equips=require("../../db/admin/equips");
const uploads=require("../../utils/upload").uploads('public/uploads/equips');
const path=require("path");
const baseUrl=require("../../node.config").base;

// 上传图片
router.post('/upload', uploads.single('imgUrl'), async (ctx)=>{
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
        ctx.body={
            code:201,
            message: "缺少参数"
        }
    } else {
        if(!data.name) {
            ctx.body={
                code:201,
                message: "缺少参数:name"
            }
        } else if (!data.imgUrl) {
            ctx.body={
                code:201,
                message: "缺少参数:imgUrl"
            }
        } else if (!data.type) {
            ctx.body={
                code:201,
                message: "缺少参数:type"
            }
        } else {
            let newEquip = new Equips({
                name: data.name,
                imgUrl: data.imgUrl,
                type: data.type,
                makes: data.makes ? data.makes : [],
                desc: data.desc ? data.desc : ''
            });
            await newEquip.save().then(() => {
                ctx.body={
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
    }
});

// 列表
router.get('/list', async ctx=>{
    let data = ctx.request.query;
    let page_index = data.page_index ? Number(data.page_index) : 1;
    let page_size = data.page_size ? Number(data.page_size) : 10;
    let count = await Equips.countDocuments({});
    let res= await Equips.find({}).skip((page_index - 1) * page_size).limit(page_size).populate('makes', { create_time: 0, makes: 0 });
    if (res) {
        ctx.body = {
            code: 200,
            data: res,
            total: count
        }
    } else {
        ctx.body={
            code: 203,
            message: '失败'
        }
    }
});

// 组成列表
router.get('/makesList', async ctx=>{
   await Equips.find({type: '0'}, { _id: 1, name: 1 }).then(res => {
       ctx.body = {
           code: 200,
           data: res
       }
   }).catch(e => {
       ctx.body={
           code: 203,
           message: e.toString()
       }
   })
});

module.exports=router.routes();