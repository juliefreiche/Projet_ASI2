'use strict';
//var server = require("../../app.js");
//var io = require('socket.io')(server);
var utils = require('../utils/utils.js');
var ContentModel = require('../models/content.model.js');


this.listen = function(server)
{
	var maMap = new Map();
	var io = require('socket.io').listen(server);
	io.on('connection', function (socket) {
		console.log("connection");
		socket.emit('connection',socket.id); //JSON.stringify(socket));//
		 /* socket.emit('news', { hello: 'world' });
		  socket.on('my other event', function (data) {
		    console.log(data);
		  });
		  */
	   	socket.on('data_comm', function (data) {
	    	console.log(data);
	    	//var msg = JSON.parse(data);

	    	maMap.set(data, socket);
	    	//enregistrer la socket dans une map, avec en clé l'id du client (qui est fourni dans le message)
	    	//console.log(maMap);

	  	});
	  	socket.on('slidEvent', function (data) {
	  		console.log("DATA RECUE SLID EVENT : ");
	    	console.log(data);
	    	var slid = data;//JSON.parse(data);
	    	if(slid.CMD== "START" || slid.CMD== "END" || slid.CMD== "BEGIN" || slid.CMD== "PREV" || slid.CMD== "NEXT" )
	    	{
	    		if(slid.CMD== "START")
	    		{
	    			
	    			ContentModel.read(slid.id, function (err, content) {
    				//content.src = "/contents/" + content.id; 
	    				var content2={
	    					"CMD" : sild.CMD,
	    					"content" : content
	    				}
    					sendToSockets(maMap, content2);
    				

	    			});
	    		}
	    		else
	    		{
	    			sendToSockets(maMap, slid);
	    		}
	    	}
	    	else //PAUSE
	    	{
	    		sendToSockets(maMap, slid);
	    	}

	  	});


	});
}

var sendToSockets = function(map, content)
{
	var log = "sending to  : "
	for(var [id, socket] of map)
	{
		log+=id+" ; ";
	}
	console.log(log);
	for(var [id, socket] of map)
	{
		socket.emit("currentSlidEvent", content);
	}

}

module.exports = this;