import React, { Component } from 'react';
import {connect} from 'react-redux';
import Slid from '../../common/slid/containers/Slid';

class EditSlidPanel extends Component {
    //class constructor whith given properties
    constructor(props) {
        super(props);  
        this.state = {
        /*    id:1,
            title:"ARE",
            txt:"Bla Bla bla",
            content_id:1
        */}   
    }

render() {
    if(this.props.selected_slid.content_id == undefined){
          return <div></div>;
      }
    return(
        <div>
            <Slid
            txt={this.props.selected_slid.txt}
            title={this.props.selected_slid.title}
            contentMap={this.props.selected_map[this.props.selected_slid.content_id]}
            mode="FULL_MNG"
            />
        </div>);
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        selected_slid: state.selectedReducer.slid,
        selected_map: state.updateModelReducer.content_map,
        selected_pres: state.updateModelReducer.presentation,
 } 
};

export default connect(mapStateToProps)(EditSlidPanel);