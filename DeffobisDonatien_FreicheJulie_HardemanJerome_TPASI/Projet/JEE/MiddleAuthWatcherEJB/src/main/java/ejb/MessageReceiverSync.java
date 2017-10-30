package ejb;


import java.util.logging.Logger;

import javax.annotation.Resource;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.jms.JMSConsumer;
import javax.jms.JMSContext;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.ObjectMessage;
import javax.jms.Queue;

import fr.cpe.model.UserModel;

@Stateless
@LocalBean
public class MessageReceiverSync implements MessageReceiverSyncLocal {
	
	// TODO get jms context
	@Inject
	JMSContext context;
	
	// TODO associate queue from "java:/jms/queue/watcherqueue"
	@Resource(mappedName = "java:/jms/queue/watcherqueue")
	Queue queue;
	
	Logger logger = Logger.getLogger(MessageReceiverSync.class.getName());
	
	public UserModel receiveMessage() {
		// TODO create a consumer
		logger.info("entre dans la fonction receiveMessage()");
		UserModel message =null;
		JMSConsumer consumer = context.createConsumer(queue);	
		  
		// TODO Wait 1s incoming message (UserModel)
		Message mess = consumer.receive(1000); // time out after a second
		if(mess==null){
			logger.info("Pas de message reçu !");
		}

		else if(mess instanceof ObjectMessage){
			logger.info("message de type objectMessage : "+mess.toString());
			
			try {
				message=(UserModel) ((ObjectMessage) mess).getObject();
			} catch (JMSException e) {
				logger.info("message n'est pas de type userModel");
			}
			
		}
		
		
		return message;
	}
}