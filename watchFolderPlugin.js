var watch = require('watch');
var path  = require('path');
var fs    = require('fs');
function watchFolderPlugin(options) {
  this.options = options;
}

watchFolderPlugin.prototype.apply = function(compiler) {
  var that = this;
  compiler.plugin("emit", function(compilation, callback) {
    var watchFolder = path.join(__dirname, that.options.watchFolder);
    fs.exists(watchFolder, function(exists){
      if(exists){
        watch.watchTree(watchFolder, function (f, curr, prev) {
          if (typeof f == "object" && prev === null && curr === null) {
          } else if (prev === null) {
          } else if (curr.nlink === 0) {
          } else {
            compiler.run(function(err) {
              if(err) throw err;
            });
          }
        });    
      }else{
        console.log("[watchFolderPlugin] folder not exists");
      }
    });
    callback();
  });
};

module.exports = watchFolderPlugin;