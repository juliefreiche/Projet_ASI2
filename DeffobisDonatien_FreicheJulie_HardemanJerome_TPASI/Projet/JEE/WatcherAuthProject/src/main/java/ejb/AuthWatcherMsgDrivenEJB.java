package ejb;

import java.util.Date;

import javax.ejb.ActivationConfigProperty;
import javax.ejb.EJB;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.ObjectMessage;
import javax.jms.TextMessage;

import fr.cpe.model.UserModel;

import javax.ejb.MessageDriven;

import model.DataContainer;

@MessageDriven(activationConfig = {
		@ActivationConfigProperty(propertyName = "destinationType", propertyValue = "javax.jms.Topic"),
		@ActivationConfigProperty(propertyName = "destination", propertyValue = "java:/jms/watcherAuthJMS") })

public class AuthWatcherMsgDrivenEJB implements MessageListener {
	
	@EJB
	private DataContainer dataContainer;

	@EJB
	MessageSenderQueueLocal sender;

	@Override
	public void onMessage(Message message) {
		try {
			
			if (message instanceof TextMessage) {
				
				System.out.println("Topic: I received a TextMessage at " + new Date());
				TextMessage msg = (TextMessage) message;
				System.out.println("Message is : " + msg.getText());
				
			} else if (message instanceof ObjectMessage) {
				
				System.out.println("Topic: I received an ObjectMessage at " + new Date());
				ObjectMessage msg = (ObjectMessage) message;
				
				if (msg.getObject() instanceof UserModel) {
					UserModel user = (UserModel) msg.getObject();
					System.out.println("User Details: ");
					System.out.println("login:" + user.getLogin());
					System.out.println("pwd:" + user.getPassword());
					
					UserModel userTest = dataContainer.checkUser(user);
					
					//String currentTestRole = dataContainer.checkUser(user);
					
					//if (Role.NONE == currentTestRole) {
//					if (currentTestRole == null||currentTestRole=="") {
					if(userTest==null) {
						sender.sendMessage(user);
											
					} else {
//						user.setId(userTest.getId());
//						user.setSurName(userTest.getSurName());
//						user.setLastName(userTest.getLastName());
//						user.setRole(userTest.getRole());
					
//						user.setRole(currentTestRole);
						user=userTest;
						sender.sendMessage(user);
					}
					
					
					
				}
				
			} else {
				System.out.println("Not valid message for this Queue MDB");
			}
			
		} catch (JMSException e) {
			e.printStackTrace();
		}

	}
}