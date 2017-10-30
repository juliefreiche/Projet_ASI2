package dao;



import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import fr.cpe.model.UserModel;

@Stateless
public class UserDao {
	
@PersistenceContext
EntityManager em;	
	
public UserModel getUserByAuth(String login, String pwd){
	

	UserModel user=null;
	
	CriteriaBuilder builder =em.getCriteriaBuilder();
	CriteriaQuery<UserModel> crit = builder.createQuery(UserModel.class);
	Root<UserModel> root = crit.from(UserModel.class);
	//crit.select(root).where(builder.like(root.get("login"),  login)).where(builder.like(root.get("password"),  pwd));
	//CriteriaQuery<UserModel> cb = crit.select(root);
	//crit.and(builder.equal(root.get("login"),  login),builder.equal(root.get("password"),  pwd));
	crit.select(root).where(builder.and(builder.like(root.get("login"),  login),builder.like(root.get("password"),  pwd)));
	  TypedQuery<UserModel> query = em.createQuery(crit);
	  List<UserModel> userList = query.getResultList();
	  if(!userList.isEmpty()&&userList!=null) {
		  user=userList.get(0);
	  }
	  
	
	return user;
	
}

}
