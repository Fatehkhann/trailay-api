const validator = require('validator');

const {mongooseConn} = require('../server/db/mongoose');

module.exports.messageSchemaFields = {

    message_sender: {
        type: String
    },

    message_receiver: {
        type: String
        
    },

    message_body: {
        type: String,
    },

    message_to: {
        type: String,
    },

    message_from: {
        type: String,
    },

};