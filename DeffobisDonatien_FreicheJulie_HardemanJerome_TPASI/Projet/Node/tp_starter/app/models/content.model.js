'use strict';
var fs = require("fs");
var utils = require('../utils/utils.js');
//var CONFIG = JSON.parse(process.env.CONFIG);

/*var CONFIG2 = require("../../config.json"); //chemins absolus dans config.json pour pouvoir acceder au projet n'importe où
process.env.CONFIG = JSON.stringify(CONFIG2);
var CONFIG = process.env.CONFIG ;
*/

class ContentModel {

	static isContentModelUndefined(content)
	{

		if (!content || !content.id || !content.type) 
		{

			return true;
		}
		else
		{
		// 	console.log("AAA" + content.id);
		// console.log(content.type);
			return false;
		}

	}

	constructor(contentModel) {
		this.id = (contentModel && contentModel.id) ? contentModel.id : null;
		this.type = (contentModel && contentModel.type) ? contentModel.type : null;
		this.title = (contentModel && contentModel.title) ? contentModel.title : null;
		this.src = (contentModel && contentModel.src) ? contentModel.src : null;
		this.fileName = (contentModel && contentModel.fileName) ? contentModel.fileName : null;
		var data;

		this.getData = function() {
			return data;
		}

		this.setData = function(data2) {
			data = data2;
		}
	}

	static create(content, cb) {
		console.log("ContentModel.create");

		console.log(content);
		if (ContentModel.isContentModelUndefined(content))
		{
			console.log('content undefined');

			return cb(new Error("content non conforme, propriété(s) undefined"));
		}
		//console.log("ContentModel.create content not undefined");
        // SAUVEGARDE DONNEES ----------------------------

        var fileName = content.fileName;
      
        
        if(!!fileName)
        {
            var data = content.getData();
            fs.writeFile(utils.getDataFilePath(content.fileName), data, function(err) {
            	//console.log("ContentModel.create - write data file");
            	if (err) {
            		console.error(err);
            		
            		return cb(new Error("Erreur ecriture fichier : " + fileName));
            	}

            	console.log("file saved : " + fileName);

	            // SAUVEGARDE META-DONNEES -------------------------
	            var id = content.id;
	            var type = content.type;

	            fs.writeFile(utils.getMetaFilePath(id), JSON.stringify(content), function(err) {
	            	if (err) {
	            		console.error(err)
	            		return cb(new Error("Erreur ecriture fichier : " + id + ".meta.json"));
	            	}
	            	console.log("file saved : " + id + ".meta.json");
	            	cb();
	            });
	        });

        }
        else
        {
            // SAUVEGARDE META-DONNEES -------------------------
            var id = content.id;
            var type = content.type;

            fs.writeFile(utils.getMetaFilePath(id), JSON.stringify(content), function(err) {
                if (err) {
                    console.error(err)
                    return cb(new Error("Erreur ecriture fichier : " + id + ".meta.json"));
                }
                console.log("file saved : " + id + ".meta.json");
                cb();
            });

        }

    }

    static read(id, cb) {
        //console.log('list foreach debut read' + id );
    	if (!id) {
    		console.log('id undefined');
    		return cb(new Error("id non conforme ( undefined ou nul )"));
    	}
        
    	fs.readFile(utils.getMetaFilePath(id), function(err, fileContent) {

    		if (!!err) {
    			console.error(err);
    			return cb(new Error("erreur lecture fichier " + id + ".meta.json"));
    		}
    		var metadata = JSON.parse(fileContent);

            /*
            	var fileName = metadata.fileName;
              var type = metadata.type;
              var title = metadata.title;
              var src = metadata.src;

              var myContentModel = new ContentModel(id,type,title,src,fileName);
              */
              var myContentModel = new ContentModel(metadata);

              //console.log('fin read' );
              return cb(null, myContentModel);


          });

    }

    static update(content, cb) {

    	if (ContentModel.isContentModelUndefined(content)) {
    		console.log("UPDATE -- error undefined ");
    		return cb(new Error("content non conformes, propriété(s) undefined"));
    	}
    	var id = content.id;
    	
        // TEST SI LE FICHIER EXISTE 
        fs.readFile(utils.getMetaFilePath(id), function(err, fileContent) {

        	if (!!err) {
        		console.error(err);
        		
        		return cb(new Error("erreur lecture fichier " + id + ".meta.json"));
        	}
            //LE FICHIER EXISTE DONC ON MET A JOUR LES METADATA
            fs.writeFile(utils.getMetaFilePath(id), JSON.stringify(content), function(err) {
            	if (err)
            	{
            		console.error(err);
            		return cb(new Error("Erreur mise à jour fichier : " + id + ".meta.json"));
            	}
            	//cb("l'écriture du fichier : " + id + ".meta.json succès");
            	console.log("file updated : " + id + ".meta.json");

                // ON TEST SI CONTENT.DATA POUR SAVOIR SI IL FAUT LE METTRE A JOUR
                if (typeof(content.data) != "undefined" && content.data != null && content.data != "")
                {
                	var fileName = content.fileName;
                    // MAJ DU FICHIER DATA
                    fs.writeFile(utils.getDataFilePath(fileName), data, function(err) {
                    	if (err) {

                    		cb("Erreur mise à jour fichier : " + fileName);
                    		return console.error(err);
                    	}
                    	
                        //response.send("json sauvegardé avec succès");//.toString());
                        console.log("file updated : " + fileName);
                        cb();
                    });
                }
                else
                {
                	cb();
                }

            });


        });
    }

    static delete(id, cb) {
    	if (id == undefined || id == null || id == "") {
    		console.log('id undefined');

    		return cb(new Error("id non conforme ( undefined ou nul )"));
    	}

    	fs.readFile(utils.getMetaFilePath(id), function(err, fileContent) {

    		if (!!err) {
    			console.error(err);
    			return cb(new Error("erreur lecture fichier " + id + ".meta.json"));
    		}

    		var metadata = JSON.parse(fileContent);
    		var fileName = metadata.fileName;

    		fs.unlink(utils.getMetaFilePath(id), (err) => {
    			if (err) {
    				cb("Erreur suppression fichier : " + id + ".meta.json");
    				return console.error(err);
    			}
    			console.log("successfully deleted " + id + ".meta.json ");
    			fs.unlink(utils.getDataFilePath(fileName), (err) => {
	    			if (err) {
	    				cb("Erreur suppression fichier : " + fileName);
	    				return console.error(err);
	    			}
	    			console.log("successfully deleted " + fileName);
	    			cb();
	    		});
    			
    			
    		});

    		
    	});

    }





}

module.exports = ContentModel;