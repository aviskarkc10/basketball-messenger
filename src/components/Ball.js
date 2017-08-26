import React, { Component } from 'react';

import BasketBall from '../assets/ball.png';

class Ball extends Component {

	render() {
		
		return(
			<div className="ball" style={{ left: this.props.ballX, top: this.props.ballY, zIndex: this.props.zIndex }}>
				<img src={BasketBall} style={{ width: this.props.ballSize, height: this.props.ballSize }} alt="BasketBall" />
			</div>
		);
	}
}

export default Ball;