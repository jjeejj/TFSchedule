var { runWeb, webApp } = require('../src/index');
const config = require('../config.json');
const path = require('path');

runWeb({
    mysqlConfig: config.mysql,
    taskRootPath: path.join(config.basePath,config.taskRootPath),
    port: 8017,
    oauthLogin: function () {
        var MOCK_USER;
        if (process.env.NODE_ENV === 'production') {} else {
            MOCK_USER = {
                LoginName: 'wilsonsliu',
                ChineseName: '刘盛'
            };
            webApp.use(function (req, res, next) {
                if (!res.locals) {res.locals = {};}
                res.locals.userInfo = MOCK_USER;
                next();
            });
        }
    }
});
