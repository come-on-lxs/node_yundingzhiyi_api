const mongoose=require("mongoose");
const config=require("../node.config");

mongoose.connect(`mongodb://${config.db.username}:${config.db.password}@${config.db.url}:${config.db.port}/${config.db.name}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoReconnect: true,
    keepAlive: 120
},(err)=>{
    if(err){
        console.log(`数据库链接失败--${err.toString()}`);
        return;
    }
});

module.exports=mongoose;