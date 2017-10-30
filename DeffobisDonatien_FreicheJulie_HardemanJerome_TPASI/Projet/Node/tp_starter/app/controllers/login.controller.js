'use strict';
//var server = require("../../app.js");
//var io = require('socket.io')(server);

var request = require('request');

this.check = function(req,res)
{
	/*console.log("----------------- REQUEST ------------------------");
	console.log(req);
	console.log("----------------- REQUEST.LOGIN ------------------------");
	console.log(req.login);
	console.log("----------------- REQUEST.BODY.LOGIN ------------------------");
	console.log(req.body.login);*/

	var options = {
		"uri" : "http://localhost:8080/FrontAuthWatcherWebService/rest/WatcherAuth",
		"method" : "post",
		"json" : req.body
	}
	request.post(options, function (error, response, body) {
    if (error) {
      return console.error('upload failed:', error);
    }
    console.log('Contact with jee successful!  Server responded :'+ response.validAuth +" ----- and body :"+body.validAuth);
    res.end(JSON.stringify(body));//"MESSAGE BIDON ET VISIBLE");
  });
	
}


module.exports = this;