var chai = require('chai');
var colors = require('colors');

chai.should();

require('coffee-script/register');
require('babel/register');

require('./tokenize');
require('./analyze');
require('./builder');
require('./utils');

setTimeout(function () {
    console.log(colors.yellow(new Date().toLocaleString()));
});
