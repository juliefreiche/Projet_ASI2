import React, { Component } from 'react';
import Label from '../components/Label';
import Visual from '../components/Visual';

class Content extends Component {
    constructor(props) {
        super(props);        
    }
  
  render() {

    let visual;
    console.log(this.props.onlyContent);
    let metadata=(<Label 
                id = {this.props.contenu.id}
                title = {this.props.contenu.title}
                onlyContent= {this.props.onlyContent}
    />);


    visual=(<Visual
            src = {this.props.contenu.src}
            type = {this.props.contenu.type}
    />);


    return (
            <div className="thumbnail">
                {visual} {metadata}
            </div>            
    );
    }
}

export default Content;