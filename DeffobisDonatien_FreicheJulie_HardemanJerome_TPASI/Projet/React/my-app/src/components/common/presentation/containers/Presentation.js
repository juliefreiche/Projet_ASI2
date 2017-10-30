import React, { Component } from 'react';
import EditMetaPres from '../components/EditMetaPres';
import {connect } from 'react-redux';
import {updatePresentation} from '../../../../actions';
import SlidList from '../components/SlidList';

class Presentation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title:this.props.selected_pres.title,
            description:this.props.selected_pres.description
        }
       
        this.handleChangePresTitle=this.handleChangePresTitle.bind(this);  
        this.handleChangeDescription=this.handleChangeDescription.bind(this);       
    }

    handleChangePresTitle(e){
        this.setState({title:e.target.value});
        this.props.dispatch(updatePresentation(this.props.selected_pres));
        console.log(this.props.selected_pres.slidArray[1].title)
    }

    handleChangeDescription(e){
        this.setState({description:e.target.value});
        this.props.dispatch(updatePresentation(this.props.selected_pres));
    }
  
    render() {
        return(
            <div>
                <EditMetaPres title={this.state.title} description={this.state.description} 
                handleChangePresTitle={this.handleChangePresTitle} handleChangeDescription={this.handleChangeDescription}/>
                < SlidList/>
            </div>);
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        selected_pres: state.updateModelReducer.presentation,
    } 
};

export default connect(mapStateToProps) (Presentation);