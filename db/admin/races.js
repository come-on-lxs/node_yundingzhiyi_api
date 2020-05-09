const mongoose=require("../mongoose")

const Schema=mongoose.Schema;

/*
 * @params {String} name 种族名
 * @params {String} content 羁绊效果
 * @params {String} imgUrl 图标
 * @params {Date} create_time 创建时间
 * @params {Date} update_time 修改时间
 * @params {String} status 状态 1-正常 0-禁用
 */
const RacesSchema=new Schema({
    name:{
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['0','1'],
        default: '1'
    },
    create_time: {
        type: Date,
        default: new Date()
    },
    update_time: {
        type: Date,
        default: new Date()
    }
}, {
    versionKey:false
});

const Races=mongoose.model("Races",RacesSchema,"hero_race");

module.exports=Races;

