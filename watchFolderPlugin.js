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
        watch.createMonitor(watchFolder, function(monitor){
           monitor.on("changed", function (f, curr, prev) {
              compiler.run(function(err) {
                if(err) throw err;
                monitor.stop();
              });
            });
        });   
      }else{
        console.log("[watchFolderPlugin] folder not exists");
      }
    });
    callback();
  });
};

module.exports = watchFolderPlugin;