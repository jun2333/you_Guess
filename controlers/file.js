const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const send = require('koa-send');
const archiver = require('archiver');
const userService = require('../services/user');
const exportService = require('../services/exportData');

class fileControler {
    static async uploadFile(ctx) {
        const file = ctx.request.files.file;//获取上传文件
        const hash = crypto.createHash('md5');
        hash.update(file.name.split('.')[0]);//将文件名进行md5签名
        const readStream = fs.createReadStream(file.path);
        let filePath = path.join(process.cwd(), '/public/upload') + `/${hash.digest('hex')}.${file.name.split('.')[1]}`;//通过process.cwd()获取根目录
        const writeStream = fs.createWriteStream(filePath);
        readStream.pipe(writeStream);
        return ctx.body = { status: 1, msg: '上传成功' };
    }
    static async uploadfiles(ctx) {
        const files = ctx.request.files.file;
        for (let file of files) {
            const hash = crypto.createHash('md5');
            hash.update(file.name.split('.')[0]);
            const readStream = fs.createReadStream(file.path);
            let filePath = path.join(process.cwd(), '/public/upload') + `/${hash.digest('hex')}.${file.name.split('.')[1]}`;
            const writeStream = fs.createWriteStream(filePath);
            readStream.pipe(writeStream);
        }
        return ctx.body = { status: 1, msg: '上传成功' };
    }
    static async exportUser(ctx) {
        let name = ctx.params.name;
        if (name !== 'user') return ctx.status = 404;
        let userList = await userService.all();
        let title = ['id', 'nick', 'name', 'password'];//定义表头数组
        let xlsxData = exportService.format(title, userList);//格式化表格数据
        exportService.toXlsx(name, xlsxData);//生成表格文件
        let filePath = `public/upload/${name}.xlsx`;//获取文件路径
        ctx.attachment(filePath);//ctx.attachment 将 Content-Disposition 设置为 “附件” 以指示客户端提示下载
        await send(ctx, filePath)
    }
    static async downloadFile(ctx) {
        let filename = ctx.params['name'];
        const hash = crypto.createHash('md5');
        hash.update(filename);
        let filePath = `public/upload/${hash.digest('hex')}.png`;//获取文件路径
        ctx.attachment(filePath);//ctx.attachment 将 Content-Disposition 设置为 “附件” 以指示客户端提示下载
        await send(ctx, filePath)
    }
    static async downloadAll(ctx) {
        let zipName = '1.zip';
        const zipStream = fs.createWriteStream(zipName);
        const zip = archiver('zip');
        zip.pipe(zipStream);
        // 如果直接打包整个文件夹，则不需要去遍历每个文件 append 到压缩包里
        // 添加整个文件夹到压缩包
        // zip.directory('public/upload');
        // 遍历文件append到zip
        let dir = `${process.cwd()}/public/upload`;
        let dirent = fs.readdirSync(dir);
        for (let i = 0; i < dirent.length; i++) {
            console.log(dirent[i]);
            zip.append(fs.createReadStream(`${dir}/${dirent[i]}`), { name: dirent[i] });
        };
        await zip.finalize();
        ctx.attachment(zipName);
        await send(ctx, zipName);
    }
}

module.exports = fileControler;