package fr.cpe.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import fr.cpe.model.UserLogin;
import fr.cpe.model.UserModel;

@Path("/WatcherAuth")
public interface IWatcherRestService {
	
	@POST
	@Consumes("application/json")
	@Produces("application/json")
	@Path("/")
	String printUser(UserLogin userLogin);
	
}