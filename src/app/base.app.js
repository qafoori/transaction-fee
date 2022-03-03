const AllOf = require('../helpers/class.helper');
const Data = require('./data.app');
const Amount = require('./amount.app');

module.exports = class AppBase extends AllOf(Data, Amount) {
  // we won't do anything here
  // "AppBase" is only for combining multiple classes to a single class
};
