console.log("[app.js]:: Attached and working!");

//================= CSS Animation Script ===================
const burgerLeft = document.querySelector('.burger.left');
const burgerRight = document.querySelector('.burger.right');
const inventory = document.getElementById('inventorySidebar');
const stats = document.getElementById('statsSidebar');

let attachBurgerMenus = () => {
  //Click events for burger menus
  burgerLeft.addEventListener('click', ()=> {
    inventory.classList.toggle('active');
    burgerLeft.classList.toggle('toggle');
  });
  burgerRight.addEventListener('click', ()=> {
    stats.classList.toggle('active');
    burgerRight.classList.toggle('toggle');
  });
};


//==========================================================

//======================== GLOBAL CONTROL VARIABLES ==========================

//GAME CLOCK
let gameClock = 0;

//Output Formatting
let com1BaseText = document.getElementById("com1").innerHTML;
let com2BaseText = document.getElementById("com2").textContent;
let com3BaseText = document.getElementById("com3").textContent;
let com4BaseText = document.getElementById("com4").textContent;


//Player Position Checks. 
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

//INPUT Branch Check & Global input reference for quickly deciding which inputs to enable/disable;
let validInputs = [];
let globalInputs = [
  "defendControl", 
  "attackControl", 
  "forwardControl", 
  "rightControl", 
  "backwardControl", 
  "leftControl", 
  "itemControl", 
  "inspectControl", 
  "helpControl", 
  "nextControl"
];

//COMBAT Branch Checks
let inCombat = false;
let canAttack = false;
let canDefend = false;


//Timer Control Variable (milliseconds)
let globalWaitTimer = 100000;

// *** GAME DATA *** => Will probably need to add things from the Map Tool!!!

//The length of a single sub-array from mapArray!!
let mapHeight = 5;

//The number of sub-arrays in mapArray!!
let mapWidth = 5;

//OFFSETS to compensate for different map sizes!!
let playerPositionOffsetX = Math.floor(mapWidth/2);
let playerPositionOffsetY = Math.floor(mapHeight/2);

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

//Current Choices will be passed to provideChoices()
let playerCurrentChoices = 0;

//The ORDER of 'legalChoices' and 'choiceIcons' is RESPECTIVE!!!
let playerGlobalChoices = [
  {
    name: "OverWorld Choices",
    legalChoices: ["forwardControl","rightControl","backwardControl","itemControl"],
    choiceIcons: ["fa-caret-up","fa-caret-right","fa-caret-down","fa-flask"],
    flavorIcons: ["fa-hiking","fa-binoculars","fa-fire-alt","fa-drumstick-bite"],
    choice1: "Travel.",
    choice2: "Survey the land.",
    choice3: "Make camp where you are.",
    choice4: "Use an item."
  },
  {
    name: "Travel",
    legalChoices: ["forwardControl","rightControl","backwardControl","leftControl"],
    choiceIcons: ["fas fa-caret-up","fas fa-caret-right","fas fa-caret-down","fas fa-caret-right"],
    flavorIcons: ["fa-compass","fa-compass","fa-compass","fa-compass"],
    choice1: "Travel North",
    choice2: "Travel East",
    choice3: "Travel South",
    choice4: "Travel West"
  }
];
//============================================================================

//============================== UI FUNCTIONS ================================

//There are two separate button enable/disable functions to make the code more clear as to what is enabled/disabled and when.
// A single toggle function could work as well, but would become confusing to deal with after multiple turns of game logic.
let disableButtons = (buttons) => {
  //A function for disabling buttons and adding the CSS styling to show they're disabled. Pass Arrays
  
  console.log("disableButtons(): "+buttons);

  for(i=0;i<buttons.length;i++){
    
    switch (buttons[i]){
      case "defendControl":
        console.log("[DEFEND]: disabled.");
        document.getElementById("defendControl").classList.add('disabled');
        break;
      case "forwardControl":
        console.log("[FORWARD]: disabled.");
        document.getElementById("forwardControl").classList.add('disabled');
        break;
      case "attackControl":
        console.log("[ATTACK]: disabled.");
        document.getElementById("attackControl").classList.add('disabled');
        break;
      case "leftControl":
        console.log("[LEFT]: disabled.");
        document.getElementById("leftControl").classList.add('disabled');
        break;
      case "rightControl":
        console.log("[RIGHT]: disabled.");
        document.getElementById("rightControl").classList.add('disabled');
        break;
      case "backwardControl":
        console.log("[BACKWARD]: disabled.");
        document.getElementById("backwardControl").classList.add('disabled');
        break;
      case "itemControl":
        console.log("[ITEM]: disabled.");
        document.getElementById("itemControl").classList.add('disabled');
        break;
      case "inspectControl":
        console.log("[INSPECT]: disabled.");
        document.getElementById("inspectControl").classList.add('disabled');
        break;
      case "helpControl":
        console.log("[HELP]: disabled.");
        document.getElementById("helpControl").classList.add('disabled');
        break;
      case "nextControl":
        console.log("[NEXT]: disabled.");
        document.getElementById("nextControl").classList.add('disabled');
        break;
    }
  }
}
let enableButtons = (buttons) => {
  //A function for disabling buttons and adding the CSS styling to show they're disabled. Pass Arrays
  
  console.log("disableButtons(): "+buttons);

  for(i=0;i<buttons.length;i++){
    
    switch (buttons[i]){
      case "defendControl":
        console.log("[DEFEND]: enabled!");
        document.getElementById("defendControl").classList.remove('disabled');
        break;
      case "forwardControl":
        console.log("[FORWARD]: enabled!");
        document.getElementById("forwardControl").classList.remove('disabled');
        break;
      case "attackControl":
        console.log("[ATTACK]: enabled!");
        document.getElementById("attackControl").classList.remove('disabled');
        break;
      case "leftControl":
        console.log("[LEFT]: enabled!");
        document.getElementById("leftControl").classList.remove('disabled');
        break;
      case "rightControl":
        console.log("[RIGHT]: enabled!");
        document.getElementById("rightControl").classList.remove('disabled');
        break;
      case "backwardControl":
        console.log("[BACKWARD]: enabled!");
        document.getElementById("backwardControl").classList.remove('disabled');
        break;
      case "itemControl":
        console.log("[ITEM]: enabled!");
        document.getElementById("itemControl").classList.remove('disabled');
        break;
      case "inspectControl":
        console.log("[INSPECT]: enabled!");
        document.getElementById("inspectControl").classList.remove('disabled');
        break;
      case "helpControl":
        console.log("[HELP]: enabled!");
        document.getElementById("helpControl").classList.remove('disabled');
        break;
      case "nextControl":
        console.log("[NEXT]: enabled!");
        document.getElementById("nextControl").classList.remove('disabled');
        break;
    }
  }
}
//For game start
let resetUI = () => {
  enableButtons([
    "defendControl", 
    "attackControl", 
    "forwardControl", 
    "rightControl", 
    "backwardControl", 
    "leftControl", 
    "itemControl", 
    "inspectControl", 
    "helpControl", 
    "nextControl"
  ]);
  setTheseInputsAsValid([
    "defendControl", 
    "attackControl", 
    "forwardControl", 
    "rightControl", 
    "backwardControl", 
    "leftControl", 
    "itemControl", 
    "inspectControl", 
    "helpControl", 
    "nextControl"
  ]);
}

let setTheseInputsAsValid = (buttons) => {
  //This is where you pass the inputs that you want to be acceptable. Pass Arrays
  //reset the array!!
  validInputs = [];

  for(i=0;i<buttons.length;i++){
    validInputs.push(buttons[i]);
    console.log("VALID INPUTS: "+validInputs);
  }

}

let outputToOverworld = (title, subTitle) => {
  //This is for printing major events/area names.
  console.log("[outputToOverworld() >> title, subTitle]: "+title+", "+subTitle);

  document.getElementById("ow1").textContent = title;
  document.getElementById("ow2").textContent = subTitle;
}

let outputToExpose = (areaEXP) => {
  //Outputs exposition text. Expecting an areaLibrary[#].areaEXP
  console.log("[outputToExpose(areaIndex).areaEXP]: "+areaEXP);
  console.log("[areaEXP.length]: ", areaEXP.length);

  switch (areaEXP.length) {
    case 1:
      console.log("There is 1 line of exposition.");
      console.log("[areaEXP.length]: ", areaEXP.length);
      document.getElementById("exp1").textContent = areaEXP[0];
      break;
    case 2:
      console.log("There are 2 lines of exposition.");
      console.log("[areaEXP.length]: ", areaEXP.length);
      document.getElementById("exp1").textContent = areaEXP[0];
      document.getElementById("exp2").textContent = areaEXP[1];
      break;
    case 3:
      console.log("There are 3 lines of exposition.");
      console.log("[areaEXP.length]: ", areaEXP.length);
      document.getElementById("exp1").textContent = areaEXP[0];
      document.getElementById("exp2").textContent = areaEXP[1];
      document.getElementById("exp3").textContent = areaEXP[2];
      break;
    case 4:
      console.log("There are 4 lines of exposition.");
      console.log("[areaEXP.length]: ", areaEXP.length);
      document.getElementById("exp1").textContent = areaEXP[0];
      document.getElementById("exp2").textContent = areaEXP[1];
      document.getElementById("exp3").textContent = areaEXP[2];
      document.getElementById("exp4").textContent = areaEXP[3];
      break;
  }
}

let outputToPlayerComms = (availablePlayerChoices) => {
  //Outputs the player choices.

  //Gets the number of choices -4 to account for the name, legalChoices[], choiceIcons[], and flavorIcons[].
  let howManyChoices = checkObjectSize(availablePlayerChoices)-4;
  console.log("[the length of the current choices]: "+howManyChoices);

  switch (howManyChoices) { 
    case 1:
      console.log("There is 1 choice");
      console.log(availablePlayerChoices.name);
      document.getElementById("com0").textContent = availablePlayerChoices.name;
      document.getElementById("com1").textContent = availablePlayerChoices.choice1;
      break;
    case 2:
      console.log("There are 2 choices");
      console.log(availablePlayerChoices.name);
      document.getElementById("com0").textContent = availablePlayerChoices.name;
      document.getElementById("com1").textContent = availablePlayerChoices.choice1;
      document.getElementById("com2").textContent = availablePlayerChoices.choice2;
      break;
    case 3:
      console.log("There are 3 choices");
      console.log(availablePlayerChoices.name);
      document.getElementById("com0").textContent = availablePlayerChoices.name;
      document.getElementById("com1").textContent = availablePlayerChoices.choice1;
      document.getElementById("com2").textContent = availablePlayerChoices.choice2;
      document.getElementById("com3").textContent = availablePlayerChoices.choice3;
      break;
    case 4:
      console.log("There are 4 choices");
      console.log(availablePlayerChoices.name);

      document.getElementById("com0").textContent = availablePlayerChoices.name;
      document.getElementById("com1").textContent = availablePlayerChoices.choice1;
      document.getElementById("input1").classList.add(availablePlayerChoices.choiceIcons[0]);
      document.getElementById("choice1").classList.add(availablePlayerChoices.flavorIcons[0]);

      document.getElementById("com2").textContent = availablePlayerChoices.choice2;
      document.getElementById("input2").classList.add(availablePlayerChoices.choiceIcons[1]);
      document.getElementById("choice2").classList.add(availablePlayerChoices.flavorIcons[1]);

      document.getElementById("com3").textContent = availablePlayerChoices.choice3;
      document.getElementById("input3").classList.add(availablePlayerChoices.choiceIcons[2]);
      document.getElementById("choice3").classList.add(availablePlayerChoices.flavorIcons[2]);

      document.getElementById("com4").textContent = availablePlayerChoices.choice4;
      document.getElementById("input4").classList.add(availablePlayerChoices.choiceIcons[3]);
      document.getElementById("choice4").classList.add(availablePlayerChoices.flavorIcons[3]);

      break;
  }
}


let provideChoices = (playerGlobalChoicesIndex) => {
  //0:Overworld Choices, 1:Travel Choices

  //Using the playerCurrentChoices global control variable, pick the choices you want to provide and send to output.
  console.log("[Selected Choices]: "+playerGlobalChoices[playerGlobalChoicesIndex].name);
  outputToPlayerComms(playerGlobalChoices[playerGlobalChoicesIndex]);

  //Setting whatever choices are legal as valid inputs.
  setTheseInputsAsValid(playerGlobalChoices[playerGlobalChoicesIndex].legalChoices);

  //Making sure the valid inputs are enabled.
  enableButtons(playerGlobalChoices[playerGlobalChoicesIndex].legalChoices);



  //Make a copy of the global Array to modify.
  let buttonsToDisable = globalInputs;

  //For each input in the legal choices array, find it in the global input array copy and remove it; leaving unnecessary buttons.
  for(i=0;i<playerGlobalChoices[playerGlobalChoicesIndex].legalChoices.length;i++){
    var index = buttonsToDisable.indexOf(playerGlobalChoices[playerGlobalChoicesIndex].legalChoices[i]);
    buttonsToDisable.splice(index, 1);
  }
  //console.log("Final Disable",buttonsToDisable);

  //Disable unnecessary buttons.
  disableButtons(buttonsToDisable);
  
}

let checkObjectSize = (object) => {
  //This is the correct way of checking how many choices there are in the sub-object,
  // which I NEED to do in order to correctly SWITCH in the outputToPlayerComms().
  let size = 0;
  for (key in object){
    if(object.hasOwnProperty(key)) size++;
  }
  return size;
};

//===========================================================================

//========================== MOVEMENT FUNCTIONS ==============================
let getPlayerLocation = () => {
  //Check the coordinates, find the location in the areaLibrary, then pass the correct exposition to the appropriate output function.

  //***Keep in mind what the global control variable playerCurrentChoices is doing!!

  //Converts the players Cartesian Coordinate System Variables to the 0-based index array values. Y must be inverted because of monitor draw direciton
  let playerArrayX = playerX + playerPositionOffsetX;
  let playerArrayY = (-1*playerY) + playerPositionOffsetY;

  //For checking the position of the player and if it accurately lines up with the mapArray.
  //For an odd X/Y value, "spawn" should be the center tile. For an even X/Y value, it should be offset towards 0
  //console.log("[mapArray Offset Check]:: position(0,0) == ", mapArray[playerPositionOffsetX][playerPositionOffsetY]);
  //console.log("playerX: "+playerX+" | playerArrayX: "+playerArrayX);
  //console.log("playerX: "+playerY+" | playerArrayX: "+playerArrayY);

  let currentIndex = 0;
  let testChar = "";
  let chosenIndex = 0;

  //Used a while loop here so that if the character is found sooner, can exit the loop.
  while(currentIndex < areaLibrary.length){
    testChar = areaLibrary[currentIndex].char;
    console.log("Current Test Char: "+testChar)

    switch (testChar == mapArray[playerArrayX][playerArrayY]){
      case true:
        console.log("character matched!")
        //store the correct index for the areaLibrary
        chosenIndex = currentIndex;

        //Break the loop early
        currentIndex = (areaLibrary.length + 1);
      break;
      case false:
        console.log("character didn't match")
        currentIndex++
      break;
      default:
        console.log("retrieve char WHILE error...")
    }
  }
  console.log("Chosen areaLibrary Index: "+chosenIndex);

  //Grab the name of the Area -- And grab the subTitle of the area and pass it to the output.
  outputToOverworld(areaLibrary[chosenIndex].name, areaLibrary[chosenIndex].name);
  //Grab the exposition from that same area and pass it to the output.
  outputToExpose(areaLibrary[chosenIndex].areaEXP);
  //Pass the currently acceptable global Control variable based on what the player is actually doing.
  console.log("[playerCurrentChoices]: "+playerCurrentChoices);
  provideChoices(playerCurrentChoices);
}

let movePlayer = () => {
  //Kinda obvious.

}
//===========================================================================

//============================ CORE ENGINE ==================================

let updateGameCLock = () => {
  //Control The Game Clock here. 0 to pass without moving, 1 to update +=1?
}

let grabID = (event) => {
  console.log(event);
}

let onClickLogic = () => {
  //Bulk attach the clickListeners on gameCLock = 0, then don't touch again.

  //DEFEND BUTTON
  document.getElementById("defendControl").onclick = function() {

    grabID(this.id + "clicked");
  };

  //FORWARD BUTTON
  document.getElementById("forwardControl").onclick = function() {
    
    grabID(this.id + " clicked");
  };

  //ATTACK BUTTON
  document.getElementById("attackControl").onclick = function() {
    
    grabID(this.id + " clicked");
  };

  //LEFT BUTTON
  document.getElementById("leftControl").onclick = function() {
    
    grabID(this.id + " clicked");
  };

  //RIGHT BUTTON
  document.getElementById("rightControl").onclick = function() {
    
    grabID(this.id + " clicked");
  };

  //BACKWARD BUTTON
  document.getElementById("backwardControl").onclick = function() {
    
    grabID(this.id + " clicked");
  };

  //ITEM BUTTON
  document.getElementById("itemControl").onclick = function() {
    
    grabID(this.id + " clicked");
  };

  //INSPECT BUTTON
  document.getElementById("inspectControl").onclick = function() {
    
    grabID(this.id + " clicked");
  };

  //HELP BUTTON
  document.getElementById("helpControl").onclick = function() {
    
    grabID(this.id + " clicked");
  };

  //NEXT BUTTON
  document.getElementById("nextControl").onclick = function() {
    
    grabID(this.id + " clicked");
  };
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

  
  getPlayerLocation();

  
}
//==========================================================================


//=========================== SETUP =======================================
//Initialize the onclick listeners.
onClickLogic();
//Initialize the Burger Menus
attachBurgerMenus();
//Reset the UI
resetUI();

//turn "0" => start the game.
gamePipeline();