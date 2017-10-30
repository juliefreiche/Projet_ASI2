import React, { Component } from 'react';
import Content from '../../content/containers/Content';
import EditMetaSlid from '../components/EditMetaSlid';
import {setSelectedSlid } from '../../../../actions'
import {updateSlid} from '../../../../actions';
import { connect } from 'react-redux';

class Slid extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            onlyContent:true,
            title:this.props.title,
            txt:this.props.txt
        }
        this.updateSelectedSlid=this.updateSelectedSlid.bind(this);
        this.updateSlid=this.updateSlid.bind(this);
        this.handleChangeTitle=this.handleChangeTitle.bind(this);  
        this.handleChangeTxt=this.handleChangeTxt.bind(this);       
    }

    updateSelectedSlid(){
        const tmpSlid={  id:this.props.id,
                         title:this.props.title,
                         txt:this.props.txt,
                         content_id:this.props.content_id};
        this.props.dispatch(setSelectedSlid(tmpSlid));
    }

   updateSlid(id, title, txt, content_id){
         console.log(this.props.selected_pres.slidArray[this.props.selected_slid.id].title);
         this.props.selected_pres.slidArray[this.props.selected_slid.id].id = id;
         this.props.selected_pres.slidArray[this.props.selected_slid.id].title = title;
         this.props.selected_pres.slidArray[this.props.selected_slid.id].txt= txt;
         this.props.selected_pres.slidArray[this.props.selected_slid.id].content_id= content_id;
         this.props.dispatch(updateSlid(this.props.selected_pres));
    }

    handleChangeTitle(e){
        this.setState({title:e.target.value});
        this.updateSlid(this.props.selected_slid.id, this.state.title, this.state.txt, this.props.selected_slid.content_id);
    }

    handleChangeTxt(e){
        this.setState({txt:e.target.value});
        this.updateSlid(this.props.selected_slid.id, this.state.title, this.state.txt, this.props.selected_slid.content_id);

    }
  
    render() {

        if(this.props.mode === "SHORT"){
            return (
                    <div className="thumbnail" onClick={this.updateSelectedSlid}>
                        <div>
                            <h5>{this.props.title}</h5>
                            <h5>{this.props.txt}</h5>          
                        </div>
                         <div> 
                            <Content contenu={this.props.contentMap}
                                    onlyContent={this.state.onlyContent}/>
                         </div>
                    </div>            
            );
        }
        if(this.props.mode === "FULL_MNG")
            return (
                <div>
                    <EditMetaSlid title={this.state.title} txt={this.state.txt} 
                    handleChangeTitle={this.handleChangeTitle} handleChangeTxt={this.handleChangeTxt}/>
                    <div> 
                        <Content contenu={this.props.contentMap}
                                 onlyContent={this.state.onlyContent}/>
                    </div>
                </div>);
        return (<div></div>);
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        selected_slid: state.selectedReducer.slid,
        selected_map: state.updateModelReducer.content_map,
        selected_pres: state.updateModelReducer.presentation,
 } 
};

export default connect(mapStateToProps) (Slid);