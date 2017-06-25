

//////////////////////////////////////////////////////////////////////
// remove the user
/*
exports.RemoveUserById = function(userId) {

    // find the user
    Users.findOne({userId: userId}, function(err, data) {

        if(data != null) {
            console.log('The user is found.');
            console.log('');

            Users.remove({userId: userId}, function(err, data) {
                console.log('The user is removed.');
                console.log('');
            });

        }
        else {
            console.log('Cannot find the user.');
            console.log('');
        }

    });

};


//////////////////////////////////////////////////////////////////////
// update the user
exports.UpdateUser = function(userId, newData) {

    // find the user
    Users.findOne({userId: userId}, function(err, data) {

        if(data != null) {
            console.log('The user is found.');
            console.log('');

            Users.update({userId: userId}, newData, function(err, data) {
                console.log('Successfully changed user account.');
                console.log('');
            });

        }
        else {
            console.log('Cannot find the user.');
            console.log('');
        }

    });

};


//////////////////////////////////////////////////////////////////////
// user counts
exports.UserCounts = function() {

    Users.count({}, function(err, count) {
        console.log('count: ' + count);
        myCount = count;
    });

    return myCount;

};
    */