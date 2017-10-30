package model;


import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.inject.Inject;

import dao.UserDao;
import fr.cpe.model.UserModel;

@Singleton
@Startup
public class DataContainer {
	
	List<UserModel> listUsers = new ArrayList<>();
	
	@Inject
	UserDao userDao;
	
	
	

	@PostConstruct
	public void init() {
		
		
		UserModel user = new UserModel();
		user.setLogin("joe");
		user.setPassword("pwdJoe");
		user.setLastName("Dao");
		user.setSurName("Joe");
		user.setRole("ADMIN");
		
		UserModel user2 = new UserModel();
		user2.setLogin("test");
		user2.setPassword("test");
		user2.setLastName("test");
		user2.setSurName("test");
		user2.setRole("MEMBER");
		
		listUsers.add(user);
		listUsers.add(user2);
		

	}



	public UserModel checkUser(UserModel user) {
		String myRole=null;
		boolean indicateur=false;
		
	/** Version Statique **/	
//		for(UserModel currentUser:this.listUsers){
//			if(currentUser.getLogin().equals(user.getLogin())&&currentUser.getPassword().equals(user.getPassword())){
//				myRole=currentUser.getRole();	
//				System.out.println("Authentification Reussi");
//				indicateur=true;
//			}
//		}
//		if(!indicateur){
//
//			System.out.println("Identifiant non reconnu");
//		}
		
		/** Version Dao **/ //Pas au point
		UserModel daoUser=userDao.getUserByAuth(user.getLogin(), user.getPassword());
		
		if(daoUser!=null){
			myRole= daoUser.getRole();
			
			System.out.println("Authentification Reussi");
		}
		else {
			System.out.println("Identifiant non reconnu");
		}
		
		return daoUser;
	
	}
	
	

}
