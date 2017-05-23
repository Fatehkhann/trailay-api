const _ = require('lodash');

const {mongooseConn} = require('../server/db/mongoose');
const {messageSchemaFields} = require('./messageSchemaFields');

var MessageSchema = new mongooseConn.Schema(messageSchemaFields);

//Instance Methods 

// MessageSchema.statics.findByMessageId = function(id) {
//     var message = this;
//     var decoded = undefined;

//     message.findOne({
//         'message_trailay_id': id
//     }).then((messageFound) => {
//         return messageFound;
//     }).catch((e) => {
//         return 'An Error Occured' + e ;
//     })
// }

MessageSchema.methods.toJSON = function() {
    var message = this;
    var messageObject = message.toObject();

    return _.pick(messageObject, ['_id', 'message_sender', 'message_receiver', 'message_body', 'message_to', 'message_from']);
}

// End of Instance Methods

module.exports.messageSchema = mongooseConn.model('Messages', MessageSchema);
//mongooseConn.connection.close();