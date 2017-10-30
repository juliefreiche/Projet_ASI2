'use strict';
//console.log('It Works !');
var fs = require("fs");

var http = require("http");
var CONFIG = require("./config.json"); //chemins absolus dans config.json pour pouvoir acceder au projet n'importe où
process.env.CONFIG = JSON.stringify(CONFIG);


var express = require("express");

var app = express();

// init server
var server = http.createServer(app);
server.listen(CONFIG.port, function() {
	var host = this.address().address;
	var port = this.address().port;
	console.log ( "Serveur écoute à l'adresse = \""+host+":"+port+"\"");
});

var IOController = require("./app/controllers/io.controller.js");
IOController.listen(server);
/**/
//to get content from body !
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true})); // npm install --save body-parser
app.use(bodyParser.json());

//ROUTES
var defaultRoute = require("./app/routes/default.route.js");

app.use(defaultRoute);

var contentRoute = require("./app/routes/content.router.js");

app.use(contentRoute);



// #2
/*
app.get("/", function(request, response) {
	response.send("It works !");
});

// #3
app.use(function(request, response, cb) {
	response.send("It works !");
	cb();
});
*/


var path = require("path");
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/watch", express.static(path.join(__dirname, "public/watch.html")));
app.get("/loadPres",function(request, response) {

	var dir = CONFIG.presentationDirectory;
	 // Read the directory
  	fs.readdir( dir,function (err, list) {
    // Return the error if something went wrong
    if (err)
      return console.error(err);

  	var obj={};
  	var i =0;
 	var nbFichier= list.length;
 	//console.log(nbFichier);
    //console.log(list);
    // For every file in the list
    list.forEach(function (file) {

        //  /!\  ne pas mettre le i++ ici car read file est asynchrone !!! 

    	fs.readFile((dir+"/"+file),function(err,data){
            i++; //compteur
    		if(!!err)
    			return console.error(err);


    		var pres = JSON.parse(data); // faire un try catch au cas ou 
    		var id = pres.id;
    		obj[id]=pres;
    		// console.log(pres);
    		// console.log(id);
    		// console.log(obj);
    		

    		
    		if(i==nbFichier)
    		{

    			//console.log(i);
    			response.send(obj);//.toString());
    		}


    		//return data;

    	});


    });
	

});
	
},express.static(path.join(__dirname, "loadPres")));






app.post("/savePres",function(error, request, response, next) {
console.error("   error json  ");
response.send(" error parsing json ");
return;
});

app.post("/savePres",function(request, response, next) {

   
    var id_posted = request.body.id;

    var dir = CONFIG.presentationDirectory;
    console.log(dir);
     // Read the directory
    fs.readdir( dir,function (err, list) {
        // Return the error if something went wrong
        if (err)
          return console.error(err);

        var i =0;
        var nbFichier= list.length;
        var id_unique= true;

        //console.log(nbFichier);
        //console.log(list);
        // For every file in the list
        list.forEach(function (file) {

            //  /!\  ne pas mettre le i++ ici car read file est asynchrone !!! 

            fs.readFile((dir+"/"+file),function(err,data){

                i++; //compteur

                if(!!err)
                    return console.error(err);


                var pres = JSON.parse(data);
                var id = pres.id;

                if(id_posted==id)
                    id_unique=false;
                


                
                if(i==nbFichier)
                {
                    if(id_unique)
                    {
                        var file_name = id_posted+".pres.json";
                        fs.writeFile(dir+"/"+file_name, JSON.stringify(request.body), function(err) {
                            if(err)
                            {
                                
                                return console.log(err);
                            }
                            response.send("json sauvegardé avec succès");//.toString());
                            console.log("file saved : "+file_name);
                        }); 
                        //console.log("The file was unique!");

                    }
                    else{
                        //console.log(i);
                        response.send("ID DEJA UTILISE");//.toString());
                    }
                    
                }


            //return data;

        });


    });
    

});
    
},express.static(path.join(__dirname, "savePres")));




/*


'use strict';

funtcion UserModel (user) {
	
	this.name= (user && user.name) ? user.name:null;
	var age;
	this.getAge=function{...};
	this.setAge=function{...};
}


UserModel.create=function(userModel,cb){
	todo

	
	cb();	
};







----------------------------


var UserModel = require('UserModel');
var user = new UserModel();
UserModel.create(user, function (err,data){
	...
})


*/


module.exports = server;