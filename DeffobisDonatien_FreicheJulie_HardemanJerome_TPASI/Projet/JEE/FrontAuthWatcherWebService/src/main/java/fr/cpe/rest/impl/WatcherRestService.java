package fr.cpe.rest.impl;

import javax.ejb.EJB;
import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonObject;

import ejb.MessageReceiverSyncLocal;
import ejb.MessageSenderLocal;
import fr.cpe.model.UserLogin;
import fr.cpe.model.UserModel;
import fr.cpe.rest.IWatcherRestService;

public class WatcherRestService implements IWatcherRestService{
	
	@EJB
	MessageSenderLocal sender;
	
	@EJB
	MessageReceiverSyncLocal receiver;
	
	

	@Override
	public String printUser(UserLogin userLogin) {
		
		Boolean validAuth=false;
		UserModel user = new UserModel();
		user.setLogin(userLogin.getLogin());
		user.setPassword(userLogin.getPwd());
		
		String role="";
		
		System.out.println(user.toString());
		
		
		

		//sender.sendMessage(userLogin.getLogin()+" veut se connecter !");
		
		sender.sendMessage(user);
		
		UserModel userReceived=receiver.receiveMessage();
		
		
		
		if(userReceived!=null&&userReceived.getRole()!=null){
			System.out.println("user reçu : "+userReceived.toString());
			user=userReceived;
			validAuth=true;
			role=userReceived.getRole();
			
		}

		
		
		JsonObject json = Json.createObjectBuilder()
		.add("login", user.getLogin())
		.add("validAuth", validAuth)
		.add("role", role)
		.build();
		

		return json.toString();
	
	}

}