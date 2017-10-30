import React, { Component } from 'react';
import Presentation from '../../common/presentation/containers/Presentation';
import CommandButtons from './CommandButtons';

class BrowsePresentationPanel extends Component {
    constructor(props) {
        super(props);
        }

	render() {
	    return (
	            <div className="thumbnail">
	            	<CommandButtons/>
	                <Presentation/>
	            </div>            
	    );
    }
}

export default BrowsePresentationPanel;