console.log("[app.js]:: Attached and working!");

//================= CSS Animation Script ===================
const burgerLeft = document.querySelector('.burger.left');
const burgerRight = document.querySelector('.burger.right');
const inventory = document.getElementById('inventorySidebar');
const stats = document.getElementById('statsSidebar');

//Click events for burger menus
burgerLeft.addEventListener('click', ()=> {
  output(burgerLeft.classList,"Left burger menu clicked.", burgerLeft);
  inventory.classList.toggle('active');
  burgerLeft.classList.toggle('toggle');
})
burgerRight.addEventListener('click', ()=> {
  output(burgerRight.classList,"Right burger menu clicked.", burgerRight);
  stats.classList.toggle('active');
  burgerRight.classList.toggle('toggle');
})

//==========================================================

//======================== GLOBAL CONTROL VARIABLES ==========================

//GAME CLOCK
let gameClock = 0;

//Player Position Checks
let playerX = 0;
let playerY = 0;
let inTown = false;
let inDungeon = false;

//Player Stats
let playerName = "Zorus";
let playerATK = 3;
let playerDEF = 5;
let playerHealth = 10;
let playerAgility = 7;


//Branch Checks
let canMove = true;
let canUseItem = false;
let canInspect = false;

//INPUT Branch Check
let validInputs = [];

//COMBAT Branch Checks
let inCombat = false;
let canAttack = false;
let canDefend = true;


//Timer Control Variable (milliseconds)
let globalWaitTimer = 100000;

// *** GAME DATA *** => Will probably need to add things from the Map Tool!!!

//The length of a single sub-array from mapArray!!
let mapHeight = 5;

//The number of sub-arrays in mapArray!!
let mapWidth = 5;

//Map, Map Locations, and Choices.
mapArray = [["0","0","#","#","#"],["0","0","#","#","#"],["0","0","0","X","X"],["0","0","0","X","X"],["0","0","0","X","X"]];
areaLibrary = [
  {
    char: '0', 
    name: 'GrassyField',
    areaEXP: ["The grass is knee high and very soft.", 
    "A gentle warm breeze waves through the plains, an ebb and flow, an ocean of life.", 
    "You can see for quite some distance."]
  },
  {
    char: '#', 
    name: 'TranquilForest',
    areaEXP: ["The trees are tall and thick.", 
    "The rustle of leaves and chirping of birds gives off a healthy feeling.", 
    "The air is clear but a little stagnant."]
  },
  {
    char: 'X', 
    name: 'Wasteland',
    areaEXP: ["Shale and cracked earth stretch out before you.", 
    "The air is heavy and sour smelling. Only small thorny brush dots the landscape.", 
    "You see nothing of value."]
  }
];

let playerGlobalChoices = [
  {
    name: "Overworld Choices",
    choice1: "Travel.",
    choice2: "Survey the land.",
    choice3: "Make camp where you are."
  },
  {
    name: "Travel",
    choice1: "Travel North",
    choice2: "Travel East",
    choice3: "Travel South",
    choice4: "Travel West"
  }
];
//============================================================================

//============================== UI FUNCTIONS ================================
let disableButtons = (buttons) => {
  //A function for disabling buttons and adding the CSS styling to show they're disabled. Pass Arrays
}

let setTheseInputsAsValid = (buttons) => {
  //This is where you pass the inputs that you want to be acceptable. Pass Arrays
}

let outputToOverworld = (title, subTitle) => {
  //This is for printing major events/area names.
}

let outputToExpose = (areaExp) => {
  //Outputs exposition text. Expecting an areaLibrary[#].areaEXP
}

let outputToPlayerComms = (availablePlayerChoices) => {
  //Outputs the player choices.
}

//===========================================================================

//========================== MOVEMENT FUNCTIONS ==============================
let getPlayerLocation = () => {
  //Check the coordinates, find the location in the areaLibrary, then pass the correct exposition to the appropriate output function.
}

let movePlayer = () => {

}
//===========================================================================

//============================ CORE ENGINE ==================================

let updateGameCLock = () => {
  //Control The Game Clock here. 0 to pass without moving, 1 to update +=1?
}

let attachClickListeners = () => {
  //Bulk attach the clickListeners on gameCLock = 0, then don't touch again.

  console.log("[_______Control]:: Event Listeners Attached")

  document.getElementById("defendControl").addEventListener('click', () => {
    console.log("[DEFEND]:: clicked!")
  });
  document.getElementById("forwardControl").addEventListener('click', () => {
    console.log("[FORWARD]:: clicked!")
  });
  document.getElementById("attackControl").addEventListener('click', () => {
    console.log("[ATTACK]:: clicked!")
  });
  document.getElementById("leftControl").addEventListener('click', () => {
    console.log("[LEFT]:: clicked!")
  });
  document.getElementById("rightControl").addEventListener('click', () => {
    console.log("[RIGHT]:: clicked!")
  });
  document.getElementById("backwardControl").addEventListener('click', () => {
    console.log("[BACKWARD]:: clicked!")
  });
  document.getElementById("itemControl").addEventListener('click', () => {
    console.log("[ITEM]:: clicked!")
  });
  document.getElementById("inspectControl").addEventListener('click', () => {
    console.log("[INSPECT]:: clicked!")
  });
  document.getElementById("helpControl").addEventListener('click', () => {
    console.log("[HELP]:: clicked!")
  });
  document.getElementById("nextControl").addEventListener('click', () => {
    console.log("[NEXT]:: clicked!")
  });
}

let updateButtonEnableForVariables = () => {
  //This function will run at each iteration of the game clock? It enables/disables buttons
  //via the 2 UI functions to update the player for each "turn".
}

let validateInput = (input) => {
  //Checks the input for this turn against the validInputs and then ONLY if the input is valid, calls the game loop.
}



let gamePipeline = () => {
  //The main game pipeline to keep the order of events flowing properly.

  attachClickListeners();

  console.log("[mapArray Syntax Check]:: position(0,0) == ", mapArray[2][2]);
}
//==========================================================================

gamePipeline();