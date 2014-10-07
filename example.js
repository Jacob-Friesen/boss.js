var b = require('./boss.js');

// Return the largest 2 numbers of a sent in array

// Pre bossmode

var twoLargest = function(range) {
    var largest = [Number.MIN_VALUE, Number.MIN_VALUE];

    if (range === undefined) {
        return largest;
    }

    range.forEach(function(number) {
        if (number > largest[0]) {
            largest[1] = largest[0];
            largest[0] = number;
        } else if (number > largest[1]) {
            largest[1] = number;
        }
    });

    return largest;
};

console.log(twoLargest());// [5e-324, 5e-324]
console.log(twoLargest([1]));// [1, 5e-324]
console.log(twoLargest([1, 2]));// [2, 1]
console.log(twoLargest([3, 1, 4, 2]));// [4, 3]

// If you want to do a clean print for example;
var values = twoLargest([3, 1, 4, 2]);
console.log('Returned', values[0], 'and', values[1]);

// Bossmode

var twoLargest = b.defaults([], function(range) {
    var largest = [Number.MIN_VALUE, Number.MIN_VALUE];

    range.forEach(function(number) {
        if (number > largest[0]) {
            largest[1] = largest[0];
            largest[0] = number;
        } else if (number > largest[1]) {
            largest[1] = number;
        }
    });

    return largest;
});

console.log(twoLargest());// [5e-324, 5e-324]
console.log(twoLargest([1]));// [1, 5e-324]
console.log(twoLargest([1, 2]));// [2, 1]
console.log(twoLargest([3, 1, 4, 2]));// [4, 3]

// Now the array positions can be named;
b.deconstruct(twoLargest([3, 1, 4, 2]), function(largest, secondLargest) {
    console.log('Returned', largest, 'and', secondLargest);
});
