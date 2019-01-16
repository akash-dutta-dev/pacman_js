var KEYDOWN = false;
var PAUSE = false;
var LOCK = false;

var GAMEOVER = false;

var TIME_GENERAL_TIMER = -1;
var TIME_GAME = 0;
var CHECK_PACMAN_STATE_TIMER = -1;
var PACMAN_TIME = 0;

function initGame(newgame) { 

	initBoard();
	drawBoard();
	
	initPaths();
	//drawPaths();
	
	initBubbles();
	drawBubbles();
	
	//initFruits();
	
	initPacman();
	drawPacman();
	
	//initGhosts();
	//drawGhosts();
    initGhost('blinky');
	
	//lifes();
	
	ready();
}

function win() { 
    message("YOU WINN");

	LOCK = true;
	stopPacman();
	stopGhosts();
	stopTimes();
	
	eraseGhosts();
}

function ready() { 
	LOCK = true;
	message("ready!");
	
	setTimeout("go()", "300");
}
function go() { 

	LOCK = false;
	
	startTimes();
    startPacmanTimer();
	
	clearMessage();

	movePacman();

	moveGhosts();
    
    
}

function startPacmanTimer(){
    if (CHECK_PACMAN_STATE_TIMER === -1) { 
		CHECK_PACMAN_STATE_TIMER = setInterval("checkPacmanTimer()", 20);
	}
    console.log(CHECK_PACMAN_STATE_TIMER);
}

function checkPacmanTimer(){
    //testBubblesPacman();
    //testGhostsPacman();
    CHECK_PACMAN_STATE_TIMER++;
    console.log(CHECK_PACMAN_STATE_TIMER);
}


function startTimes() { 
	if (TIME_GENERAL_TIMER === -1) { 
		TIME_GENERAL_TIMER = setInterval("times()", 1000);
	}
}

function times() { 
    TIME_GAME++;
}


function pauseTimes() { 
	if (TIME_GENERAL_TIMER != -1) { 
		clearInterval(TIME_GENERAL_TIMER);
		TIME_GENERAL_TIMER = -1;
	}
}
function resumeTimes() { 
	startTimes();
}
function stopTimes() { 
	if (TIME_GENERAL_TIMER != -1) { 
		clearInterval(TIME_GENERAL_TIMER);
		TIME_GENERAL_TIMER = -1;
	}
}

function pauseGame() { 

	if (!PAUSE) { 
		PAUSE = true;
		
		message("pause");
		
		pauseTimes();
		pausePacman();
		pauseGhosts();
        
	}
}
function resumeGame() { 
	if (PAUSE) { 
		//testStateGhosts();

		PAUSE = false;
		
		clearMessage();
		
		resumeTimes();
		resumePacman();
		resumeGhosts();
	}
}

function gameover() { 
	GAMEOVER = true;
	message("game over");
	stopTimes();
    
	eraseGhosts();
}

function message(m) { 
	$("#message").html(m);
	if (m === "game over") $("#message").addClass("red");
    if (m === "YOU WINN") $("#message").addClass("green");
}
function clearMessage() { 
	$("#message").html("");
	$("#message").removeClass("red");
    $("#message").removeClass("green");
}

function score(s, type) { 

	var scoreBefore = (SCORE / 10000) | 0;
	
}