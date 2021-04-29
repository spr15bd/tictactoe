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
		
		//this.doComputerAI= this.doComputerAI.bind(this);
		//this.takeSquare = this.takeSquare.bind(this);
        	
        	// global variables
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
			//console.log("board[0] is "+this.state.board[0]);
		} else if (this.state.inPlay) {
			//message.push(this.state.message);
			choices.push(	<div>	
						<a id="square0" onClick={() => this.playerTakeSquare(0)}>{this.state.board[0]=="0"?"":this.state.board[0]}</a>
						<a id="square1" onClick={() => this.playerTakeSquare(1)}>{this.state.board[1]=="0"?"":this.state.board[1]}</a>
						<a id="square2" onClick={() => this.playerTakeSquare(2)}>{this.state.board[2]=="0"?"":this.state.board[2]}</a>
						<a id="square3" onClick={() => this.playerTakeSquare(3)}>{this.state.board[3]=="0"?"":this.state.board[3]}</a>
						<a id="square4" onClick={() => this.playerTakeSquare(4)}>{this.state.board[4]=="0"?"":this.state.board[4]}</a>
						<a id="square5" onClick={() => this.playerTakeSquare(5)}>{this.state.board[5]=="0"?"":this.state.board[5]}</a>
						<a id="square6" onClick={() => this.playerTakeSquare(6)}>{this.state.board[6]=="0"?"":this.state.board[6]}</a>
						<a id="square7" onClick={() => this.playerTakeSquare(7)}>{this.state.board[7]=="0"?"":this.state.board[7]}</a>
						<a id="square8" onClick={() => this.playerTakeSquare(8)}>{this.state.board[8]=="0"?"":this.state.board[8]}</a>
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
		/*	$(document).ready(function(){
  				for (var x=0; x<9;x++){
    					$("#square"+x).hide();
  				}
  				$("img").attr("src","https://8bvjog-db3pap001.files.1drv.com/y4m3NWJJOBI7QHptRE2J5YOzx19zJU3rNs2j9S7wG2x9RTS7hXwL1gnXwyA0MBeW8CRyQ699a8CmGR-nnmQKmHkyG4i0V7w-l53X9AmvjNiWaTQbu7Zp4jMrnpRVIrr42fi6Zh9B2xAOtbxXOwnY_HLVLrbMCRxN5WMAdhrkwZnaHfD_7rEJPgwnqRRT9C_lDeeMc2KdjNHyQRymtGMs-UjGw?width=435&height=435&cropmode=none");
  				$("#one-player").text("One Player");
				$("#one-player-minimax").text("One Player with Minimax");
  				$("#two-player").text("Two Player");
  				$("h2").text("How do you want to play?");
  				$("h2, #one-player, #one-player-minimax, #two-player").show();
  				$("#one-player").click(function() {
    					onePlayerGame=true;
    					$("#one-player").hide();
					$("#one-player-minimax").hide();
    					$("#two-player").hide();
    					$("h2").text("Choose X or O");
    					$("#choose-o").text("O");
    					$("#choose-x").text("X");
    					$("h2").show();
    					$("#choose-x").show();
    					$("#choose-o").show();
    					$("#back").show();
  				});
				$("#one-player-minimax").click(function() {
    					onePlayerGame=true;
					miniMaxGame=true;
    					$("#one-player").hide();
					$("#one-player-minimax").hide();
    					$("#two-player").hide();
    					$("h2").text("Choose X or O");
    					$("#choose-o").text("O");
    					$("#choose-x").text("X");
    					$("h2").show();
    					$("#choose-x").show();
    					$("#choose-o").show();
    					$("#back").show();
  				});
  				$("#two-player").click(function() {
    					onePlayerGame=false;
    					$("#one-player").hide();
					$("#one-player-minimax").hide();
    					$("#two-player").hide();
    					$("#choose-x").text("X");
    					$("#choose-o").text("O");
    					$("h2").html("Player 1, choose X or O");
    					$("h2").show();
    					$("#choose-x").show();
   					$("#choose-o").show();
    					$("#back").show();
  				});
  				$("#back").click(function() {
    					$("h2").text("How do you want to play?");
    					$("#one-player").text("One player");
					$("#one-player-minimax").text("One player with Minimax");
    					$("#two-player").text("Two player");
    					$("#one-player").show();
    					$("#two-player").show();
    					$("#choose-x").hide();
    					$("#choose-o").hide();
    					$("#back").hide();
  				});
  				$("#choose-x").click(function(){
    					player1="X";
    					player2="O";
    					playGame();
  				});
  				$("#choose-o").click(function(){
    					player1="O";
    					player2="X";
    					playGame();
  				}); 
			}),
        */
	}
			
        chooseGame(num) {
		//console.log(num + " chosen");
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
    					//$("#one-player").hide();
					//$("#one-player-minimax").hide();
    					//$("#two-player").hide();
    					//$("h2").text("Choose X or O");
    					//$("#choose-o").text("O");
    					//$("#choose-x").text("X");
    					//$("h2").show();
    					//$("#choose-x").show();
    					//$("#choose-o").show();
    					//$("#back").show();
	}

	choosePlayer(str) {
		//console.log("in choosePlayer, str is "+str);
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
		//playerOne="", playerTwo="", playerOneWins=0, playerTwoWins=0;
  		//$("#player-one-score, #player-two-score").text("0");
  		//$("img").attr("src","https://8bvjog-db3pap001.files.1drv.com/y4m3NWJJOBI7QHptRE2J5YOzx19zJU3rNs2j9S7wG2x9RTS7hXwL1gnXwyA0MBeW8CRyQ699a8CmGR-nnmQKmHkyG4i0V7w-l53X9AmvjNiWaTQbu7Zp4jMrnpRVIrr42fi6Zh9B2xAOtbxXOwnY_HLVLrbMCRxN5WMAdhrkwZnaHfD_7rEJPgwnqRRT9C_lDeeMc2KdjNHyQRymtGMs-UjGw?width=435&height=435&cropmode=none");
  		//$("h2").css({"text-align":"center", "position":"absolute", "left":"70px","top":"100px","display":"none"});
  		//$("h2, #one-player, #two-player").css({"display":"none"});
  		//$("h2").text("How do you want to play?");
  		//$("h2, #one-player, #one-player-minimax, #two-player").fadeIn(1000);
  		//this.setState({board:[0,0,0,0,0,0,0,0,0]});
	}	
  
	playGame() { 
		//console.log("Chose Player "+this.state.playerOne);
		//console.log("Inplay state is "+this.state.inPlay);
  		//$("h2").hide();
  		//$("#choose-x").hide();
  		//$("#choose-o").hide();
 		//$("#back").hide();
  		//$("img").attr("src","https://8lvjog-db3pap001.files.1drv.com/y4maLqZBnVA48r6inDcZV4ALGUE-aRn2LggjvNxaNaHLtk-VU1XAvRILb4Z8BiCNIxxoMekyNkr1HRpkjeVy3A2vkUDEntuQcdSFOufHEVxNvPIqedMFNbeflXkcOkwNRph1FMbeFbCzVqlBstEWiwvdGLmG_-oWscN22bzi_00RNFhqXeGrwtpQiOUOtzxUW1kj1Z1sApUqCyBd8FtZp3VkA?width=435&height=435&cropmode=none");
  		//$("#reset").show();
  		//$("#player-one").show();
  		//$("#player-two").show();
  		//$("#player-one-score").show();
  		//$("#player-two-score").show();
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
				/*
  				for (var x=0; x<9;x++){
    					$("#square"+x).show();
  				}
  
  				$("#square0").click(function() {
    					if (board[0]==0) {
      						$("#square0").text(turn);
      						board[0]=turn;
						boardState[0]=turn;
      						changeTurns();
    					}
  				});
  				$("#square1").click(function() {
    					if (board[1]==0) {
      						$("#square1").text(turn);
      						board[1]=turn;
						boardState[1]=turn;
      						changeTurns();
    					}
  				});
  				$("#square2").click(function() {
    					if (board[2]==0) {
      						$("#square2").text(turn);
      						board[2]=turn;
						boardState[2]=turn;
      						changeTurns(); 
    					}
  				});
  				$("#square3").click(function() {
    					if (board[3]==0) {
      						$("#square3").text(turn);
						board[3]=turn;
      						boardState[3]=turn;
      						changeTurns(); 
    					}
  				});
  				$("#square4").click(function() {
    					if (board[4]==0) {
      						$("#square4").text(turn);
						board[4]=turn;
      						boardState[4]=turn;
      						changeTurns(); 
    					}
  				});
  				$("#square5").click(function() {
    					if (board[5]==0) {
      						$("#square5").text(turn);
						board[5]=turn;
      						boardState[5]=turn;
      						changeTurns(); 
    					}
  				});
  				$("#square6").click(function() {
    					if (board[6]==0) {
      						$("#square6").text(turn);
						board[6]=turn;
      						boardState[6]=turn;
      						changeTurns(); 
    					}
  				});
  				$("#square7").click(function() {
    					if (board[7]==0) {
      						$("#square7").text(turn);
						board[7]=turn;
      						boardState[7]=turn;
      						changeTurns(); 
    					}
  				});
  				$("#square8").click(function() {
    					if (board[8]==0) {
      						$("#square8").text(turn);
      						board[8]=turn;
						boardState[8]=turn;
      						changeTurns(); 
    					}
  				});
  				$("#reset").click(function() {
    					clearTimeout(timeout);
    					enableBoardButtons();
    					$("#game-over, #reset, #player-one, #player-two, #player-one-score, #player-two-score").fadeOut();
    					onePlayerGame=false;
    					playerOne="", playerTwo="", playerOneWins=0, playerTwoWins=0;
    					resetAll();
  				});
				*/
	}
			
	// check the status of the board, if no result swap players
	changeTurns() {
		//console.log("changing turn, from "+this.turn);
  		if (this.winner("X", this.state.board)||this.winner("O", this.state.board)) {
    			this.doVictory();
  		} else if (this.matchDrawn(this.state.board)) {
    			this.doDraw();
		} else if (this.turn==this.state.playerOne) {
			this.turn=this.state.playerTwo;
			//this.setState({aiInPlay:!aiInPlay});
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
			//console.log(turn+" is winner");
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
		//$("#player-one-score").text(this.state.playerOneWins);
		//$("#player-two-score").text(this.state.playerTwoWins);
		//disableBoardButtons();
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
		//disableBoardButtons();
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

	disableBoardButtons() {
		$("body").append("<div id=\"over\" style=\"position: absolute;top:45px;left:0;width: 100%;height:100%;z-index:2;opacity:0.4;filter: alpha(opacity = 50)\"></div>");
	}

	enableBoardButtons() {
		$("#over").remove();
	}

	takeSquare(squareNumber) {
		console.log("Taking square "+squareNumber);
		let newBoard = this.state.board;
		newBoard[squareNumber] = this.turn;
      		this.setState({board:newBoard});
		//this.boardState = newBoard.slice(0);
			//this.setState({boardState:newBoard.slice(0)}, function() {
				this.changeTurns();
			//});
		
		
				
		//console.log("square taken - board is now "+this.state.board+", boardState is now "+this.state.boardState);
		//$("#square"+squareNumber).text(this.turn);
		//this.enableBoardButtons();TEMPORARILY DISABLED 06/04/21
		
	}

	playerTakeSquare(squareNumber) {
		// player can take a square only of the square is currently emply and it's their turn, not the computer
		if (this.state.board[squareNumber]==0 && this.turn == this.state.playerOne) {
      			let newBoard = this.state.board;
			newBoard[squareNumber] = this.turn;
			//console.log("NewBoard is "+newBoard);
      			this.setState({board:newBoard});
			//this.boardState=newBoard.slice(0);
				//this.setState({boardState:newBoard.slice(0)}, function() {
			this.changeTurns();		
				//});
			
			
			//this.setState({board:newBoard});
			//this.setState({boardState:newBoard.slice(0)});
			//this.changeTurns();
			//this.state.boardState[0]=this.turn;
      			
    		}
	}

	doComputerAI = (miniMaxGame) => {
		this.setState({aiInPlay:true});
		//console.log("Board[3] is: "+this.state.board[3]+", this.state.playerOne is "+this.state.playerOne);
		let board = [];
		for (var i=0; i<9; i++) {
			board[i]=this.state.board[i];	
		}
		//this.disableBoardButtons();TEMPORARILY DESABLED 27TH MARCH 2021
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
			//console.log("board: "+this.state.board+", boardState: "+this.boardState+", "+this.turn+"'s turn, minimax at top level, player "+this.turn);
			this.boardState=this.state.board.slice(0);
			
			//result=-100;
			//start the minimax algorithm at the top level, level 0

			//minimaxScore = miniMax(turn, 0);
			if (this.state.firstMove) {
				//console.log(Math.floor(Math.random()*9));

				this.setState({
					firstMove:false
				}, function() {
					this.takeSquare(Math.floor(Math.random()*9));	
				});
			} else if (this.state.secondMove) {

				this.setState({
					secondMove:false
				}, function() {
					if (this.state.board[4]==0) {
						this.takeSquare(4);	
					} else {
						this.takeSquare(5);	
					}
				});
			} else {
				let square = this.miniMax(this.turn, 0, this.state.board.slice(0)).bestSquare;	

				setTimeout(function() {
				//console.log(turn +" took square "+bestSquare);
					this.takeSquare(square);

				}.bind(this), 1000);
			}
			/*	
			console.log("minimax score: "+minimaxScore);	
			var bestScore=-1;
			var bestSquare;
			for (var i=0; i < 9; i++) {
				if (board[i]!="X" && board[i] != "O") {	// if I find an empty square
					if (minimaxScore[i] > bestScore) {	
						bestScore = minimaxScore[i];
						bestSquare = i;
							
					}
				}	
					
			}
			*/
		}
	}
	miniMax(turn, depth, boardState) {
		//minimax algorithm
		//for loop over 9 sq
		//	add player2 (ai) to next available sq
		//		check for winner
		//		if no win minimax on other player
			
		var result=turn==this.state.playerOne?100:-100;
		var latestResult=turn==this.state.playerOne?100:-100;
		var bestSquare=0;
		var newTurn;
		//console.log("new minimax on player "+turn+", depth is "+depth+", boardState: "+this.state.boardState);
		//let boardState=this.boardState;
		
		for (var i=0; i < 9; i++) {
			//boardState=board.slice(0);
			//let boardState=this.state.boardState;
			
			if (boardState[i]==0) {
				//console.log("minimax stage i= "+i+", about to set sq "+i+" to "+turn+", depth "+depth+", and check for win");
				//is.state.boardState[i]=turn;
				//let newBoard = this.state.boardState;
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
					depth++;
					
					latestResult = this.miniMax(newTurn,  depth, boardState).result;
					
					//console.log("minimax stage "+i+", depth is "+depth+", returned up from "+newTurn+", turn is "+turn+", latestResult "+latestResult+", virtual board: "+boardState);

					
				}

				//let newArray = newBoard;
				boardState[i] = 0;
				
				
				//this.setState({boardState:boardState});  
				
				
				if (depth==1) console.log("minimax stage i= "+i+", depth "+depth+",latestResult is "+latestResult+", reset sq to 0");
					
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
		
		
		console.log("minimax returns bestSquare of "+bestSquare);	
		return {result, bestSquare};			
		
	}
}
ReactDOM.render (
    <Main />, 
    document.getElementById('root')
);
