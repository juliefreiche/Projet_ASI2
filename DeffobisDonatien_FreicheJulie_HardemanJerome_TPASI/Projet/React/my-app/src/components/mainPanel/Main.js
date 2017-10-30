import React from 'react';
import './main.css';
import '../../lib/bootstrap-3.3.7-dist/css/bootstrap.min.css';

import BrowseContentPanel from '../browseContentPanel/containers/BrowseContentPanel';
import BrowsePresentationPanel from '../browsePresentationPanel/containers/BrowsePresentationPanel';
import EditSlidPanel from '../editSlidPanel/containers/EditSlidPanel';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { updateContentMap ,updatePresentation} from '../../actions';

import * as contentMapTmp from '../../source/contentMap.json';
import * as pres from '../../source/pres.json';
import globalReducer from '../../reducers';

const store = createStore(globalReducer);

export default class Main extends React.Component{
	constructor(props) {

		super(props);
		this.state = {
			contentMap:contentMapTmp,
			presList:pres,
			displayMode: "SHORT",
		}
		store.dispatch(updateContentMap(contentMapTmp));
		store.dispatch(updatePresentation(pres));
	}

	render() {
		
		return (
		<Provider store={store} >
			<div className="container-fluid">
        		<div className="row">
        			<div className="col-md-3 col-lg-3" >
            			<BrowsePresentationPanel/>
            		</div>
            		<div className="col-md-6 col-lg-6" >
            			<EditSlidPanel/>
            		</div>
            		<div className="col-md-3 col-lg-3" >
            			<BrowseContentPanel/>
            		</div>
        		</div>
      		</div>
      	</Provider>
		);
	}
}