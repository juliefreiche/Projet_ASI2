import React, { Component } from 'react';
import {connect } from 'react-redux';
import Content from '../../common/content/containers/Content';

class BrowseContentPanel extends Component {
    //class constructor whith given properties
    constructor(props) {
        super(props);        
        this.browseList=this.browseList.bind(this);
    }
  
    browseList(){  

     if(this.props.selected_map == undefined){
          return "Erreur dans la content_map";
      }

     let array_render=[];
     for(var name in this.props.selected_map){
        array_render.push(
            <Content
                key={name}
                contenu={this.props.selected_map[name]}
            />
            );
        }
     return array_render;
    }


  render() {
      const display_list= this.browseList();
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
    } 
};
export default connect(mapStateToProps) (BrowseContentPanel);