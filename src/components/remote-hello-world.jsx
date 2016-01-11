var React = require('React/addons');
// var helloTemplate = require("./local-hello-world.rt");

var Hello = React.createClass({
  
  render: function() {  
  	var helloTemplate = require("./remote-hello-world.ajs");
  	helloTemplate = helloTemplate["rui-category-banner2"];
  	if(typeof(helloTemplate)!=='undefined'){
  		return helloTemplate.apply(this);	
  	}else{
  		return (<div>loading error</div>);
  	}
  }
  
});
 
module.exports = Hello;