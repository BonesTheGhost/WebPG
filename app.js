console.log("[app.js]: Attached and working!")

//================= CSS Panel Animation Scripts ===================

const burgerLeft = document.querySelector('.burger.left');
const burgerRight = document.querySelector('.burger.right');

const inventory = document.getElementById('inventorySidebar');
const invClose = document.getElementById('inventoryClose');

const stats = document.getElementById('statsSidebar');
const statsClose = document.getElementById('statsClose');

const settingsButton = document.getElementById('settingsButton');
const settingsPanel = document.getElementById('settingsPanel');
const settingsClose = document.getElementById('settingsClose');

let attachBurgerMenus = () => {
  //Click events for burger menus
  burgerLeft.addEventListener('click', ()=> {
    inventory.classList.toggle('active');
    burgerLeft.classList.toggle('toggle');
    invClose.classList.toggle('active');
  });
  burgerRight.addEventListener('click', ()=> {
    stats.classList.toggle('active');
    burgerRight.classList.toggle('toggle');
    statsClose.classList.toggle('active');
  });
};

let attachSettingsPanel = () => {
  settingsButton.addEventListener('click', ()=> {
    settingsPanel.classList.toggle('active');
    settingsClose.classList.toggle('active');
  })
}

//Click on the area outside of inventory to close the sidebar.
invClose.onclick =()=> {
  invClose.classList.toggle('active');
  inventory.classList.toggle('active');
  burgerLeft.classList.toggle('toggle');
};

//Click on the area outside of stats to close the sidebar.
statsClose.onclick =()=> {
  statsClose.classList.toggle('active');
  stats.classList.toggle('active');
  burgerRight.classList.toggle('toggle');
};

//Click on the area outside of settings panel to close the sidebar.
settingsClose.onclick =()=> {
  settingsPanel.classList.toggle('active');
  settingsClose.classList.toggle('active');
};
//==========================================================





//**********************************************************
//================== TARGET AREAS FOR UI ===================

//CONSOLE LINES:
let EXP1 = document.getElementById("exp1");
let EXP2 = document.getElementById("exp2");
let EXP3 = document.getElementById("exp3");
let EXP4 = document.getElementById("exp4");
let EXP5 = document.getElementById("exp5");
let EXP6 = document.getElementById("exp6");
let EXP7 = document.getElementById("exp7");
let EXP8 = document.getElementById("exp8");
let EXP9 = document.getElementById("exp9");
let EXP10 = document.getElementById("exp10");
let EXP11 = document.getElementById("exp11");
let EXP12 = document.getElementById("exp12");

//ABOUT LINES:
let ABOUT0 = document.getElementById('about0');
let ABOUT1 = document.getElementById('about1');
let ABOUT2 = document.getElementById('about2');
let ABOUT3 = document.getElementById('about3');
let ABOUT4 = document.getElementById('about4');

//CHOICES LINES:
let COM0 = document.getElementById('com0');
let COM1 = document.getElementById('com1');
let COM2 = document.getElementById('com2');
let COM3 = document.getElementById('com3');
let COM4 = document.getElementById('com4');
//Actual input icons
let INPUT1 = document.getElementById('input1');
let INPUT2 = document.getElementById('input2');
let INPUT3 = document.getElementById('input3');
let INPUT4 = document.getElementById('input4');
//Choice flavors
let CHOICE1 = document.getElementById('choice1');
let CHOICE2 = document.getElementById('choice2');
let CHOICE3 = document.getElementById('choice3');
let CHOICE4 = document.getElementById('choice4');

//==========================================================






//**********************************************************
//================== VARIABLES & CONTROLS ==================
//Global Variables, engine control variables, etc.

//GAME CLOCK
let gameClock = 0;
let previousClockState = -1;

//Player Cartesian Coordinates in Map.
let playerX = 0;
let playerY = 0;

//The length of a single sub-array from mapArray!!
let mapHeight = 5;

//The number of sub-arrays in mapArray!!
let mapWidth = 5;

//OFFSETS to compensate for different map sizes!!
let playerPositionOffsetX = Math.floor(mapWidth/2);
let playerPositionOffsetY = Math.floor(mapHeight/2);



//For Controlling various functions, like inspect based on location vs. item. vs. mob.
let playerCurrentTileChar = "";
let playerCurrentTileKey = ""
let inTown = false;
let inDungeon = false;
let playerCurrentActivity = "Standing";

//Player Stats
player = {
  playerName: "Zorus",
  playerClass: "Mage",
  playerHealth: 15,
  playerATK: 0,
  playerDEF: 5,
  playerAgility: 5,
  playerDexterity: 2,
  playerBalance: 2,
  playerStrength: 2,
  playerLevel: 1,
  playerExperience: 0,
  playerDefaultValues: [15,0,5,5,2,2,2,1,0]
};

//WEATHER & ENVIRONMENT - Survey The land?
let currentVisibility = 5;
let currentWeather = "Clear";
let currentTemp = 70;
let currentWind = 0;

//mistressOfTurns() Branch Checks
let gameModeCheck = "overworld";
let canMove = true;
let canUseItem = true;
let canInspect = false;

//INPUT Branch Check & Global input reference for quickly deciding which inputs to enable/disable;
let validInputs = [];
let globalInputs = [
  "defendButton", 
  "attackButton", 
  "westButton", 
  "itemButton", 
  "inspectButton", 
  "helpButton", 
  "nextButton",
  "fleeButton"
];

//For the hover effect and perhaps other reference.
let currentNumberOfChoices = 0;


//COMBAT Branch Checks
let combatPhase = 1;
let canAttack = true;
let canDefend = true;
let playerDefending = false;
let playerItemEquipped = false;

let enemyIdentifierIndex = 0;
let enemyTurnControl = 1;
let enemyDefending = false;


let enemies = {
  skeleton: {
    name: " SKELETON ",
    type: "Undead",
    enemyHealth: 50,
    enemyAgility: 6,
    enemyATK: 0,
    enemyDEF: 10,
    enemyDexterity: 2,
    enemyBalance: 2,
    enemyStrength: 2,
    enemyExperiencePoints: 15,
    enemyDefaultValues: [50,6,0,10,2,2,2]
  }
}

//Map, Map Locations, and Choices.
let mapArray = [["0","0","#","#","#"],["0","0","#","#","#"],["0","0","0","X","X"],["0","0","0","X","X"],["0","0","X","X","X"]];
//mapChars will be updated automatically in getPlayerLocation to handle map changes.
let mapChars = [];
let areaLibrary = {
  windswept: {
    char: '0', 
    name: 'Windswept Field',
    subName: '- Current Location -',
    campName: 'Breezy Hilltop (Windswept Field)',
    campSubName: '- Camping -',
    campValues: ["Health", 5],
    campTempValues: ["Agility", 3]
  },
  tranquil: {
    char: '#', 
    name: 'Tranquil Forest',
    subName: '- Current Location -',
    campName: 'Green Grotto (Tranquil Forest)',
    campSubName: '- Camping -',
    campValues: ["Health", 3],
    campTempValues: ["Defense", 3]
  },
  wasteland: {
    char: 'X', 
    name: 'Barren Wasteland',
    subName: '- Current Location -',
    campName: 'Exposed Camp (Barren Wasteland)',
    campSubName: '- Camping -',
    campValues: ["Health", -3],
    campTempValues: ["Agility", -3, "Defense", -5, "Attack", 1]
  }
};

//==========================================================





//**********************************************************
//================ EXPOSITION and MENU TEXT ================
//Where all of the game exposition and transition text will be.

//This is the library of game exposition, for everything from transitions
// between scenarios, explanations of items and abilities, story elements,
// and much more. 
//THERE ARE 12 LINES OF EXPOSITION ONLY, so be careful when giving detailed
// explanations since there may need to be multiple things on the screen.
let expositionLibrary = {
  error: {
    exp1: "The game encountered an unplanned state."
  },
  disclaimer: {
    exp1: "Welcome to the test version of WebPG (I know, the name needs work!).",
    exp2: "It is currently recommended to play the game on a laptop or desktop. Mobile phones and tablets will be corrected for at a much later time.",
    exp3: "There WILL be bugs and weird things going on! I appreciate your patience and hope that regardless, you find something to enjoy about this concept!",
    exp4: "The readme of the master branch in github is updated regularly to reflect development history and things I will work on next."
  },
  intro: {
    exp1: "You are in service to the great kingdom of Teku.",
    exp2: "The Queen has charged you with the recovery of a stone tablet, rumored to hold ancient knowledge.",
    exp3: "With this in mind, you set out to honor the Queen's wishes."
  },
  characterFlavor: {
    exp1: "You are a pitiful squire, with dreams of becoming a brave warrior.",
    exp2: "You are an aspiring magus, hoping to harness the powers beyond the pale.",
    exp3: "You are a cunning blade. You pray that your success will exonerate you from past... mistakes."
  }
};

//Combat Specific Exposition, Transitions will be handled by the map tile,
// scenario, or enemy type.
let combatExposition = {
  prompt: {
    name: "How Will You Fight?!",
    subName: "- In Combat -",
    1: "Your enemy is sizing you up!"
  }
};

//playerOWC is for OVERWORLD CHOICES!!
//The ORDER of 'legalChoices' and 'choiceIcons' is RESPECTIVE!!
let playerOWC = {
  map: {
    name: "Map - What will you do?",
    legalChoices: ["northButton","eastButton","southButton","itemButton","inspectButton"],
    choiceIcons: ["fa-caret-up","fa-caret-right","fa-caret-down","fa-flask"],
    flavorIcons: ["fa-hiking","fa-binoculars","fa-fire-alt","fa-drumstick-bite"],
    choice1: "Travel.",
    choice2: "Survey the land.",
    choice3: "Make camp where you are.",
    choice4: "Use an item."
  },
  travel: {
    name: "Adventuring - Which way would you like to go?",
    legalChoices: ["northButton","eastButton","southButton","westButton"],
    choiceIcons: ["fa-caret-up","fa-caret-right","fa-caret-down","fa-caret-left"],
    flavorIcons: ["fa-compass","fa-compass","fa-compass","fa-compass"],
    choice1: "Travel North",
    choice2: "Travel East",
    choice3: "Travel South",
    choice4: "Travel West"
  },
 startInspect: {
    name: "What would you like to examine?",
    legalChoices: ["northButton"],
    choiceIcons: [""],
    flavorIcons: [""],
    choice1: "Check an item."
  },
  finishInspect: {
    name: "Finished inspecting...",
    legalChoices: ["nextButton"],
    choiceIcons: [""],
    flavorIcons: [""],
    choice1: "Click 'NEXT' to continue..."
  },
  attemptSleep: {
    name: "You attempt to sleep.",
    legalChoices: ["nextButton"],
    choiceIcons: ["fa-angle-double-right"],
    flavorIcons: ["fa-map"],
    choice1: "Click 'NEXT' to continue..."
  },
  nextToMap: {
    name: "",
    legalChoices: ["nextButton"],
    choiceIcons: ["fa-angle-double-right"],
    flavorIcons: ["fa-map"],
    choice1: "Click 'NEXT' to continue..."
  },
  blankNext: {
    name: "",
    legalChoices: ["nextButton"],
    choiceIcons: ["fa-angle-double-right"],
    flavorIcons: ["fa"],
    choice1: "Click 'NEXT' to continue..."
  },
  nextFromOpening: {
    name: "Game Start!",
    legalChoices: ["nextButton"],
    choiceIcons: ["fa-angle-double-right"],
    flavorIcons: ["fa-map"],
    choice1: "Click 'NEXT' to continue..."
  },
  toBattle: {
    name: "To Battle!",
    legalChoices: ["attackButton","defendButton","itemButton"],
    choiceIcons: ["fa-skull","fa-shield-alt","fa-flask"],
    flavorIcons: ["fa-gavel","fa-times-circle","fa-drumstick-bite"],
    choice1: "Attack the Enemy!",
    choice2: "Defend Yourself!",
    choice3: "Use an Item."
  }
};

//==========================================================




//**********************************************************
//==================== BUTTON LISTENERS ====================
//For hooking up the control buttons and checking if legal.

let grabID = (event) => {
  console.log(event);
}

function onClickLogic(event) {
  //DEFEND BUTTON
  document.getElementById("defendButton").onclick = function() {
    console.log("\n \n \n");
    grabID(this.id + "clicked");
    mistressOfTurns("defendButton");
  };

  //FORWARD BUTTON
  document.getElementById("northButton").onclick = function() {
    console.log("\n \n \n");
    console.log("forwardControl Clicked");
    mistressOfTurns("northButton");
  };

  //ATTACK BUTTON
  document.getElementById("attackButton").onclick = function() {
    console.log("\n \n \n");
    grabID(this.id + " clicked");
    mistressOfTurns("attackButton");
  };

  //LEFT BUTTON
  document.getElementById("westButton").onclick = function() {
    console.log("\n \n \n");
    grabID(this.id + " clicked");
    mistressOfTurns("westButton");
  };

  //RIGHT BUTTON
  document.getElementById("eastButton").onclick = function() {
    console.log("\n \n \n");
    grabID(this.id + " clicked");
    mistressOfTurns("eastButton");
  };

  //BACKWARD BUTTON
  document.getElementById("southButton").onclick = function() {
    console.log("\n \n \n");
    grabID(this.id + " clicked");
    mistressOfTurns("southButton");
  };

  //ITEM BUTTON
  document.getElementById("itemButton").onclick = function() {
    console.log("\n \n \n");
    grabID(this.id + " clicked");
    mistressOfTurns("itemButton");
  };

  //INSPECT BUTTON
  document.getElementById("inspectButton").onclick = function() {
    console.log("\n \n \n");
    grabID(this.id + " clicked");
    mistressOfTurns("inspectButton");
  };

  //HELP BUTTON
  document.getElementById("helpButton").onclick = function() {
    console.log("\n \n \n");
    grabID(this.id + " clicked");
    mistressOfTurns("helpButton");
  };

  //NEXT BUTTON
  document.getElementById("nextButton").onclick = function() {
    console.log("\n \n \n");
    grabID(this.id + " clicked");
    mistressOfTurns("nextButton");
  };

  //NEXT BUTTON
  document.getElementById("fleeButton").onclick = function() {
    console.log("\n \n \n");
    grabID(this.id + " clicked");
    mistressOfTurns("fleeButton");
  };
}
//==========================================================




//**********************************************************
//============ MENU FUNCTIONS & UI MANIPULATION ============

// *******************************************************************
//ANY TIME THERE IS OUTPUT TO CONSOLE, INCLUDE THIS!!
//Hook this up later!!!
let toggleTypeAnim = () => {
  EXP1.classList.toggle("resetAnim");
  EXP2.classList.toggle("resetAnim");
  EXP3.classList.toggle("resetAnim");
  EXP4.classList.toggle("resetAnim");
}

//There are two separate button enable/disable functions to make the code more clear as to what is enabled/disabled and when.
// A single toggle function could work as well, but would become confusing to deal with after multiple turns of game logic.
let disableButtons = (buttons) => {
  //A function for disabling buttons and adding the CSS styling to show they're disabled. Pass Arrays
  
  //console.log("disableButtons(): "+buttons);
  //console.log("buttons to disable:",buttons);

  for(i=0;i<buttons.length;i++){
    
    
    switch (buttons[i]){
      case "defendButton":
        //console.log("[DEFEND]: disabled.");
        document.getElementById("defendButton").classList.add('disabled');
        break;
      case "northButton":
        //console.log("[FORWARD]: disabled.");
        document.getElementById("northButton").classList.add('disabled');
        break;
      case "attackButton":
        //console.log("[ATTACK]: disabled.");
        document.getElementById("attackButton").classList.add('disabled');
        break;
      case "westButton":
        //console.log("[LEFT]: disabled.");
        document.getElementById("westButton").classList.add('disabled');
        break;
      case "eastButton":
        //console.log("[RIGHT]: disabled.");
        document.getElementById("eastButton").classList.add('disabled');
        break;
      case "southButton":
        //console.log("[BACKWARD]: disabled.");
        document.getElementById("southButton").classList.add('disabled');
        break;
      case "itemButton":
        //console.log("[ITEM]: disabled.");
        document.getElementById("itemButton").classList.add('disabled');
        break;
      case "inspectButton":
        //console.log("[INSPECT]: disabled.");
        document.getElementById("inspectButton").classList.add('disabled');
        break;
      case "helpButton":
        //console.log("[HELP]: disabled.");
        document.getElementById("helpButton").classList.add('disabled');
        break;
      case "nextButton":
        //console.log("[NEXT]: disabled.");
        document.getElementById("nextButton").classList.add('disabled');
        break;
      case "fleeButton":
        //console.log("[FLEE]: disabled.");
        document.getElementById("fleeButton").classList.add('disabled');
        break;
    }
  }
}
let enableButtons = (buttons) => {
  //A function for disabling buttons and adding the CSS styling to show they're disabled. Pass Arrays

  for(i=0;i<buttons.length;i++){
    
    switch (buttons[i]){
      case "defendButton":
        //console.log("[DEFEND]: enabled!");
        document.getElementById("defendButton").classList.remove('disabled');
        break;
      case "northButton":
        //console.log("[FORWARD]: enabled!");
        document.getElementById("northButton").classList.remove('disabled');
        break;
      case "attackButton":
        //console.log("[ATTACK]: enabled!");
        document.getElementById("attackButton").classList.remove('disabled');
        break;
      case "westButton":
        //console.log("[LEFT]: enabled!");
        document.getElementById("westButton").classList.remove('disabled');
        break;
      case "eastButton":
        //console.log("[RIGHT]: enabled!");
        document.getElementById("eastButton").classList.remove('disabled');
        break;
      case "southButton":
        //console.log("[BACKWARD]: enabled!");
        document.getElementById("southButton").classList.remove('disabled');
        break;
      case "itemButton":
        //console.log("[ITEM]: enabled!");
        document.getElementById("itemButton").classList.remove('disabled');
        break;
      case "inspectButton":
        //console.log("[INSPECT]: enabled!");
        document.getElementById("inspectButton").classList.remove('disabled');
        break;
      case "helpButton":
        //console.log("[HELP]: enabled!");
        document.getElementById("helpButton").classList.remove('disabled');
        break;
      case "nextButton":
        //console.log("[NEXT]: enabled!");
        document.getElementById("nextButton").classList.remove('disabled');
        break;
    }
  }
}

//For bulk enabling everything.
let enableAllButtons = () => {
  enableButtons(
    [
      "defendButton", 
      "attackButton", 
      "northButton", 
      "eastButton", 
      "southButton", 
      "westButton", 
      "itemButton", 
      "inspectButton", 
      "helpButton", 
      "nextButton",
      "fleeButton"
    ]
  );
};
//For bulk disabling everything.
let disableAllButtons = () => {
  disableButtons(
    [
      "defendButton", 
      "attackButton", 
      "northButton", 
      "eastButton", 
      "southButton", 
      "westButton", 
      "itemButton", 
      "inspectButton", 
      "helpButton", 
      "nextButton",
      "fleeButton"
    ]
  );
};

//It may be useful to work this into a update buttons single function that handles all button legality
// in one fell swoop; you tell it what you want, it enables those, disables everything else, sets valid inputs.
let setTheseInputsAsValid = (buttons) => {
  //This is where you pass the inputs that you want to be acceptable. Pass Arrays
  //reset the array!!
  validInputs = [];

  for(i=0;i<buttons.length;i++){
    validInputs.push(buttons[i]);
    
  }
  //console.log("setTheseInputsAsValid: "+validInputs);

}

//Simply Pass AN ARRAY what you want enabled and set as valid.
let enabledAndValid = (buttons) => {
  console.log("Enabling And Setting to Valid: " + buttons);
  disableAllButtons();
  enableButtons(buttons);
  setTheseInputsAsValid(buttons);
};

//Rests the text CONSOLE UI
let resetUI = () => {
  console.log("*Resetting Console.");
  EXP2.textContent = "";
  EXP1.textContent = "";
  EXP3.textContent = "";
  EXP4.textContent = "";
  EXP5.textContent = "";
  EXP6.textContent = "";
  EXP7.textContent = "";
  EXP8.textContent = "";
  EXP9.textContent = "";
  EXP10.textContent = "";
  EXP11.textContent = "";
  EXP12.textContent = "";
};

let resetChoices = () => {
  console.log("*Resetting Choices.");
  COM0.textContent = "";
  COM1.textContent = "";
  COM2.textContent = "";
  COM3.textContent = "";
  COM4.textContent = "";
};




//For dropping an error on the console window quickly
let outputErrorToGame = () => {
  ResetUI();
  errorPackage = packageForConsole([expositionLibrary.error.exp1]);
  outputToConsole(errorPackage);
};

//The way to group multiple object.text into a single array to be passed for output.
let packageForConsole = (thingsToPackage) => {
  let package = [...thingsToPackage];
  console.log(" Packaged Exposition: " + package);
  return package;
};

//The function that reads the package of text and outputs to the console only.
let outputToConsole = (package) => {
  let idString = "exp";
  let packageLength = package.length;

  resetUI();

  //iterate through the package to print the text.
  //Can't use the stored references here, need to plug in the ID instead.
  for (i=0; i<packageLength; i++){
    idString = "exp";
    idString += i+1;
    document.getElementById(idString).textContent = package[i];
  }
};



//YOU have to manually tell the choices the number of Choices there are
// UP TO 4 since a NAME is ALWAYS ASSUMED!!!
let outputToChoices = (choicesObject, numberOfItemsToDisplay) => {

  //Empty the choices section for new print.
  resetChoices();


  switch (numberOfItemsToDisplay){
    default:
      console.log("ERROR in outputToChoices() length switch.")
    case 1:
      COM0.textContent = choicesObject.name;
      COM1.textContent = choicesObject.choice1;
    case 2:
      COM0.textContent = choicesObject.name;
      COM1.textContent = choicesObject.choice1;
      COM2.textContent = choicesObject.choice2;
    case 3:
      COM0.textContent = choicesObject.name;
      COM1.textContent = choicesObject.choice1;
      COM2.textContent = choicesObject.choice2;
      COM3.textContent = choicesObject.choice3;
    case 4:
      COM0.textContent = choicesObject.name;
      COM1.textContent = choicesObject.choice1;
      COM2.textContent = choicesObject.choice2;
      COM3.textContent = choicesObject.choice3;
      COM4.textContent = choicesObject.choice4;
  }
};

//Used later on when the game starts functioning more fully.
let outputToAbout = () => {
  //Don't Touch The Title
  //ABOUT0.textContent = "N/a";
  ABOUT1.textContent = "Player Position: (X: "+playerX+" / Y: "+playerY+")"; 
  ABOUT2.textContent = "Current Location: "+areaLibrary[playerCurrentTileKey].name;
  ABOUT3.textContent = "Activity: "+playerCurrentActivity;
  ABOUT4.textContent = "Conditions: "+currentWeather+", "+currentWind+"mph Wind, "+currentTemp+"* (F)";
};

//==========================================================




//**********************************************************
//===================== GAME COMPONENTS ====================
let getPlayerLocation = () => {
  //create an array of area name keys.
  let arrayOfAreas = Object.keys(areaLibrary);
  //Get the length of the areaLibrary object.
  let areaLibraryLength = Object.keys(areaLibrary).length;
  //Compensate for map not being cartesian.
  let playerAdjustedX = playerX + playerPositionOffsetX;
  let playerAdjustedY = playerY + playerPositionOffsetY;

  //cycle through areaLibrary and extract all 'chars'
  for(i=0; i<areaLibraryLength; i++){
    let areaName = arrayOfAreas[i];
    mapChars.push(areaLibrary[areaName].char);
  }

  //get current mapArray char, retrieve index for it, match it to area key.
  playerCurrentTileChar = mapArray[playerAdjustedX][playerAdjustedY];
  let currentArea = mapChars.indexOf(playerCurrentTileChar);
  playerCurrentTileKey = arrayOfAreas[currentArea];

  // console.log(mapChars);
  // console.log(playerCurrentTileChar);
  // console.log(playerCurrentTileKey);

  
};

let presentMapChoices = () => {
  enabledAndValid(playerOWC.map.legalChoices);
  outputToChoices(playerOWC.map, 4);
};

//==========================================================





//**********************************************************
//===================== CORE GAME LOOP =====================
let updateGameClock = () => {
  //Preserve the previous time for comparison.
  previousClockState = gameClock;

  //increment the game clock.
  gameClock += 1;
  console.log("[GAME CLOCK]: (+1) = ", gameClock);
}
//**********************************************************
//**********************************************************
//**********************************************************
//**********************************************************
//**********************************************************
//**********************************************************
let mistressOfTurns = (playerInput) => {
  console.log("\n \n \n");
  console.log("===== ===== =====");
  console.log(" TURN: " + gameClock);

  //Initial Turn 0
  if(gameClock == 0){
    let disclaimerPackage = packageForConsole([
      expositionLibrary.disclaimer.exp1,
      expositionLibrary.disclaimer.exp2,
      expositionLibrary.disclaimer.exp3,
      expositionLibrary.disclaimer.exp4,
    ]);
    outputToConsole(disclaimerPackage);

    enabledAndValid([
        "nextButton"
      ]);
    outputToChoices(playerOWC.nextFromOpening, 1);
    gameModeCheck = "setup";
    updateGameClock();
  } else if(validInputs.includes(playerInput) && (gameClock > previousClockState))
  {
    //The MASTER Switch Statement
    switch (gameModeCheck){
      default:
        console.log("[X]: FATAL ERROR IN gameModeCheck! MoT.");
      case "setup":
        //Explain the players starting conditions. Maybe a random starting location from a list of locations?
        outputToConsole(["You made it this far!"]);
        getPlayerLocation();
        presentMapChoices();
        outputToAbout();
    }
  }
}
//==========================================================



//**********************************************************
// ============== INITIALIZATION FUNCTIONS =================

let gamePipeline = () => {
  //Attach all of the Menus
  attachBurgerMenus();
  attachSettingsPanel();
  //Attach Control Buttons
  onClickLogic();
  //Reset Control buttons
  enableAllButtons();
  //UpdateTheStatMenu

  //Pass off the game to MoT.
  mistressOfTurns();
}

//+_+_+_++_+_+_+_+_+_+_+_+_+_++_+_+_+_+_++_+_+_+_+_+_+_+_+_+_++_
//turn "0" => start the game.
gamePipeline();