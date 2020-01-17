const xlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path');

class ExportService {
    static format(title, data) {
        let dataArr = [];
        dataArr.push(title);
        data.forEach(v => {
            let arr = [];
            arr.push(v._id);
            arr.push(v.nick);
            arr.push(v.userName);
            arr.push(v.password);
            dataArr.push(arr);
        });
        return dataArr;
    }
    static toXlsx(filename = 'sheet', datas) {
        let buffer = xlsx.build([
            {
                name: filename,
                data: datas
            }
        ]);
        let fpath = path.join(process.cwd(), '/public/upload') + `/${filename}.xlsx`;
        fs.writeFileSync(fpath, buffer, { flag: 'w' });
    }
}

module.exports = ExportService;