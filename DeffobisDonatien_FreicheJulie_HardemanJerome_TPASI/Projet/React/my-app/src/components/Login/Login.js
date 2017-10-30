import React, { Component } from 'react';
import './Login.css';
import '../../lib/bootstrap-3.3.7-dist/css/bootstrap.min.css';
import history from '../../history'


class Login extends Component {
	
	constructor(props) {
        super(props);
		
		this.state = { username: '',password: '', show:true};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		
    }
	handleChange(key) {
	
		return function (e) {
      var state = {};
      state[key] = e.target.value;
      this.setState(state);
     }.bind(this);
  }
  
  handleSubmit(event) {
	//alert('Login submitted :  ' + this.state.username +' : '+this.state.password);
	event.preventDefault();
	
	fetch('http://localhost:1337/login', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    login: this.state.username,
    pwd: this.state.password,
  })
}).then((response) => response.json()).then((data) => {
	console.log(data);
	if(!data.validAuth){
		//alert("BAD AUTHENTICATION");
		
		this.setState({
    username: "",
    password: "",
	showResults:"Bad Authentication"
		})
		
	}
	else{
		this.setState({
	showResults:"",
	show:false
		})
		  history.push("/Main");
	}
});

  }
	
  render() {
    return (
	
      <div className="Login">
{this.state.show ?  
        <header className="Login-header">
          
          <h1 className="Login-title">Login</h1>
		  
        </header>
:null}	
{this.state.show ?  
		<h3>Login to your account </h3>
:null}	
		 <form onSubmit={this.handleSubmit}  >
		 {this.state.show ?	
		 <div className="form-group">
				<input type="text" name="username" placeholder="Username"  value={this.state.username} 
                onChange={this.handleChange('username')}/>
					 </div > :null}	
					 {this.state.show ?	
			<div className="form-group">
					<input type="password" name="password" placeholder="Password" value={this.state.password} 
                onChange={this.handleChange('password')}/>
			</div>
			:null}
			{this.state.show ?	
			<input type="submit" name="login" className="login loginmodal-submit" value="Login"/>
			:null}
			</form>	
			
		{ this.state.showResults ? <div className="alert alert-danger" >{this.state.showResults}</div> :null}
			

	</div>
	
    );
  }

}

export default Login;
