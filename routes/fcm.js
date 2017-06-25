
var express=require('express'),
    fs = require('fs'),
    path=require('path');

var FCM = require('fcm-node');
var mongoose = require('mongoose');
// FCM 서버를 위한 인증키 설정.
var serverKey=process.env.FIREBASE_SECRET;
var fcm = new FCM(serverKey);

// FCM 디비 스키마
var fcmSchema = mongoose.Schema({
    userid: String,
    regid: String,
});
// compiles our schema into a model
var fcms = mongoose.model('fcms', fcmSchema);


// 푸시 보내기.
module.exports=function(app){
    app.get('/sendFcmNotification',function (req,res){
        var data=req.body;
        var messagee="Hey! you got this notification.";
        var title="DigitSTORY Notification";
        var token=process.env.FIREBASE_TESTCLIENT_TOKEN;
        var message = {
            to: token,
            notification: {
                title: title, //title of notification
                body: messagee, //content of the notification
                sound: "default",
                icon: "ic_launcher" //default notification icon
            },
            data: data //payload you want to send with your notification
        };
        fcm.send(message, function(err, response){
            if (err) {
                console.log("Notification not sent");
                res.json({success:false})
            } else {
                console.log("Successfully sent with response: ", response);
                res.json({success:true})
            }
        });

    });

    app.post('/saveFcmUser',function(req,res){

        req.assert('userId', 'userId fail').notEmpty();
        req.assert('regId', 'regId fail').notEmpty();

        var errors = req.validationErrors();

        if (errors) {
            return res.status(400).send(errors);
        }

        var data=req.body;

        var in_fcm = new fcms({
            userid: data.userId,
            regid: data.regId
        });

        // save an user
        in_fcm.save(function(err) {
            res.json({success:true})
            console.log('A new user is inserted.');

        });

    });
};
