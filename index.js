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
			board:[0,0,0,0,0,0,0,0,0],
			boardState:[0,0,0,0,0,0,0,0,0],
			square:0,
			timeout:0
    		};
		
		this.doComputerAI= this.doComputerAI.bind(this);
		this.takeSquare = this.takeSquare.bind(this);
        	
        	// global variables
		
		this.turn="";
		/*
        	let firstMove = false;
		let secondMove = false;
		let onePlayerGame=false;
		let miniMaxGame=false;
		let playerOne="", playerTwo="", playerOneWins=0, playerTwoWins=0;
		//var board=[0,0,0,0,0,0,0,0,0];
		//var boardState=[0,0,0,0,0,0,0,0,0];
		var square;
		var timeout;
		*/
 	}
    	render() {
		
		
		
        	let boardDisplay = [];
        	let heading = [];
        	let choices = [];
		let board = [];
        	let twoPlayer= [];
		let imageDisplayed=[];
		let back = [];
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
			console.log("board[0] is "+this.state.board[0]);
		} else if (this.state.inPlay) {
			choices.push(	<div>	
						<a id="square0" onClick={() => this.playerTakeSquare(0)}>{this.state.board[0]==0?"":this.state.board[0]}</a>
						<a id="square1" onClick={() => this.playerTakeSquare(1)}>{this.state.board[1]==0?"":this.state.board[1]}</a>
						<a id="square2" onClick={() => this.playerTakeSquare(2)}>{this.state.board[2]==0?"":this.state.board[2]}</a>
						<a id="square3" onClick={() => this.playerTakeSquare(3)}>{this.state.board[3]==0?"":this.state.board[3]}</a>
						<a id="square4" onClick={() => this.playerTakeSquare(4)}>{this.state.board[4]==0?"":this.state.board[4]}</a>
						<a id="square5" onClick={() => this.playerTakeSquare(5)}>{this.state.board[5]==0?"":this.state.board[5]}</a>
						<a id="square6" onClick={() => this.playerTakeSquare(6)}>{this.state.board[6]==0?"":this.state.board[6]}</a>
						<a id="square7" onClick={() => this.playerTakeSquare(7)}>{this.state.board[7]==0?"":this.state.board[7]}</a>
						<a id="square8" onClick={() => this.playerTakeSquare(8)}>{this.state.board[8]==0?"":this.state.board[8]}</a>
					</div>
			); 
			imageDisplayed.push(
				<img src="https://8lvjog-db3pap001.files.1drv.com/y4maLqZBnVA48r6inDcZV4ALGUE-aRn2LggjvNxaNaHLtk-VU1XAvRILb4Z8BiCNIxxoMekyNkr1HRpkjeVy3A2vkUDEntuQcdSFOufHEVxNvPIqedMFNbeflXkcOkwNRph1FMbeFbCzVqlBstEWiwvdGLmG_-oWscN22bzi_00RNFhqXeGrwtpQiOUOtzxUW1kj1Z1sApUqCyBd8FtZp3VkA?width=435&height=435&cropmode=none"></img>
			);
		}
		
        	boardDisplay.push(
    			<div className="container-fluid">
  				<div className="board">
					{imageDisplayed}
    					<label id="player-one">Player 1</label>
    					<label id="player-two">Player 2</label>
    					<label id="player-one-score">0</label>
    					<label id="player-two-score">0</label>
    					<a id="reset">Reset</a>
                    			{heading}
    					{choices}
    					<a id="game-over"></a>
    					
					
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
		console.log(num + " chosen");
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
		console.log("in choosePlayer ");
		this.setState(	{	playerOne:str,
					playerTwo:str=="X"?"O":"X",
				 	inPlay:true,
				 	xOrYOptionsDisplayed: false
				});
    		console.log(this.state.playerOne);	
		//this.takeSquare(2);
    		this.playGame();
	}

	back() {
		this.setState({onePlayerGame: false});
		this.setState({miniMaxGame: false});
		this.setState({titleDisplayed: true});
		this.setState({xOrYOptionsDisplayed: false});	
	}
    	
    	resetAll() {
				firstMove = false;
				secondMove = false;
				miniMaxGame=false;
  				//playerOne="", playerTwo="", playerOneWins=0, playerTwoWins=0;
  				$("#player-one-score, #player-two-score").text("0");
  				//$("img").attr("src","https://8bvjog-db3pap001.files.1drv.com/y4m3NWJJOBI7QHptRE2J5YOzx19zJU3rNs2j9S7wG2x9RTS7hXwL1gnXwyA0MBeW8CRyQ699a8CmGR-nnmQKmHkyG4i0V7w-l53X9AmvjNiWaTQbu7Zp4jMrnpRVIrr42fi6Zh9B2xAOtbxXOwnY_HLVLrbMCRxN5WMAdhrkwZnaHfD_7rEJPgwnqRRT9C_lDeeMc2KdjNHyQRymtGMs-UjGw?width=435&height=435&cropmode=none");
  				$("h2").css({"text-align":"center", "position":"absolute", "left":"70px","top":"100px","display":"none"});
  				$("h2, #one-player, #two-player").css({"display":"none"});
  				$("h2").text("How do you want to play?");
  				$("h2, #one-player, #one-player-minimax, #two-player").fadeIn(1000);
  				for (var x=0; x<9;x++){
    					$("#square"+x).hide();
  				}
  				this.setState({board:[0,0,0,0,0,0,0,0,0]});
  				for (var i=0; i<9; i++) {
    					$("#square"+i).text(" ");
  				}
			}
  
	playGame() { 
		console.log("Chose Player "+this.state.playerOne);
		console.log("Inplay state is "+this.state.inPlay);
  		//$("h2").hide();
  		//$("#choose-x").hide();
  		//$("#choose-o").hide();
 		//$("#back").hide();
  		//$("img").attr("src","https://8lvjog-db3pap001.files.1drv.com/y4maLqZBnVA48r6inDcZV4ALGUE-aRn2LggjvNxaNaHLtk-VU1XAvRILb4Z8BiCNIxxoMekyNkr1HRpkjeVy3A2vkUDEntuQcdSFOufHEVxNvPIqedMFNbeflXkcOkwNRph1FMbeFbCzVqlBstEWiwvdGLmG_-oWscN22bzi_00RNFhqXeGrwtpQiOUOtzxUW1kj1Z1sApUqCyBd8FtZp3VkA?width=435&height=435&cropmode=none");
  		//$("#reset").show();
  		$("#player-one").show();
  		$("#player-two").show();
  		$("#player-one-score").show();
  		$("#player-two-score").show();
  		if (Math.random(0,1)<0.5) {
    			this.turn=this.state.playerOne;
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
		console.log("changing turn, from "+this.turn);
  		if (winner("X", board)||winner("O", board)) {
    			doVictory();
  		} else if (matchDrawn(board)) {
    			doDraw();
		} else if (this.turn==player1) {
			this.turn=player2;
			//this.setState({aiInPlay:!aiInPlay});
			if (onePlayerGame) {
				doComputerAI(miniMaxGame);
			}
		} else if (this.turn==player2) {
			this.turn=player1;
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
		$("#game-over").text(turn+" wins");
		$("#game-over").show();
		if (turn==player1) {
			playerOneWins++;
		} else {
			playerTwoWins++;
		}
		$("#player-one-score").text(playerOneWins);
		$("#player-two-score").text(playerTwoWins);
		disableBoardButtons();
		timeout = setTimeout(function() {
			resetBoard();
			enableBoardButtons();
			$("#game-over").fadeOut();
			playGame();
		}, 5000);
	}

	doDraw() {
		$("#game-over").text("Match drawn");
		$("#game-over").show();
		disableBoardButtons();
		timeout = setTimeout(function() {
			resetBoard();
			$("#game-over").fadeOut();
			enableBoardButtons();
			playGame();
		}, 5000);
	}

	resetBoard() {
		this.setState({board:[0,0,0,0,0,0,0,0,0]});
		this.setState({boardState:this.state.board.slice(0)});
		for (var i=0; i<9; i++) {
			$("#square"+i).text("");
		}
	}

	disableBoardButtons() {
		$("body").append("<div id=\"over\" style=\"position: absolute;top:45px;left:0;width: 100%;height:100%;z-index:2;opacity:0.4;filter: alpha(opacity = 50)\"></div>");
	}

	enableBoardButtons() {
		$("#over").remove();
	}

	takeSquare = (squareNumber) => {
		console.log("Taking square.");
		this.state.board[squareNumber]=this.turn;
		//boardState[squareNumber]=turn;
		this.setState({boardState:this.state.board.slice(0)});
		console.log("square taken - board is now "+this.state.board+", boardState is now "+this.state.boardState);
		$("#square"+squareNumber).text(this.turn);
		enableBoardButtons();
		changeTurns();
	}

	playerTakeSquare(squareNumber) {
		if (this.state.board[squareNumber]==0) {
      			//this.
      			this.state.board[squareNumber]=this.turn;
			this.state.boardState[0]=this.turn;
      			this.changeTurns();
    		}
	}

	doComputerAI = (miniMaxGame) => {
		this.setState({aiInPlay:true});
		console.log("Board[3] is: "+this.state.board[3]);
		let board = [];
		for (var i=0; i<9; i++) {
			board[i]=this.state.board[i];	
		}
		//this.disableBoardButtons();TEMPORARILY DESABLED 27TH MARCH 2021
		if (!miniMaxGame) {
			setTimeout(function() {
				// if a win is possible on the computer's move, take the win  
				if (board[0]==this.turn&&board[1]==this.turn&&board[2]==0) {
					takeSquare(2);
				} else if (board[0]==0&&board[1]==this.turn&&board[2]==this.turn) {
					takeSquare(0);
				} else if (board[0]==this.turn&&board[1]==0&&board[2]==this.turn) {
					takeSquare(1);
				} else if (board[3]==this.turn&&board[4]==this.turn&&board[5]==0) {
					takeSquare(5);
				} else if (board[3]==0&&board[4]==this.turn&&board[5]==this.turn) {
					takeSquare(3);
				} else if (board[3]==this.turn&&board[4]==0&&board[5]==this.turn) {
					takeSquare(4);
				} else if (board[6]==this.turn&&board[7]==this.turn&&board[8]==0) {
					takeSquare(8);
				} else if (board[6]==0&&board[7]==this.turn&&board[8]==this.turn) {
					takeSquare(6);
				} else if (board[6]==this.turn&&board[7]==0&&board[8]==this.turn) {
					takeSquare(7);
				} else if (board[0]==this.turn&&board[3]==0&&board[6]==this.turn) {
					takeSquare(3);
				} else if (board[0]==0&&board[3]==this.turn&&board[6]==this.turn) {
					takeSquare(0);
				} else if (board[0]==this.turn&&board[3]==this.turn&&board[6]==0) {
					takeSquare(6);
				} else if (board[1]==this.turn&&board[4]==0&&board[7]==this.turn) {
					takeSquare(4);
				} else if (board[1]==0&&board[4]==this.turn&&board[7]==this.turn) {
					takeSquare(1);
				} else if (board[1]==this.turn&&board[4]==this.turn&&board[7]==0) {
					takeSquare(7);
				} else if (board[2]==this.turn&&board[5]==0&&board[8]==this.turn) {
					takeSquare(5);
				} else if (board[2]==0&&board[5]==this.turn&&board[8]==this.turn) {
					takeSquare(2);
				} else if (board[2]==this.turn&&board[5]==this.turn&&board[8]==0) {
					takeSquare(8);
				} else if (board[0]==this.turn&&board[4]==0&&board[8]==this.turn) {
					takeSquare(4);
				} else if (board[0]==0&&board[4]==this.turn&&board[8]==this.turn) {
					takeSquare(0);
				} else if (board[0]==this.turn&&board[4]==this.turn&&board[8]==0) {
					takeSquare(8);
				} else if (board[2]==this.turn&&board[4]==0&&board[6]==this.turn) {
					takeSquare(4);
				} else if (board[2]==0&&board[4]==this.turn&&board[6]==this.turn) {
					takeSquare(2);
				} else if (board[2]==this.turn&&board[4]==this.turn&&board[6]==0) {
					takeSquare(6);
				// if the human player is one move from a possible win attempt to stop the win
				} else if (board[0]!=this.turn&&board[0]!=0&&board[1]!=this.turn&&board[1]!=0&&board[2]==0) {
					takeSquare(2);
				} else if (board[0]!=this.turn&&board[0]!=0&&board[1]==0&&board[2]!=this.turn&&board[2]!=0) {
					takeSquare(1);
				} else if (board[0]==0&&board[1]!=this.turn&&board[1]!=0&&board[2]!=this.turn&&board[2]!=0) {
					takeSquare(0);
				} else if (board[3]!=this.turn&&board[3]!=0&&board[4]!=this.turn&&board[4]!=0&&board[5]==0) {
					takeSquare(5);
				} else if (board[3]!=this.turn&&board[3]!=0&&board[4]==0&&board[4]!=this.turn&&board[5]!=0) {
					takeSquare(4);
				} else if (board[3]==0&&board[4]!=this.turn&&board[4]!=0&&board[5]!=this.turn&&board[5]!=0) {
					takeSquare(3);
				} else if (board[6]!=this.turn&&board[6]!=0&&board[7]!=this.turn&&board[7]!=0&&board[8]==0) {
					takeSquare(8);
				} else if (board[6]!=this.turn&&board[6]!=0&&board[7]==0&&board[8]!=this.turn&&board[8]!=0) {
					takeSquare(7);
				} else if (board[6]==0&&board[7]!=this.turn&&board[7]!=0&&board[8]!=this.turn&&board[8]!=0) {
					takeSquare(6);
				} else if (board[0]!=this.turn&&board[0]!=0&&board[3]!=this.turn&&board[3]!=0&&board[6]==0) {
					takeSquare(6);
				} else if (board[0]!=this.turn&&board[0]!=0&&board[3]==0&&board[6]!=this.turn&&board[6]!=0) {
					takeSquare(3);
				} else if (board[0]==0&&board[3]!=this.turn&&board[3]!=0&&board[6]!=this.turn&&board[6]!=0) {
					takeSquare(0);
				} else if (board[1]!=this.turn&&board[1]!=0&&board[4]!=this.turn&&board[4]!=0&&board[7]==0) {
					takeSquare(7);
				} else if (board[1]!=this.turn&&board[1]!=0&&board[4]==0&&board[4]!=this.turn&&board[7]!=0) {
					takeSquare(4);
				} else if (board[1]==0&&board[4]!=this.turn&&board[4]!=0&&board[7]!=this.turn&&board[7]!=0) {
					takeSquare(1);
				} else if (board[2]!=this.turn&&board[2]!=0&&board[5]!=this.turn&&board[5]!=0&&board[8]==0) {
					takeSquare(8);
				} else if (board[2]!=this.turn&&board[2]!=0&&board[5]==0&&board[8]!=this.turn&&board[8]!=0) {
					takeSquare(5);
				} else if (board[2]==0&&board[5]!=this.turn&&board[5]!=0&&board[8]!=this.turn&&board[8]!=0) {
					takeSquare(2);
				} else if (board[0]!=this.turn&&board[0]!=0&&board[4]!=this.turn&&board[4]!=0&&board[8]==0) {
					takeSquare(8);
				} else if (board[0]!=this.turn&&board[0]!=0&&board[4]==0&&board[8]!=this.turn&&board[8]!=0) {
					takeSquare(4);
				} else if (board[0]==0&&board[4]!=0&&board[4]!=this.turn&&board[8]!=this.turn&&board[8]!=0) {
					takeSquare(0);
				} else if (board[2]!=this.turn&&board[2]!=0&&board[4]!=this.turn&&board[4]!=0&&board[6]==0) {
					takeSquare(6);
				} else if (board[2]!=this.turn&&board[2]!=0&&board[4]==0&&board[6]!=this.turn&&board[6]!=0) {
					takeSquare(4);
				} else if (board[2]==0&&board[4]!=0&&board[4]!=this.turn&&board[6]!=this.turn&&board[6]!=0) {
					takeSquare(2);
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
						console.log("This in doComputerAI() refers to "+this);
						this.Main.takeSquare(emptySquares[z]);
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
			}, 1000);
		} else {
			console.log("board: "+this.state.board+", boardState: "+this.state.boardState+", "+this.turn+"'s turn, minimax at top level, player "+this.turn);
			this.setState({boardState:this.state.board.slice(0)});
			//result=-100;
			//start the minimax algorithm at the top level, level 0
					
			//minimaxScore = miniMax(turn, 0);
			if (firstMove) {
				//console.log(Math.floor(Math.random()*9));
				takeSquare(Math.floor(Math.random()*9));
				firstMove = false;
			} else if (secondMove) {
				if (this.state.board[4]==0) {
					takeSquare(4);	
				} else {
					takeSquare(5);	
				}
				secondMove = false;
			} else {
				square = miniMax(this.turn, 0).bestSquare;	
						
				setTimeout(function() {
				//console.log(turn +" took square "+bestSquare);
					takeSquare(square);
							
				}, 1000);
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
	miniMax(turn, depth) {
		//minimax algorithm
		//for loop over 9 sq
		//	add player2 (ai) to next available sq
		//		check for winner
		//		if no win minimax on other player
				
		var result=this.turn==player1?100:-100;
		var latestResult=this.turn==player1?100:-100;
		var bestSquare=0;
		var newTurn;
		console.log("new minimax on player "+turn+", depth is "+depth+", boardState: "+this.state.boardState);
				
		for (var i=0; i < 9; i++) {
			//boardState=board.slice(0);
			if (this.state.boardState[i]==0) {
				console.log("minimax stage i= "+i+", about to set sq "+i+" to "+turn+", depth "+depth+", and check for win");
				this.state.boardState[i]=turn;
				// check for win - if X win return +1, if O win return -1
				if (winner(turn, this.state.boardState)) {
					console.log("winner will be "+turn);
					//latestResult = turn==player2?1:-1;
					latestResult = turn==player2?1:-1;
					//depth++;
					//boardState[i]=0;
					//bestSquare=i;
					//result = latestResult;
					//return result;
				}  else if (matchDrawn(this.state.boardState)) {
					// if no win
					console.log("full board - match drawn");
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
					console.log("winner unknown, changing turn in minimax");
					//result=-1;
					newTurn=turn=="X"?"O":"X";
					depth++;
					//var newResult;
					//iterate over all remaining spaces on the board
					//bestSquare = i;
							
					latestResult = miniMax(newTurn,  depth).result;
							
					console.log("minimax stage "+i+", depth is "+depth+", returned up from "+newTurn+", turn is "+turn+", latestResult "+latestResult);
							
					//if (newResult==null) continue;
					//else if (newResult >=result) result=newResult;
					/*if (latestResult>=result) {
						result=latestResult;
						bestSquare=i;
					}*/
					//console.log("returning minimax at level "+level+", result was "+result);
					//return latestResult;
				}
						
				let newArray = this.state.boardState;
				newArray[i] = 0;
				this.setState({boardState:newArray});
						
				console.log("minimax stage i= "+i+", depth "+depth+", reset sq to 0");
			}
			if (this.turn==player2 && latestResult>result) {		// if new turn is the computer, turn is player & wants to minimise his result 
				console.log(player2+ " in play, result bettered, best sq "+i);
				result=latestResult;
				bestSquare=i;
			} else if (this.turn==player1 && latestResult<result) {
				console.log(player1+" in play, result bettered, best sq "+i);
				result=latestResult;
				bestSquare=i;
			}
					
			//console.log("outside recursion");
					
					
		}
		console.log("Finished minimax at depth "+depth+", about to return result of "+result+", best sq is "+bestSquare);
		//boardState=board.slice(0);
				
		return {result, bestSquare};
	}
}
ReactDOM.render (
    <Main />, 
    document.getElementById('root')
);
