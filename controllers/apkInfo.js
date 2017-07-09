var ApkInfo = require('../models/ApkInfo');
const co = require('co');

// Create
exports.apkInfoCreate = function (req, res, next) {

    var apkInfo = new ApkInfo();

    apkInfo.name = req.body.name;
    apkInfo.installPageUrl = req.body.installPageUrl;

    // apkInfo 저장
    apkInfo.save(function (err) {
        res.send({apkInfo: apkInfo});
    });
};

// Read All
exports.apkInfoRead = co.wrap(function* (req, res, next) {
    var apkInfo = yield ApkInfo.listAll();
    res.send({apkInfo : apkInfo});
});