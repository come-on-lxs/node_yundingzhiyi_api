const mongoose=require("../mongoose")

const Schema=mongoose.Schema;

/*
 * @params {String} username 账户名
 * @params {String} password 密码
 * @params {String} desc 描述
 * @params {String} roleId 角色id
 * @params {Date} create_time 创建时间
 * @params {Date} update_time 修改时间
 * @params {String} status 状态 1-正常 0-禁用
 */
const AccountSchema=new Schema({
    username:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    desc: String,
    roleId: {
        type: Array,
        default: []
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
    versionKey: false
});

const Account=mongoose.model("Account",AccountSchema,"admin_account");

module.exports=Account;

