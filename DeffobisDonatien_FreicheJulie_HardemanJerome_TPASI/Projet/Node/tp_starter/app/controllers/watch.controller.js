'use strict';
var fs = require("fs");

this.sendWatch=function(req,res)
{
	fs.readFile("../../watch.html", function(err,data){

		if (err)
		{
    		console.error(err);
    		return res.send(new Error("Erreur lecture fichier watch.html"));
    	}
		res.send(data);

	});
}
module.exports = this;