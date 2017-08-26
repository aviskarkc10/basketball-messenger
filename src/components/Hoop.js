import React, { Component } from 'react';

class Hoop extends Component {
	render(){

		return(
			<div className="hoop" style={{ left: this.props.hoopX, top: this.props.hoopY }}>
			</div>
		)
	}
}

export default Hoop;