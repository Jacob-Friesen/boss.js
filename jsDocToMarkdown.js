jsdox = require("jsdox");

jsdox.generateForDir('boss.js', 'docs', null, function(err){
  if (err) throw err;
});
