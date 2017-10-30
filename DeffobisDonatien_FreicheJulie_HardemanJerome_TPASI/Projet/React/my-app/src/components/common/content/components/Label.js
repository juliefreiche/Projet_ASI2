import React, { Component } from 'react';

class Label extends Component {
    constructor(props) {
        super(props);      
    }

  
  render() {
    if(this.props.onlyContent)
        return (<div></div>);
    else 
        return (
                <div>
                    <h3>Title: {this.props.title}</h3>
                    <h3>Id: {this.props.id}</h3>        
                </div>
 
    );
  }
}

export default Label;