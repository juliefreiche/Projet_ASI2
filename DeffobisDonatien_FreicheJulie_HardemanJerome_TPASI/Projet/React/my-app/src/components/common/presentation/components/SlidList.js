import React, { Component } from 'react';
import Slid from '../../slid/containers/Slid';
import {connect } from 'react-redux';

class SlidList extends Component {
    //class constructor whith given properties
    constructor(props) {
        super(props);        
        this.browseSlid=this.browseSlid.bind(this);
    }
  
 browseSlid(){

     if(this.props.selected_pres == undefined){
          return "Erreur dans la presentation";
      }

     let array_render=[];
     for(var i=0; i<this.props.selected_pres.slidArray.length; i++){
         console.log(this.props.selected_pres.slidArray[i].title);
         array_render.push(
             <Slid
                key={i}
                id={this.props.selected_pres.slidArray[i].id}
                title={this.props.selected_pres.slidArray[i].title}
                txt={this.props.selected_pres.slidArray[i].txt}
                content_id={this.props.selected_pres.slidArray[i].content_id}
                contentMap={this.props.selected_map[this.props.selected_pres.slidArray[i].content_id]}
                mode="SHORT"
             />
        );
     }
     return array_render;
 }

  render() {
      const display_list= this.browseSlid();
    return (
            <div>
               {display_list}
            </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
    return {
        selected_map: state.updateModelReducer.content_map,
        selected_pres: state.updateModelReducer.presentation,
    } 
};
export default connect(mapStateToProps) (SlidList);