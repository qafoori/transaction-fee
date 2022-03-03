const AllOf = require('../helpers/class.helper');
const Data = require('./data.app');
const Amount = require('./amount.app');

/**
 *
 * This class is made to extend multiple classes for using in main app (../index.js)
 * and it does nothing else
 */
module.exports = class AppBase extends AllOf(Data, Amount) {};
