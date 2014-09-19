Global
===





---

add(name, val) 
-----------------------------
Add a constant to the set of constants.

**Parameters**

**name**: string, The name of the accessor property for the constant.

**val**: Object, The value of the constant. Can be anything; string, number, function etc.

**Returns**: Boss.constants, Object containing the set of constants.

deconstruct(result, callback) 
-----------------------------
Deconstruct a function by passing each of its values (returned as an array) as arguments.
NOTE: Since only about 255 arguments can be passed into a function, this will fail when
      returning more than that. Unlikely, but possible.

**Parameters**

**result**: Array.&lt;Object&gt;, The array of values returned from calling the callback.

**callback**: function, Called with the list of results from callback.

**Returns**: Boss, The library.


---








