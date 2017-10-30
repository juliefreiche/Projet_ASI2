import React from 'react';
export default class EditMetaPres extends React.Component{
	 constructor(props) {
	 	super(props);
	 }

	 render(){
	 	return (
	 		<div className="form-group">
	 			<label htmlFor="currentPresTitle">Title </label>
 				<input
 					type="text"
					 className="form-control"
					 id="currentPresTitle"
					 onChange={this.props.handleChangePresTitle}
					 value={this.props.title}
				/>
				<label htmlFor="currentPresDescription">Description</label>
			 	<textarea
					 rows="5"
					 type="text"
					 className="form-control"
					 id="currentPresDescription"
					 onChange={this.props.handleChangeDescription}
					 value={this.props.description}>
			 	</textarea>
			</div>
		 ); 
	}
}