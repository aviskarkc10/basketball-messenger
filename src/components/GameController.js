import React, { Component } from 'react';

import Ball from "./Ball";
import Board from "./Board";
import Hoop from './Hoop';

class GameController extends Component {
	constructor(){
		super();
	    this.state={
	      ballSize:80,
	      initialX: 165,
	      initialY: 500,
	      ballX: 165,
	      ballY: 500,
	      velocity: 9.5,
	      game: true,
	      angle: 0,
	      moveUp: false,
	      moveDown: false,
	      zIndex: 3,
	      hoopX: 165,
	      hoopY: 155,
	      hoopWidth: 80,
	      flag: false,
	      score: 0,
	      didScore: false,
	      checkCollision: false,
	      collided: false,
	      decreaseSize: false,
	      didCollide: false,
	      mouseDownX: 0,
	      mouseDownY: 0,
	    }
  	}

  	gameLoop = () => {

  		if(this.state.game){

  			document.onmousedown = e => {
  				this.mouseDown(e);
  			}

  			document.onmouseup = e => {
  				this.setAngle(e);
  			}

  			if(this.state.moveUp || this.state.moveDown){
  				this.moveBall();
  				this.checkBallDir();
  			}

  			if(!this.state.moveUp && this.state.moveDown && !this.state.checkCollision){
  				this.checkCollision();
  
  				if(!this.state.flag){
  					let temp = Math.PI - this.state.angle;
  					
  					this.setState({
  						angle: temp,
  						flag:true
  					})
  				}

  				if(this.state.didScore){
  					this.setState({
  						score: this.state.score+1,
  						didScore: false
  					})
  				}
  				else if((this.state.ballY>300)){
  					this.setState({
  						score: 0
  					})
  				}
  			}

  			if((this.state.ballX + (this.state.ballSize/2)) < 0 || this.state.ballX > 400 || this.state.ballY > 600){
  				this.setState({
  					ballSize:80,
  					velocity: 9.5,
 					didScore: false,
	      			checkCollision: false,
	      			flag: false,
	      			zIndex: 3,
	      			angle: 0,
					moveUp: false,
					moveDown: false,
					decreaseSize: false,
					didCollide: false,
					collided: false
  				})

  				if(this.state.score === 0){
  					this.setState({
  						ballX: this.state.initialX,
  						ballY: this.state.initialY
  					});
  				}

  				else{
  					let temp = Math.floor(Math.random() * 320);
  					
  					this.setState({
  						ballX: temp,
  						ballY: this.state.initialY
  					})
  				}
  			}

	  		if(this.state.didCollide && this.state.velocity<0){
	  			let temp = Math.PI/2;
  				this.setState({
  					angle: temp,
  					didCollide: false
  				})
  			}

  			window.requestAnimationFrame(this.gameLoop)
  		}
  	}

  	mouseDown = (e) => {
  		this.setState({
  			mouseDownX: e.clientX,
  			mouseDownY: e.clientY
  		})
  	}

  	setAngle = (e) => {
  		let mouseX = e.clientX;
  		let mouseY = e.clientY;
  		let angle = Math.atan2((this.state.mouseDownY - mouseY), -(this.state.mouseDownX - mouseX));
  	
		this.setState({
			angle: angle,
			moveUp: true,
			decreaseSize: true,
		});
  	}

  	moveBall = () => {
  		let ballX, ballY, ballSize, velocity;

	  	ballX = this.state.ballX + (this.state.velocity * Math.cos(this.state.angle));
	  	ballY = this.state.ballY - (this.state.velocity * Math.sin(this.state.angle));
	  	velocity = this.state.velocity - 0.1;

	  	if(this.state.decreaseSize){
			ballSize = this.state.ballSize - 0.2;
		}
		else{
			ballSize = this.state.ballSize;
		}
		
		
	  	this.setState({
	  			ballX: ballX,
	  			ballY: ballY,
	  			ballSize: ballSize,
	  			velocity: velocity
	  		});
  	}

  	checkBallDir = () => {

  		if(this.state.velocity<0){
  			this.setState({
  				moveUp: false,
  				moveDown: true,
  				zIndex: 1,
  			})
  		}
  	}

  	checkCollision=() => {
  		let angle;

  		if(this.state.moveDown && this.state.ballX + (this.state.ballSize / 2) > this.state.hoopX
  			&& this.state.ballX + (this.state.ballSize / 2) < this.state.hoopX + this.state.hoopWidth
  			&& (this.state.ballY + this.state.ballSize) > (this.state.hoopY+5)){
  			this.setState({
  				didScore: true,
  				checkCollision: true, 
  			})
  		}

  		else if((this.state.ballX < this.state.hoopX 
  			&& this.state.ballX + this.state.ballSize < this.state.hoopX + this.state.hoopWidth
  			&& this.state.ballX + this.state.ballSize > this.state.hoopX
  			&& this.state.ballY + this.state.ballSize > 155) 
  			|| (this.state.ballX > this.state.hoopX
  				&& this.state.ballX < this.state.hoopX + this.state.hoopWidth
  			&& this.state.ballX + this.state.ballSize > this.state.hoopX + this.state.hoopWidth 
  			&& this.state.ballY + this.state.ballSize > 155)){

  			if(!this.state.didCollided 
  				&& ((this.state.ballX + (this.state.ballSize / 2) > this.state.hoopX
  				&& this.state.ballX + this.state.ballSize < this.state.hoopX + this.state.hoopWidth)
  				|| (this.state.ballX + (this.state.ballSize / 2) > this.state.hoopX + this.state.hoopWidth))){
  				angle = Math.PI/2 + this.state.angle;
  			}

  			else if(!this.state.didCollide){
  				angle = Math.PI/4 - this.state.angle;
  			}
  			
  			if(!this.state.didCollide && angle){
	  			this.setState({
	  				velocity: 2,
	  				decreaseSize: false,
	  				angle: angle, 
	  				didCollide: true,
	  				moveUp: true,
	  				moveDown: false,
	  				flag: false,
	  				collided: true
	  			});
	  		}
	  		else if(!this.state.didCollide){
	  			this.setState({
	  				velocity: 2,
	  				decreaseSize: false, 
	  				didCollide: true,
	  				moveUp: true,
	  				moveDown: false,
	  				flag: false,
	  				collided: true
	  			});
	  		}
  		}

  		else if(this.state.ballY > 300 && this.state.moveDown){
			this.setState({
				didScore: false, 
			})
  		}

  	} 

  	componentWillMount(){
  		this.gameLoop();
  	}

	render() {
		let score = `Score: ${this.state.score}`;

		return(
			<div className="game-controller">
				<Ball zIndex={this.state.zIndex} ballSize={this.state.ballSize} ballX={this.state.ballX} ballY={this.state.ballY}/>
				<Board />
				<Hoop hoopX={this.state.hoopX} hoopY={this.state.hoopY} />
				<div className="score">
					{score}
				</div>
			</div>
		);
	}
}

export default GameController;