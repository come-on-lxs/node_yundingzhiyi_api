const mongoose=require("../mongoose")

const Schema=mongoose.Schema;

/*
 * @params {String} name 英雄名称
 * @params {String} skill_name 技能名称
 * @params {String} skill_type 技能类型
 * @params {String} skill_content 技能简介
 * @params {String} skillImg 技能图片
 * @params {String} heroImg 英雄图片
 * @params {Number} cost 费用
 * @params {Array} races 羁绊
 * @params {Object} attr 角色属性
 * @params {Date} create_time 创建时间
 * @params {Date} update_time 更新时间
 * @params {String} status 状态 1-正常 0-禁用
 */
const HeroSchema=new Schema({
    name:{
        type: String,
        required: true
    },
    skill_name: {
        type: String,
        required: true
    },
    skill_type: {
        type: String,
        required: true
    },
    skill_content: {
        type: String,
        required: true
    },
    skillImg: {
        type: String,
        required: true
    },
    heroImg: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    races: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Races',
            required: true
        }
    ],
    attr: {
        type: Object,
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

const Hero=mongoose.model("Hero",HeroSchema,"hero_list");

module.exports=Hero;

