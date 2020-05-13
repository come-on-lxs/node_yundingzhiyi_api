const mongoose=require("../mongoose");

const Schema=mongoose.Schema;

/*
 * @params {String} name 名称
 * @params {String} desc 功能
 * @params {String} type 类型
 * @params {String} imgUrl 图片
 * @params {Array} makes 组成
 * @params {Date} create_time 创建时间
 * @params {String} status 状态 1-正常 0-禁用
 */
const EquipSchema=new Schema({
    name:{
        type: String,
        required: true
    },
    desc: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    makes: [{type: Schema.Types.ObjectId, ref: 'Equips'}],
    status: {
        type: String,
        enum: ['0','1'],
        default: '1'
    },
    create_time: {
        type: Date,
        default: new Date()
    }
}, {
    versionKey: false
});

const Equips=mongoose.model("Equips",EquipSchema,"equips_list");

module.exports=Equips;
