package fr.cpe.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="users", catalog="mysql")
public class UserModel implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -4953173433143518433L;


	@Id
	@GeneratedValue
	@Column(name="id")
	private int id;
	
	@Override
	public String toString() {
		return "UserModel [id=" + id + ", login=" + login + ", password=" + password + ", surName=" + surName
				+ ", lastName=" + lastName + ", role=" + role + "]";
	}

	@NotNull
	@Column(name="login", nullable=false, unique=true)
	private String login;
	
	@NotNull
	@Column(name="password", nullable=false, unique=true)
	private String password;
	
	@Column(name="sur_name")
	private String surName;
	
	@Column(name="last_name")
	private String lastName;
	
	@Column(name="role")
	private String role;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getSurName() {
		return surName;
	}

	public void setSurName(String surName) {
		this.surName = surName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
}