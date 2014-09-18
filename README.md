boss.js
=======

Helps you code JavaScript at a boss level. Provides a set of utilities intended to deal with JSs rough edges and provide close imitations of useful future [Harmony](http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts) proposals.

Driving Goals
-------------

* **Boss:** The result of the below objectives.
* **Organized:** In such a way that makes it easy to include only what you need.
* **Small:** Doing the absolute minimum to achieve functionality.
* **Simple:** Syntax should feel natural to you as a JS developer (without messing with Object and etc.)

*This is an experiment into ways of improving my workflow and hopefully others. It will probably go through a lot of architecture transitions until I get a final vision. Finally, it is intended to complement popular utility libaries like underscore, not compete.*

API
===

**b:**<br/>
Contains most of the utility functions and a few of the utility containers

<ul>
  <b>b.constants:</b><br/>
    An object containing a list of constant names to values. Once a constant is defined it cannot be unset or deleted. Although it can be deleted if its parent is.<br/>
    <br/>
    add(name, value):<br/>
    <i>name {string}:</i> The name of the accessor for the constant.<br/>
    <i>value {*}:</i> The value of the constant. Can be anything; string, number, function etc.<br/>

<pre>
b.constants.add('SIMPLE_PI', 3.14);
console.log(b.constants.SIMPLE_PI)// 3.14

b.constants.SIMPLE_PI = 3.15;
console.log(b.constants.SIMPLE_PI)// 3.14
</pre>
</ul>
