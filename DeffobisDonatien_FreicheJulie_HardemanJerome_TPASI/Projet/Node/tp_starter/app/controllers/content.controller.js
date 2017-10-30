'use strict';
var fs = require("fs");
var utils = require('../utils/utils.js');
var ContentModel = require('../models/content.model.js');
var CONFIG = JSON.parse(process.env.CONFIG);

/*
sendContentModel = function(err, contentModel)
{ //on peut pas mettre le i++ dedans ? 
	if(!!err)
	{
		console.error()
	}
}
*/

this.list = function(req, res)
{
	
	var dir = CONFIG.contentDirectory;
	 // Read the directory
	 fs.readdir( dir,function (err, list) {
	    // Return the error if something went wrong
	    if (err)
	    	return console.error(err);

	    var obj={};
	    var i =0;
	     var nbFichier= 0;
	    for (var j in list)
	    {
	    	if(list[j].endsWith(".meta.json"))
	    		nbFichier++;

	    }
	   
	 	//console.log("nb fichier " + nbFichier);
	    // For every file in the list
	    list.forEach(function (file) {

	    	//console.log('list foreach' + i);
	    	if(file.endsWith(".meta.json"))
	    	{
	    		var fileID = file.substr(0,file.length -10);
	    		ContentModel.read(fileID, function(err, data){

		            i++; //compteur
		            if(!!err)
		            	return console.error(err);

		           // console.log('list foreach contentread' + i);
		            obj[fileID]=data;
		           // console.log(obj);

		            if(i==nbFichier)
		            {

		    			//console.log(i);
		    			res.end(JSON.stringify(obj));//.toString());
		    		}

		    	});
	    	}    	
		});
	});
}

this.create = function(req, res)
{
	// console.dir(req);


	var id = utils.generateUUID();
	
	var title = req.body.title;
	var type = req.body.type;
	var src = req.body.src;
	var fileName;
	/*if(req.body["id"])
	{
		var id = req.body["id"];
	}
	else
	{
		var id = utils.generateUUID();
	}*/
	if(!!req.file)
	{
		var file = req.file;
		var fileName  =utils.getNewFileName(id,file.originalname);
	}
	var content = {
		"fileName" : fileName,
		"title" : title,
		"type" : type,
		"src" : src,
		"id" : id
	}
	var newContent = new ContentModel(content);

//	console.log("FILE PATH : " + file.path);

	if(!!req.file)
	{
		fs.readFile(file.path, function(err, fileContent) {

	    		if (!!err) {
	    			console.error(err);
	    			return false;
	    		}

	    		newContent.setData(fileContent);

				ContentModel.create(newContent,function(err){

					if(!!err)
						return console.error(err);
			    			//console.log(i);
			    			//res.send(data);//.toString());
			    	res.send("content saved");
				});
	    		
	              return true;


	          });
	}
	else
	{

		ContentModel.create(newContent,function(err){

			if(!!err)
				return console.error(err);
	    			//console.log(i);
	    			//res.send(data);//.toString());
	    	res.send("content saved");
		});
	}


    


	
	

}

this.read = function(req, res)
{
	var id= req.contentId;
	ContentModel.read(id, function(err, data){

		if(!!err)
			return console.error(err);
		console.dir(req);

        if(!!req.query.json) //si dnas l'url il y a json=true
        {
        	res.send(data);
        }
        else
        {
			if(data.type=="img") //si stockée sur le serveur <=> type = image
			{
    			res.send(data.src);//.toString());
    		}
    		else //sinon redirection 
    		{
    			res.redirect(data.src);
    		}
    	}

    });

}



module.exports = this;