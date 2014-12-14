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

defaults((arguments, (argument) 
-----------------------------
Defines default values for a given function. When an argument is not sent or it is undefined,
the value automatically becomes the default.

**Parameters**

**(arguments**: Object, 1 to n-1) The default values to assign to parameters.

**(argument**: function, n) The function to wrap.

**Returns**: function, The function wrapped with default values.

defaultObj(defaults, callback) 
-----------------------------
Defines default values for a configuration object sent in to initialize an object. When this
object is initialized and properties are not specified like in the defaults, they are
overrided by values in the defaults.

**Parameters**

**defaults**: Object, The default values object.

**callback**: function, The function (usually an object constructor) to wrap.

**Returns**: function, The function wrapped with default values.


---








