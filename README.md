boss.js
=======

*All beta code is IE 9+ only*

Helps you code JavaScript at a boss level. Provides a set of utilities intended to deal with JSs rough edges and provide close imitations of useful future [Harmony](http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts) proposals.

Install
-------
    npm install boss.js

Example
-------
Returning the largest 2 numbers of a sent in array, without boss.js:

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

With boss.js the default replacement is eliminated and the final print is clearer:

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

Driving Goals
-------------

* **Boss:** The result of the below objectives.
* **Organized:** In such a way that makes it easy to include only what you need.
* **Small:** Doing the absolute minimum to achieve functionality.
* **Simple:** Syntax should feel natural to you as a JS developer (without messing with Object and etc.)

*This is an experiment into ways of improving my workflow and hopefully others. It will probably go through a lot of architecture transitions until I get a final vision. Finally, it is intended to complement popular utility libaries like underscore, not compete.*

API
===

Located [here](https://github.com/Jacob-Friesen/boss.js/blob/master/docs/boss.md).
