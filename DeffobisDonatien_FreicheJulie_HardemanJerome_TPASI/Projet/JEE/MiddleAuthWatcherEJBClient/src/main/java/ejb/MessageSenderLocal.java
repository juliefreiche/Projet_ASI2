package ejb;

import javax.ejb.Local;

import fr.cpe.model.UserModel;

@Local
public interface MessageSenderLocal {

	void sendMessage(String message);
	void sendMessage(UserModel user);
}
