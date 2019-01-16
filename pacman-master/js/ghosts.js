var GHOST_BLINKY_CANVAS_CONTEXT = null;
var GHOST_BLINKY_POSITION_X = 276;
var GHOST_BLINKY_POSITION_Y = 204;
var GHOST_BLINKY_DIRECTION = 1;
var GHOST_BLINKY_COLOR = "#ed1b24";
var GHOST_BLINKY_MOVING = false;
var GHOST_BLINKY_SWITCH = "HORIZONTAL";

var GHOST_PINKY_CANVAS_CONTEXT = null;
var GHOST_PINKY_POSITION_X = 276;
var GHOST_PINKY_POSITION_Y = 258;
var GHOST_PINKY_DIRECTION = 2;
var GHOST_PINKY_COLOR = "#feaec9";
var GHOST_PINKY_MOVING = false;
var GHOST_PINKY_SWITCH = "HORIZONTAL";

var GHOST_INKY_CANVAS_CONTEXT = null;
var GHOST_INKY_POSITION_X = 238;
var GHOST_INKY_POSITION_Y = 258;
var GHOST_INKY_DIRECTION = 3;
var GHOST_INKY_COLOR = "#4adecb";
var GHOST_INKY_MOVING = false;
var GHOST_INKY_SWITCH = "HORIZONTAL";

var GHOST_CLYDE_CANVAS_CONTEXT = null;
var GHOST_CLYDE_POSITION_X = 314;
var GHOST_CLYDE_POSITION_Y = 258;
var GHOST_CLYDE_DIRECTION = 4;
var GHOST_CLYDE_COLOR = "#f99c00";
var GHOST_CLYDE_MOVING = false;
var GHOST_CLYDE_SWITCH = "HORIZONTAL";

var GHOST_BLINKY_POSITION_TIMER = 1;
var GHOST_PINKY_POSITION_TIMER = 3;
var GHOST_INKY_POSITION_TIMER = 7;
var GHOST_CLYDE_POSITION_TIMER = 9;

var GHOST_POSITION_STEP = 2;
var GHOST_MOVING_SPEED = 15;

function initGhosts() { 
	initGhost('blinky');
	initGhost('pinky');
	initGhost('inky');
	initGhost('clyde');
}
function initGhost(ghost) { 
	var canvas = document.getElementById('canvas-ghost-' + ghost);
	canvas.setAttribute('width', '550');
	canvas.setAttribute('height', '550');
	if (canvas.getContext) { 
		eval('GHOST_' + ghost.toUpperCase() + '_CANVAS_CONTEXT = canvas.getContext("2d")');
	}
}

function getGhostCanevasContext(ghost) { 
	return eval('GHOST_' + ghost.toUpperCase() + '_CANVAS_CONTEXT');
}

function drawGhosts() { 
	drawGhost("blinky");
	drawGhost('pinky');
	drawGhost('inky');
	drawGhost("clyde");
}
function drawGhost(ghost) { 

	var ctx = getGhostCanevasContext(ghost);
	
    eval('ctx.fillStyle = GHOST_' + ghost.toUpperCase() + '_COLOR');
	
	eval('drawHelperGhost(ctx, GHOST_' + ghost.toUpperCase() + '_POSITION_X, GHOST_' + ghost.toUpperCase() + '_POSITION_Y)');
	
	ctx.closePath();
	
	
}

function moveGhosts() { 
	moveGhost("blinky");
	moveGhost('pinky');
	moveGhost('inky');
	moveGhost("clyde");
}
function moveGhost(ghost) {

	if (eval('GHOST_' + ghost.toUpperCase() + '_MOVING === false')) { 
		eval('GHOST_' + ghost.toUpperCase() + '_MOVING = true;');

		var speed = -1;
        speed =  GHOST_MOVING_SPEED;
		
		eval('GHOST_' + ghost.toUpperCase() + '_MOVING_TIMER = setInterval("moveGhost(\'' + ghost + '\')", ' + speed + ');');
	} else { 
	
		changeDirection(ghost);
		
		if (canMoveGhost(ghost)) { 
			eraseGhost(ghost);
            
			//normal movind			
			if ( eval('GHOST_' + ghost.toUpperCase() + '_DIRECTION === 1') ) { 
				eval('GHOST_' + ghost.toUpperCase() + '_POSITION_X += GHOST_POSITION_STEP;');
			} else if ( eval('GHOST_' + ghost.toUpperCase() + '_DIRECTION === 2') ) { 
				eval('GHOST_' + ghost.toUpperCase() + '_POSITION_Y += GHOST_POSITION_STEP;');
			} else if ( eval('GHOST_' + ghost.toUpperCase() + '_DIRECTION === 3') ) { 
				eval('GHOST_' + ghost.toUpperCase() + '_POSITION_X -= GHOST_POSITION_STEP;');
			} else if ( eval('GHOST_' + ghost.toUpperCase() + '_DIRECTION === 4') ) { 
				eval('GHOST_' + ghost.toUpperCase() + '_POSITION_Y -= GHOST_POSITION_STEP;');
			}
			
            //tunnel moving
			if ( eval('GHOST_' + ghost.toUpperCase() + '_POSITION_X === 2') && eval('GHOST_' + ghost.toUpperCase() + '_POSITION_Y === 258') ) { 
				eval('GHOST_' + ghost.toUpperCase() + '_POSITION_X = 548;');
				eval('GHOST_' + ghost.toUpperCase() + '_POSITION_Y = 258;');
			} else if ( eval('GHOST_' + ghost.toUpperCase() + '_POSITION_X === 548') && eval('GHOST_' + ghost.toUpperCase() + '_POSITION_Y === 258') ) { 
				eval('GHOST_' + ghost.toUpperCase() + '_POSITION_X = 2;');
				eval('GHOST_' + ghost.toUpperCase() + '_POSITION_Y = 258;');
			}
			
			drawGhost(ghost);
			
			
		} else { 
			eval('GHOST_' + ghost.toUpperCase() + '_DIRECTION = oneDirection();');
		}
	}
}

function changeDirectionn(ghost) { 
	eval('var direction = GHOST_' + ghost.toUpperCase() + '_DIRECTION');
	eval('var ghostX = GHOST_' + ghost.toUpperCase() + '_POSITION_X');
	eval('var ghostY = GHOST_' + ghost.toUpperCase() + '_POSITION_Y');
	
	var tryDirection = oneDirectionn(ghost);
	
	 
    if (ghostX != 276 && ghostY != 258) { 
        var pacmanX = PACMAN_POSITION_X;
        var pacmanY = PACMAN_POSITION_Y;
        
        if (ghost === "blinky") { 

            var nothing = ( ( TIME_GAME * 23 ) % 8 ) + 1;
            if (nothing < 5 ) { 
                tryDirection = nothing;
                if ( !(canMoveGhost(ghost, tryDirection) && (direction != tryDirection -2 && direction != tryDirection + 2)) ) {
                    if(tryDirection + 1 > 4) tryDirection = 1;
                    else tryDirection++;
                }
            }else{
                var tryDirection = ( ( nothing * 23 ) % 4 ) + 1;
            }

        } else if (ghost === "pinky") { 

            var nothing = ( ( TIME_GAME * 67 ) % 4 ) + 1;
            if (nothing < 3) { 

                tryDirection = nothing;
                if ( !(canMoveGhost(ghost, tryDirection) && (direction != tryDirection -2 && direction != tryDirection + 2)) ) { 
                    if(tryDirection - 1 < 1) tryDirection = 4;
                    else tryDirection--;
                }
                tryDirection = reverseDirection(tryDirection);
            }

        } else if (ghost === "inky") { 
            var good = ( ( PACMAN_TIME * 37 ) % 4 ) + 1;
            if (good < 4) { 
                tryDirection = good;
                if ( !(canMoveGhost(ghost, tryDirection) && (direction != tryDirection -2 && direction != tryDirection + 2)) ) { 
                    if(tryDirection + 1 > 4) tryDirection = 1;
                    else tryDirection++;
                }
            }
        }
        else if (ghost === "clyde") { 
            var good = ( ( PACMAN_TIME * 97 ) % 4 ) + 1;
            if (good < 2) { 
                tryDirection = good;
                if ( !(canMoveGhost(ghost, tryDirection) && (direction != tryDirection -2 && direction != tryDirection + 2)) ) { 
                    if(tryDirection - 1 < 1) tryDirection = 4;
                    else tryDirection--;
                }
            }
        }
    }
	
	if (canMoveGhost(ghost, tryDirection) && (direction != tryDirection -2 && direction != tryDirection + 2)) { 
		eval('GHOST_' + ghost.toUpperCase() + '_DIRECTION = tryDirection');
	}
}

function changeDirection(ghost) { 
	eval('var direction = GHOST_' + ghost.toUpperCase() + '_DIRECTION');
	eval('var ghostX = GHOST_' + ghost.toUpperCase() + '_POSITION_X');
	eval('var ghostY = GHOST_' + ghost.toUpperCase() + '_POSITION_Y');
	
	var tryDirection = oneDirection();
	
	 
    if (ghostX != 276 && ghostY != 258) { 
        var pacmanX = PACMAN_POSITION_X;
        var pacmanY = PACMAN_POSITION_Y;
        var axe = oneAxe();
        if (ghost === "blinky") { 

            var nothing = whatsYourProblem();
            if (nothing < 6) { 
                tryDirection = getRightDirection(axe, ghostX, ghostY, pacmanX, pacmanY);
                if ( !(canMoveGhost(ghost, tryDirection) && (direction != tryDirection -2 && direction != tryDirection + 2)) ) { 
                    axe ++;
                    if (axe > 2) axe = 1; 
                    tryDirection = getRightDirection(axe, ghostX, ghostY, pacmanX, pacmanY);
                }
            }

        } else if (ghost === "pinky") { 

            var nothing = whatsYourProblem();
            if (nothing < 3) { 

                tryDirection = getRightDirection(axe, ghostX, ghostY, pacmanX, pacmanY);
                if ( !(canMoveGhost(ghost, tryDirection) && (direction != tryDirection -2 && direction != tryDirection + 2)) ) { 
                    axe ++;
                    if (axe > 2) axe = 1; 
                    tryDirection = getRightDirection(axe, ghostX, ghostY, pacmanX, pacmanY);
                }
                tryDirection = reverseDirection(tryDirection);
            }

        } else if (ghost === "inky") { 
            var good = anyGoodIdea();
            if (good < 3) { 
                tryDirection = getRightDirection(axe, ghostX, ghostY, pacmanX, pacmanY);
                if ( !(canMoveGhost(ghost, tryDirection) && (direction != tryDirection -2 && direction != tryDirection + 2)) ) { 
                    axe ++;
                    if (axe > 2) axe = 1; 
                    tryDirection = getRightDirection(axe, ghostX, ghostY, pacmanX, pacmanY);
                }
            }
        }
    }
	
	if (canMoveGhost(ghost, tryDirection) && (direction != tryDirection -2 && direction != tryDirection + 2)) { 
		eval('GHOST_' + ghost.toUpperCase() + '_DIRECTION = tryDirection');
	}
}

function getRightDirectionForHome(axe, ghostX, ghostY) { 
	var homeX = 276;
	var homeY = 204;
	
	if (ghostY === 204 && ghostX === 276) { 	
		return 2;
	} else if (ghostX === 276 && ghostY === 258) { 
		return oneDirectionX();
	} else { 
		if (axe === 1) { 
			if (ghostX > homeX) { 
			 return 3;
			} else { 
				return 1;
			}
		} else { 
			if (ghostY > homeY) { 
			 return 4;
			} else { 
				return 2;
			}
		}
	}
}
function getRightDirection(axe, ghostX, ghostY, pacmanX, pacmanY) { 
	if (axe === 1) { 
		if (ghostX > pacmanX) { 
		 return 3;
		} else { 
			return 1;
		}
	} else { 
		if (ghostY > pacmanY) { 
		 return 4;
		} else { 
			return 2;
		}
	}
}
function reverseDirection(direction) { 
	if (direction > 2) return direction - 2;
	else return direction + 2;
}

function eraseGhost(ghost) { 

	var ctx = getGhostCanevasContext(ghost);
	
	eval('ctx.clearRect(GHOST_' + ghost.toUpperCase() + '_POSITION_X - 17, GHOST_' + ghost.toUpperCase() + '_POSITION_Y - 17, 34, 34)');
}
function eraseGhosts() { 

	eraseGhost('blinky');
	eraseGhost('pinky');
	eraseGhost('inky');
	eraseGhost('clyde');
}

function canMoveGhost(ghost, direction) { 
	if (!direction) { 
		eval('var direction = GHOST_' + ghost.toUpperCase() + '_DIRECTION');
	}
	eval('var positionX = GHOST_' + ghost.toUpperCase() + '_POSITION_X');
	eval('var positionY = GHOST_' + ghost.toUpperCase() + '_POSITION_Y');
	
	if (positionX === 276 && positionY === 204 && direction === 2 ) return false;

	if ( direction === 1 ) { 
		positionX += GHOST_POSITION_STEP;
	} else if ( direction === 2 ) { 
		positionY += GHOST_POSITION_STEP;
	} else if ( direction === 3 ) { 
		positionX -= GHOST_POSITION_STEP;
	} else if ( direction === 4 ) { 
		positionY -= GHOST_POSITION_STEP;
	}
	
	for (var i = 0, imax = PATHS.length; i < imax; i ++) { 
	
		var p = PATHS[i];
	
		var startX = p.split("-")[0].split(",")[0];
		var startY = p.split("-")[0].split(",")[1];
		var endX = p.split("-")[1].split(",")[0];
		var endY = p.split("-")[1].split(",")[1];

		if (positionX >= startX && positionX <= endX && positionY >= startY && positionY <= endY) { 
			return true;
		}
	}
	
	return false;
}

function oneDirectionn(ghost){
    if (ghost === "blinky") { 

            return ( ( TIME_GAME * 3 ) % 4 ) + 1;

        } else if (ghost === "pinky") { 

            return ( ( TIME_GAME * 7 ) % 4 ) + 1;

        } else if (ghost === "inky") { 
            
            return ( ( TIME_GAME * 11 ) % 4 ) + 1;
        }
        else if (ghost === "clyde") { 
            
            return ( ( TIME_GAME * 23 ) % 4 ) + 1;
        }
}

function oneDirection() { 
	return Math.floor( Math.random() * ( 4 - 1 + 1 ) + 1 );
}
function oneDirectionX() { 
	var direction = oneDirection();
	if (direction === 4 || direction === 2) direction -= 1;
	return direction;
}
function oneDirectionY() { 
	var direction = oneDirection();
	if (direction === 3 || direction === 1) direction -= 1;
	return direction;
}

function stopGhost(ghost) { 

	if ( eval('GHOST_' + ghost.toUpperCase() + '_MOVING_TIMER != -1') ) { 
		eval('clearInterval(GHOST_' + ghost.toUpperCase() + '_MOVING_TIMER)');
		eval('GHOST_' + ghost.toUpperCase() + '_MOVING_TIMER = -1');
		eval('GHOST_' + ghost.toUpperCase() + '_MOVING = false');
	}
}
function stopGhosts() { 
	stopGhost('blinky');
	stopGhost('pinky');
	stopGhost('inky');
	stopGhost('clyde');
}

function pauseGhost(ghost) { 
	
	if ( eval('GHOST_' + ghost.toUpperCase() + '_MOVING_TIMER != -1') ) { 
		eval('clearInterval(GHOST_' + ghost.toUpperCase() + '_MOVING_TIMER)');
		eval('GHOST_' + ghost.toUpperCase() + '_MOVING_TIMER = -1');
		eval('GHOST_' + ghost.toUpperCase() + '_MOVING = false');
	}
}
function pauseGhosts() { 
	pauseGhost('blinky');
	pauseGhost('pinky');
	pauseGhost('inky');
	pauseGhost('clyde');
}

function resumeGhost(ghost) { 
	moveGhost(ghost);
}
function resumeGhosts() { 
	resumeGhost('blinky');
	resumeGhost('pinky');
	resumeGhost('inky');
	resumeGhost('clyde');
}

function drawHelperGhost(ctx, x, y) { 
	
	
    ctx.beginPath();

    ctx.moveTo((x - 15), (y + 16));
    ctx.lineTo((x - 15), (y + 16) - 28);
    ctx.lineTo((x - 15) + 28, (y + 16) - 28);
    ctx.lineTo((x - 15) + 28, (y + 16));

    ctx.fill();


}