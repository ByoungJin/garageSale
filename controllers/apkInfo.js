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
    var apkInfos = yield ApkInfo.listAll();
    res.send({apkInfos : apkInfos});
});

// Redirection Install Url
exports.apkInstall = co.wrap(function* (req, res, next){
  var apkInfo = yield ApkInfo.listRecentOne();
  // res.send({apkInfo : apkInfo.installPageUrl});
  res.redirect(apkInfo.installPageUrl);
});