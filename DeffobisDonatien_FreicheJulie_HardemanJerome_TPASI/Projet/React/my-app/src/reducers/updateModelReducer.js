var Tools = require('../services/Tools.js')
const updateModelReducer= (state={presentation:{},content_map:{}},action) => { 
	console.log(action);
	switch (action.type) {
		case 'UPDATE_PRESENTATION':
			const newStatePre={presentation:action.obj,content_map:state.content_map}; 
				return newStatePre;
		case 'UPDATE_PRESENTATION_SLIDS':
			const newStatePreSlid={presentation:action.obj,content_map:state.content_map}; 
				return newStatePreSlid;
		case 'UPDATE_CONTENT_MAP':
			const newStateMap={content_map:action.obj,presentation:state.presentation}; 
				return newStateMap;
		case 'ADD_CONTENT':
			//const newState1={slid:action.obj}; 
			return ;
	default: 
		return state;
	}
}
export default updateModelReducer;