var { TFSchedule } = require('../src/index');
const config = require('../config.json');
const path = require('path');

console.log('config',config);

var scheHandle = new TFSchedule({
    backExecRecordNum: 1,
    mysqlConfig: config.mysql,
    entryFile: 'index.js', // 设置默认的入口文件
    command: 'node', // 设置默认的执行器
    taskRootPath: path.join(config.basePath,config.taskRootPath),
    notifyList: config.notifyList
});
scheHandle.on('notify', function(notifyInfo) {
    var { type, title, content, notifyList } = notifyInfo;
    try {
        console.log(`告警信息\n${JSON.stringify(notifyInfo)}`);
        title = 'TFSchedule批跑系统通知 ' + title;
        content = content || '';
        if (process.env.NODE_ENV === 'production') {
            notifySendRTX && notifySendRTX({
                title: title,
                msg: content,
                receiver: notifyList + ';wilsonsliu'
            });
        } else {
            console.log("notifyTaskRTX-本地开发环境，不发生警告");
        }
    } catch (e) {
        console.error('告警异常', e);
    }
});

function notifySendRTX() {
    // 通知函数
    console.log(arguments);
}
