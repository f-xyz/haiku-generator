var chai = require('chai');
var colors = require('colors');
require('coffee-script/register');
require('babel/register');

chai.should();
console.log(colors.yellow(new Date().toLocaleString()));

require('./tokenize');
require('./analyze');
require('./build');
require('./utils');
