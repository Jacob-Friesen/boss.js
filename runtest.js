var mocha = new (require('mocha'))({
  ui: 'bdd'
});

mocha.addFile('test.js');

mocha.run(function(failures){
  process.on('exit', function () {
    process.exit(failures);
  });
});
