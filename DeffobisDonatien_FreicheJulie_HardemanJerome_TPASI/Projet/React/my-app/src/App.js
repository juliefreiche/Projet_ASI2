import React from 'react';
import Login from './components/Login/Login'
import Main from './components/mainPanel/Main'
import history from './history'
import { Router, Route } from 'react-router';

class App extends React.Component {
    constructor(props) {
        super(props);

        // this line is required to work on plunker because the app preview runs on a subfolder url
        history.push('/');

            }
 render() {
	 
        const basePath = '/' ;
        const { alert } = this.props;
        return (
		 <div className="MyApp">
			<Router history={history}>
				<div>
						<Route path='/Main' component={Main} />
                        <Route path="/" component={Login} />
				</div>

			</Router>
		</div>
  );
    }
}

export default App; 