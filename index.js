class Main extends React.Component {
	constructor(props) {
        	super(props);
		
		this.state={
      			titleDisplayed:true,
			xOrYOptionsDisplayed: false,
			inPlay:false,
			aiInPlay:false,
			firstMove:false,
			secondMove:false,
			onePlayerGame:false,
			miniMaxGame:false,
			playerOne:"",
			playerTwo:"",
			playerOneWins:0,
			playerTwoWins:0,
			board:[0,0,0,0,0,0,0,0,0],
			boardState:[0,0,0,0,0,0,0,0,0],
			square:0,
			timeout:0,
			message:""
    		};
		
        	this.boardState=[0,0,0,0,0,0,0,0,0];
		this.turn="";
 	}
    	render() {
		let boardDisplay = [];
        	let heading = [];
        	let choices = [];
		let board = [];
        	let twoPlayer= [];
		let imageDisplayed=[];
		let back = [];
		let reset = [];
		
        	if (this.state.titleDisplayed) {
            		heading.push(<h2>How do you want to play?</h2>);
            		choices.push(	<div>	
						<a id="one-player" onClick={() => this.chooseGame(1)}>One Player</a>
				    		<a id="one-player-minimax" onClick={() => this.chooseGame(2)}>One Player with Minimax</a>
    						<a id="two-player" onClick={() => this.chooseGame(3)}>Two Player</a>
					</div>
			);
			imageDisplayed.push(
				<img src="https://8bvjog-db3pap001.files.1drv.com/y4m3NWJJOBI7QHptRE2J5YOzx19zJU3rNs2j9S7wG2x9RTS7hXwL1gnXwyA0MBeW8CRyQ699a8CmGR-nnmQKmHkyG4i0V7w-l53X9AmvjNiWaTQbu7Zp4jMrnpRVIrr42fi6Zh9B2xAOtbxXOwnY_HLVLrbMCRxN5WMAdhrkwZnaHfD_7rEJPgwnqRRT9C_lDeeMc2KdjNHyQRymtGMs-UjGw?width=100% height=100%&cropmode=none"></img>
			);
			
        	} else if (this.state.xOrYOptionsDisplayed) {
			back.push(<a id="back" onClick={() => this.back()}>Back</a>);
			console.log("X Or O Options screen");
			heading.push(<h2>Choose X or O</h2>);
            		choices.push(	<div>	
						<a id="choose-x" onClick={() => this.choosePlayer("X")}>X</a>
    						<a id="choose-o" onClick={() => this.choosePlayer("O")}>O</a>
					</div>
			);
			imageDisplayed.push(
				<img src="https://8bvjog-db3pap001.files.1drv.com/y4m3NWJJOBI7QHptRE2J5YOzx19zJU3rNs2j9S7wG2x9RTS7hXwL1gnXwyA0MBeW8CRyQ699a8CmGR-nnmQKmHkyG4i0V7w-l53X9AmvjNiWaTQbu7Zp4jMrnpRVIrr42fi6Zh9B2xAOtbxXOwnY_HLVLrbMCRxN5WMAdhrkwZnaHfD_7rEJPgwnqRRT9C_lDeeMc2KdjNHyQRymtGMs-UjGw?width=100% height=100%&cropmode=none"></img>
			);
		} else if (this.state.inPlay) {
			choices.push(	<div>	
						<a id="square0" onClick={() => this.takeSquare(0)}>{this.state.board[0]=="0"?"":this.state.board[0]}</a>
						<a id="square1" onClick={() => this.takeSquare(1)}>{this.state.board[1]=="0"?"":this.state.board[1]}</a>
						<a id="square2" onClick={() => this.takeSquare(2)}>{this.state.board[2]=="0"?"":this.state.board[2]}</a>
						<a id="square3" onClick={() => this.takeSquare(3)}>{this.state.board[3]=="0"?"":this.state.board[3]}</a>
						<a id="square4" onClick={() => this.takeSquare(4)}>{this.state.board[4]=="0"?"":this.state.board[4]}</a>
						<a id="square5" onClick={() => this.takeSquare(5)}>{this.state.board[5]=="0"?"":this.state.board[5]}</a>
						<a id="square6" onClick={() => this.takeSquare(6)}>{this.state.board[6]=="0"?"":this.state.board[6]}</a>
						<a id="square7" onClick={() => this.takeSquare(7)}>{this.state.board[7]=="0"?"":this.state.board[7]}</a>
						<a id="square8" onClick={() => this.takeSquare(8)}>{this.state.board[8]=="0"?"":this.state.board[8]}</a>
					</div>
			); 
			imageDisplayed.push(
				<img src="https://8lvjog-db3pap001.files.1drv.com/y4maLqZBnVA48r6inDcZV4ALGUE-aRn2LggjvNxaNaHLtk-VU1XAvRILb4Z8BiCNIxxoMekyNkr1HRpkjeVy3A2vkUDEntuQcdSFOufHEVxNvPIqedMFNbeflXkcOkwNRph1FMbeFbCzVqlBstEWiwvdGLmG_-oWscN22bzi_00RNFhqXeGrwtpQiOUOtzxUW1kj1Z1sApUqCyBd8FtZp3VkA?width=435&height=435&cropmode=none"></img>
			);
			reset.push(	<a id="reset" onClick={() => this.resetAll()}>Reset</a>);
		}
		
        	boardDisplay.push(
    			<div className="container-fluid">
  				<div className="board">
					{imageDisplayed}
    					<label id="player-one">Player 1</label>
    					<label id="player-two">Player 2</label>
    					<label id="player-one-score">{this.state.playerOneWins}</label>
    					<label id="player-two-score">{this.state.playerTwoWins}</label>
					{reset}
                    			{heading}
    					{choices}
    					<a id="game-over">{this.state.message}</a>
    					
					
					{back}
    					
  				</div>
			</div>			
		);
        	return(boardDisplay);
	}
			
        chooseGame(num) {
		if (num==1) {
			this.setState({onePlayerGame: true});
		} else if (num==2) {
			this.setState({onePlayerGame: true});
			this.setState({miniMaxGame: true});
		} else if (num==3) {
			this.setState({twoPlayerGame: true});
		}
		
		this.setState({titleDisplayed: false});
		this.setState({xOrYOptionsDisplayed: true});
	}

	choosePlayer(str) {
		this.setState(	{	playerOne:str,
					playerTwo:str=="X"?"O":"X",
				 	inPlay:true,
				 	xOrYOptionsDisplayed: false
				}, () => this.playGame());
    		console.log("choosePlayer(str): Player One is "+this.state.playerOne);
    	}

	back() {
		this.setState({onePlayerGame: false});
		this.setState({miniMaxGame: false});
		this.setState({titleDisplayed: true});
		this.setState({xOrYOptionsDisplayed: false});	
	}
    	
    	resetAll() {
		this.setState({	
			firstMove:false,
			secondMove:false,
			miniMaxGame:false,
			titleDisplayed:true,
			inPlay:false,
			playerOneWins:0,
			playerTwoWins:0,
			board:[0,0,0,0,0,0,0,0,0]
		});
		this.boardState=[0,0,0,0,0,0,0,0,0];
	}	
  
	playGame() { 
  		if (Math.random(0,1)<0.5) {
    			this.turn=this.state.playerOne;
			//console.log("Player One (and this.turn) is "+this.turn);
			this.state.secondMove = true;
  		} else {
    			this.turn=this.state.playerTwo;
			this.state.firstMove = true;
    			if (this.state.onePlayerGame) {
				this.doComputerAI(this.state.miniMaxGame);
    			}
		}
	}
			
	// check the current board, if no win swap players
	changeTurns() {
		if (this.winner("X", this.state.board)||this.winner("O", this.state.board)) {
    			this.doVictory();
  		} else if (this.matchDrawn(this.state.board)) {
    			this.doDraw();
		} else if (this.turn==this.state.playerOne) {
			this.turn=this.state.playerTwo;
			if (this.state.onePlayerGame) {
				this.doComputerAI(this.state.miniMaxGame);
			}
		} else if (this.turn==this.state.playerTwo) {
			this.turn=this.state.playerOne;
		}
	}

	winner(turn, board) {
		if ((board[0]===board[1]&&board[1]===board[2]&&board[0]===turn)||
		(board[3]===board[4]&&board[4]===board[5]&&board[3]===turn)||
		(board[6]===board[7]&&board[7]===board[8]&&board[6]===turn)||
		(board[0]===board[3]&&board[3]===board[6]&&board[0]===turn)||
		(board[1]===board[4]&&board[4]===board[7]&&board[1]===turn)||
		(board[2]===board[5]&&board[5]===board[8]&&board[2]===turn)||
		(board[0]===board[4]&&board[4]===board[8]&&board[0]===turn)||
		(board[6]===board[4]&&board[4]===board[2]&&board[6]===turn)) {
			return true;  
		}
	}

	matchDrawn(board) {
		if (board[0]!=0&&board[1]!=0&&board[2]!=0&&board[3]!=0&&board[4]!=0&&board[5]!=0&&board[6]!=0&&board[7]!=0&&board[8]!=0) {
			return true;
		}
	}

	doVictory() {
		this.setState({
			message:this.turn+" won"
		});
		if (this.turn==this.state.playerOne) {
			this.setState({playerOneWins:this.state.playerOneWins+1});
		} else {
			this.setState({playerTwoWins:this.state.playerTwoWins+1});
		}
		setTimeout(function() {
			this.resetBoard();
			this.state.message = "";
			this.playGame();
		}.bind(this), 5000);
	}

	doDraw() {
		this.setState({
			message:"Match drawn"
		});
		setTimeout(function() {
			this.resetBoard();
			this.state.message="";
			this.playGame();
		}.bind(this), 5000);
	}

	resetBoard() {
		this.setState({board:[0,0,0,0,0,0,0,0,0]});
		this.boardState=[0,0,0,0,0,0,0,0,0];
	}

	takeSquare(squareNumber) {
		if (this.state.board[squareNumber]==0) {
			console.log("Taking square "+squareNumber);
			let newBoard = this.state.board;
			newBoard[squareNumber] = this.turn;
			this.setState({board:newBoard});
			this.changeTurns();
		}
	}

	playerTakeSquare(squareNumber) {
		// player can take a square only of the square is currently empty and it's their turn, not the computer
		if (this.state.board[squareNumber]==0 && this.turn == this.state.playerOne) {
      			let newBoard = this.state.board;
			newBoard[squareNumber] = this.turn;
			this.setState({board:newBoard});
			this.changeTurns();		
		}
	}

	doComputerAI = (miniMaxGame) => {
		this.setState({aiInPlay:true});
		let board = [];
		for (var i=0; i<9; i++) {
			board[i]=this.state.board[i];	
		}
		if (!miniMaxGame) {
			setTimeout(function() {
				// if a win is possible on the computer's move, take the win  
				if (board[0]==this.turn&&board[1]==this.turn&&board[2]==0) {
					this.takeSquare(2);
				} else if (board[0]==0&&board[1]==this.turn&&board[2]==this.turn) {
					this.takeSquare(0);
				} else if (board[0]==this.turn&&board[1]==0&&board[2]==this.turn) {
					this.takeSquare(1);
				} else if (board[3]==this.turn&&board[4]==this.turn&&board[5]==0) {
					this.takeSquare(5);
				} else if (board[3]==0&&board[4]==this.turn&&board[5]==this.turn) {
					this.takeSquare(3);
				} else if (board[3]==this.turn&&board[4]==0&&board[5]==this.turn) {
					this.takeSquare(4);
				} else if (board[6]==this.turn&&board[7]==this.turn&&board[8]==0) {
					this.takeSquare(8);
				} else if (board[6]==0&&board[7]==this.turn&&board[8]==this.turn) {
					this.takeSquare(6);
				} else if (board[6]==this.turn&&board[7]==0&&board[8]==this.turn) {
					this.takeSquare(7);
				} else if (board[0]==this.turn&&board[3]==0&&board[6]==this.turn) {
					this.takeSquare(3);
				} else if (board[0]==0&&board[3]==this.turn&&board[6]==this.turn) {
					this.takeSquare(0);
				} else if (board[0]==this.turn&&board[3]==this.turn&&board[6]==0) {
					this.takeSquare(6);
				} else if (board[1]==this.turn&&board[4]==0&&board[7]==this.turn) {
					this.takeSquare(4);
				} else if (board[1]==0&&board[4]==this.turn&&board[7]==this.turn) {
					this.takeSquare(1);
				} else if (board[1]==this.turn&&board[4]==this.turn&&board[7]==0) {
					this.takeSquare(7);
				} else if (board[2]==this.turn&&board[5]==0&&board[8]==this.turn) {
					this.takeSquare(5);
				} else if (board[2]==0&&board[5]==this.turn&&board[8]==this.turn) {
					this.takeSquare(2);
				} else if (board[2]==this.turn&&board[5]==this.turn&&board[8]==0) {
					this.takeSquare(8);
				} else if (board[0]==this.turn&&board[4]==0&&board[8]==this.turn) {
					this.takeSquare(4);
				} else if (board[0]==0&&board[4]==this.turn&&board[8]==this.turn) {
					this.takeSquare(0);
				} else if (board[0]==this.turn&&board[4]==this.turn&&board[8]==0) {
					this.takeSquare(8);
				} else if (board[2]==this.turn&&board[4]==0&&board[6]==this.turn) {
					this.takeSquare(4);
				} else if (board[2]==0&&board[4]==this.turn&&board[6]==this.turn) {
					this.takeSquare(2);
				} else if (board[2]==this.turn&&board[4]==this.turn&&board[6]==0) {
					this.takeSquare(6);
				// if the human player is one move from a possible win attempt to stop the win
				} else if (board[0]!=this.turn&&board[0]!=0&&board[1]!=this.turn&&board[1]!=0&&board[2]==0) {
					this.takeSquare(2);
				} else if (board[0]!=this.turn&&board[0]!=0&&board[1]==0&&board[2]!=this.turn&&board[2]!=0) {
					this.takeSquare(1);
				} else if (board[0]==0&&board[1]!=this.turn&&board[1]!=0&&board[2]!=this.turn&&board[2]!=0) {
					this.takeSquare(0);
				} else if (board[3]!=this.turn&&board[3]!=0&&board[4]!=this.turn&&board[4]!=0&&board[5]==0) {
					this.takeSquare(5);
				} else if (board[3]!=this.turn&&board[3]!=0&&board[4]==0&&board[4]!=this.turn&&board[5]!=0) {
					this.takeSquare(4);
				} else if (board[3]==0&&board[4]!=this.turn&&board[4]!=0&&board[5]!=this.turn&&board[5]!=0) {
					this.takeSquare(3);
				} else if (board[6]!=this.turn&&board[6]!=0&&board[7]!=this.turn&&board[7]!=0&&board[8]==0) {
					this.takeSquare(8);
				} else if (board[6]!=this.turn&&board[6]!=0&&board[7]==0&&board[8]!=this.turn&&board[8]!=0) {
					this.takeSquare(7);
				} else if (board[6]==0&&board[7]!=this.turn&&board[7]!=0&&board[8]!=this.turn&&board[8]!=0) {
					this.takeSquare(6);
				} else if (board[0]!=this.turn&&board[0]!=0&&board[3]!=this.turn&&board[3]!=0&&board[6]==0) {
					this.takeSquare(6);
				} else if (board[0]!=this.turn&&board[0]!=0&&board[3]==0&&board[6]!=this.turn&&board[6]!=0) {
					this.takeSquare(3);
				} else if (board[0]==0&&board[3]!=this.turn&&board[3]!=0&&board[6]!=this.turn&&board[6]!=0) {
					this.takeSquare(0);
				} else if (board[1]!=this.turn&&board[1]!=0&&board[4]!=this.turn&&board[4]!=0&&board[7]==0) {
					this.takeSquare(7);
				} else if (board[1]!=this.turn&&board[1]!=0&&board[4]==0&&board[4]!=this.turn&&board[7]!=0) {
					this.takeSquare(4);
				} else if (board[1]==0&&board[4]!=this.turn&&board[4]!=0&&board[7]!=this.turn&&board[7]!=0) {
					this.takeSquare(1);
				} else if (board[2]!=this.turn&&board[2]!=0&&board[5]!=this.turn&&board[5]!=0&&board[8]==0) {
					this.takeSquare(8);
				} else if (board[2]!=this.turn&&board[2]!=0&&board[5]==0&&board[8]!=this.turn&&board[8]!=0) {
					this.takeSquare(5);
				} else if (board[2]==0&&board[5]!=this.turn&&board[5]!=0&&board[8]!=this.turn&&board[8]!=0) {
					this.takeSquare(2);
				} else if (board[0]!=this.turn&&board[0]!=0&&board[4]!=this.turn&&board[4]!=0&&board[8]==0) {
					this.takeSquare(8);
				} else if (board[0]!=this.turn&&board[0]!=0&&board[4]==0&&board[8]!=this.turn&&board[8]!=0) {
					this.takeSquare(4);
				} else if (board[0]==0&&board[4]!=0&&board[4]!=this.turn&&board[8]!=this.turn&&board[8]!=0) {
					this.takeSquare(0);
				} else if (board[2]!=this.turn&&board[2]!=0&&board[4]!=this.turn&&board[4]!=0&&board[6]==0) {
					this.takeSquare(6);
				} else if (board[2]!=this.turn&&board[2]!=0&&board[4]==0&&board[6]!=this.turn&&board[6]!=0) {
					this.takeSquare(4);
				} else if (board[2]==0&&board[4]!=0&&board[4]!=this.turn&&board[6]!=this.turn&&board[6]!=0) {
					this.takeSquare(2);
					// otherwise, try and take either a corner or the central position
				} else {
					var emptySquares=[];
					for (var x=0; x<9; x+=2) {
						if (board[x]==0) {
							emptySquares.push(x);
						}
					}
					var y=emptySquares.length;
					if (y>0) {
						var z=Math.floor(Math.random()*y);
						this.takeSquare(emptySquares[z]);
						// if no corners or central positions are available, take one of the remaining four positions randomly
					} else {
						var emptySquares=[];
						for (var x=1; x<8; x+=2) {
							if (board[x]==0) {
								emptySquares.push(x);
							}
						}
						var y=emptySquares.length;
						if (y>0) {
							var z=Math.floor(Math.random()*y);
							this.takeSquare(emptySquares[z]);
						}
					}
				}   
			}.bind(this), 1000);
		} else {
			this.boardState=this.state.board.slice(0);
			if (!this.state.board.includes("O") && !this.state.board.includes("X")) {
				setTimeout(function() {
					this.takeSquare(Math.floor(Math.random()*9));
				}.bind(this), 1000);
				
			} else {
				let square = this.miniMax(this.turn, 0, this.state.board.slice(0)).bestSquare;	

				setTimeout(function() {
					this.takeSquare(square);

				}.bind(this), 1000);
			
			}
		}
	}
	miniMax(turn, depth, boardState) {
		//minimax algorithm
		//for loop over 9 sq
		//	add the current player to next available sq
		//		check for winner
		//		if no win minimax on other player
			
		var result=turn==this.state.playerOne?100:-100;	//playerTwo is the AI opponent
		var latestResult=turn==this.state.playerOne?100:-100;
		var bestSquare=0;
		var newTurn;
		for (var i=0; i < 9; i++) {
			if (boardState[i]==0) {
				boardState[i] = turn;
				
				
				//this.setState({boardState:boardState});
				
				
				// check for win - if X win return +1, if O win return -1
				//console.log("minimax: checking for a win");
				if (this.winner(turn, boardState)) {
					//console.log("winner will be "+turn);
					//latestResult = turn==player2?1:-1;
					latestResult = turn==this.state.playerTwo?10-depth:depth-10;
					//depth++;
					//boardState[i]=0;
					//bestSquare=i;
					//result = latestResult;
					//return result;
				}  else if (this.matchDrawn(boardState)) {
					// if no win
					//console.log("full board - match drawn");
					//boardState=board.slice(0);
					latestResult = 0;
					//depth++;
					//boardState[i]=0;
					/*if (latestResult>result) {
						console.log("result bettered, best sq "+i);
						result=latestResult;
						//bestSquare=i;
					}*/
					//result = latestResult;
					//return result;
				} else {
					newTurn=turn=="X"?"O":"X";
					//depth++;
					
					latestResult = this.miniMax(newTurn,  depth+1, boardState).result;
					
					//console.log("minimax stage "+i+", depth is "+depth+", returned up from "+newTurn+", turn is "+turn+", latestResult "+latestResult+", virtual board: "+boardState);

					
				}

				//let newArray = newBoard;
				boardState[i] = 0;
				
				
				//this.setState({boardState:boardState});  
				
				
				if (depth==0) console.log("minimax stage i= "+i+", depth "+depth+",latestResult is "+latestResult+", reset sq to 0");
					
				if (turn==this.state.playerTwo && latestResult>result) {		// if new turn is the computer, turn is player & wants to minimise his result 
					//console.log(this.state.playerTwo+ " in play, result bettered, best sq "+i);
					result=latestResult;
					bestSquare=i;
				} else if (turn==this.state.playerOne && latestResult<result) {
					//console.log(this.state.playerOne+" in play, result bettered, best sq "+i);
					result=latestResult;
					bestSquare=i;
				}
			}

					
		}
				
				
		
			
					
		
				
					
		
		//console.log("Finished minimax at depth "+depth+", about to return result of "+result+", best sq is "+bestSquare);
		
		
		if (depth==0) console.log("minimax returns bestSquare of "+bestSquare);	
		return {result, bestSquare};			
		
	}
}
ReactDOM.render (
    <Main />, 
    document.getElementById('root')
);
