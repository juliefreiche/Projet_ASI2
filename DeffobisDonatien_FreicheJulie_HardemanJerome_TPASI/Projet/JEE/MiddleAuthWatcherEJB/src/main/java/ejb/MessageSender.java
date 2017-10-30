package ejb;

import java.util.logging.Logger;

import javax.annotation.Resource;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.jms.JMSContext;
import javax.jms.JMSRuntimeException;
import javax.jms.ObjectMessage;
import javax.jms.Topic;


import fr.cpe.model.UserModel;

@Stateless
@LocalBean
public class MessageSender implements MessageSenderLocal {
	@Inject
	JMSContext context;
	@Resource(mappedName = "java:/jms/watcherAuthJMS")
	Topic topic;
	
	Logger logger = Logger.getLogger(MessageSender.class.getName());
	public void sendMessage(String message) {
		logger.info(">>>entre dans la fonction sendMessage");
		try {
			context.createProducer().send(topic, message);
			logger.info(">>>> message sent : "+message);
			
		} catch (JMSRuntimeException ex) {
			ex.getStackTrace();
		}
	}

	public void sendMessage(UserModel user) {
		ObjectMessage message = context.createObjectMessage(user);
		logger.info(">>>entre dans la fonction sendMessage pour user");
		try{
			context.createProducer().send(topic, message);
			logger.info(">>>> message sent : "+message);
		} catch (JMSRuntimeException ex) {
			ex.getStackTrace();
		}
	}
}