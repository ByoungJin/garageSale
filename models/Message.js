var mongoose = require('mongoose');

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
};

var messageSchema;
messageSchema = new mongoose.Schema({
  message: String,
  sender: String,
  receiver: String
}, schemaOptions).plugin(require('mongoose-id'));

// 비지니스 로직
messageSchema.statics = {
  userList: function (userEmail) {
    return this.aggregate([
      {$match: {$or: [{sender: userEmail}, {receiver: userEmail}]}},
      {
        $group: {
          _id: {
            $cond: {
              if: {$gte: ['$sender', '$receiver']},
              then: {$concat: ['$sender', '$receiver']},
              else: {$concat: ['$receiver', '$sender']}
            }
          },
          last: {$last: "$$ROOT"}
        }
      }
      , {
        $project: {
          _id: '$last._id',
          updatedAt: '$last.updatedAt',
          createdAt: '$last.createdAt',
          receiver: '$last.sender',
          sender: '$last.sender',
          message: '$last.message'
        }
      }
    ]).exec();
  },
  messageList: function (userEmail, otherEmail) {
    return this.find({
      $or: [
        {'sender': userEmail, 'receiver': otherEmail},
        {'sender': otherEmail, 'receiver': userEmail}
      ]
    }).sort({'createdAt': 1}).exec();
  },
  readOne: function (messageId) {
    return this.findOne({_id: new mongoose.Types.ObjectId(messageId)}).exec();
  }

};

var Message = mongoose.model('Message', messageSchema);

module.exports = Message;
