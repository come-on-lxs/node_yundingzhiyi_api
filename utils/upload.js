const multer=require("@koa/multer");

// fileName 文件名，默认为文件字段名 + 时间戳
// filePath 文件存放路径,必填
function uploads(filePath, fileName) {
    if (filePath) {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, filePath)
            },
            filename: function (req, file, cb) {
                const suffixName=file.originalname.split('.')[1];
                const defaultFileName = fileName ? fileName : file.fieldname;
                cb(null, `${defaultFileName}-${Date.now()}.${suffixName}`);
            }
        })
        return upload = multer({
            storage
        })
    } else {
        throw new Error('上传文件的存放路径未设置！')
    }
}

module.exports.uploads=uploads