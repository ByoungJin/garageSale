const Message = require('../models/Message');
const co = require('co');

// Create
exports.messageCreate = function (req, res) {
  req.assert('message', 'message is not valid').notEmpty();
  req.assert('receiver', 'receiver cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  const message = new Message();
  message.message = req.body.message;
  message.sender = req.user.email;
  message.receiver = req.body.receiver;

  // message 저장
  message.save(function () {
    res.send({message: message});
  });
};

// Read User List
exports.userList = co.wrap(function*(req, res) {
  const messages = yield Message.userList(req.user.email);

  if (!messages) {
    return res.status(401).send({
      msg: 'Could not find Messages'
    });
  }

  res.send({messages: messages});
});

// Read Message List
exports.messageList = co.wrap(function*(req, res) {
  const messages = yield Message.messageList(req.user.email, req.params.email);
  if (!messages) {
    return res.status(401).send({
      msg: 'Could not find Messages'
    });
  }

  res.send({messages: messages});
});

// Delete
exports.messageDelete = co.wrap(function*(req, res) {
  const message = yield Message.readOne(req.body.messageId);
  if (!message) {
    return res.status(401).send({
      msg: 'Could not find Message'
    });
  }
  message.remove(function(){
    res.send({msg : "remove success"});
  });
});