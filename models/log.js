const validator = require('validator');

const {mongooseConn} = require('../server/db/mongoose');
const {logSchemaFields} = require('./logSchemaFields');

var LogSchema = new mongooseConn.Schema(logSchemaFields);

module.exports.logSchema = mongooseConn.model('Logs', LogSchema);