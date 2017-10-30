import React, { Component } from 'react';
import {connect} from 'react-redux';
import {updatePresentation} from '../../../actions';

class CommandButtons extends Component {
    //class constructor whith given properties
    constructor(props) {
        super(props); 

        this.handleClickAdd=this.handleClickAdd.bind(this);  
        this.handleClickRemove=this.handleClickRemove.bind(this); 
        this.handleClickSave=this.handleClickSave.bind(this);       
    }

	handleClickAdd(e){
       // this.props.dispatch(updateSlid(id,"","",""));
       //
	}

	handleClickRemove(e){
       for(var i=0; i<this.props.selected_pres.slidArray.length; i++)
       {
        	if(this.props.selected_pres.slidArray[i].id == this.props.selected_slid.id)
            {
        		console.log(this.props.selected_pres.slidArray[i]);
                this.props.selected_pres.slidArray.splice(i,1);
            }
    	}
    	this.props.dispatch(updatePresentation(this.props.selected_pres))
	}

	handleClickSave(e){
	}

render() {
    
    return(
        <div>
            <button onClick={this.handleClickAdd}>Add</button>
            <button onClick={this.handleClickRemove}>Remove</button>
            <button onClick={this.handleClickSave}>Save</button>    
        </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        selected_pres: state.updateModelReducer.presentation,
        selected_slid: state.selectedReducer.slid,
    } 
};

export default connect(mapStateToProps) (CommandButtons) ;