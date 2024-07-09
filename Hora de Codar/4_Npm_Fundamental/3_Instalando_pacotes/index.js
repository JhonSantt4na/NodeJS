const _ = require('lodash');

const a = [1,2,3,4,6,7]
const b = [8,4,5,4,6,9]

const diff = _.difference(a,b)

console.log(diff);