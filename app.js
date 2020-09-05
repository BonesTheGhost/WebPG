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
//==========================================================






//**********************************************************
//================== VARIABLES & CONTROLS ==================
//Global Variables, engine control variables, etc.

//GAME CLOCK
let gameClock = 0;
let previousClockState = 0;

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
let playerCurrentTile = "";
let playerCurrentTileIndex = 0;
let inTown = false;
let inDungeon = false;

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

//mistressOfTurns() Branch Checks
let gameModeCheck = "overworld";
let canMove = true;
let canUseItem = true;
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
    legalChoices: ["forwardControl","rightControl","backwardControl","itemControl","inspectControl"],
    choiceIcons: ["fa-caret-up","fa-caret-right","fa-caret-down","fa-flask"],
    flavorIcons: ["fa-hiking","fa-binoculars","fa-fire-alt","fa-drumstick-bite"],
    choice1: "Travel.",
    choice2: "Survey the land.",
    choice3: "Make camp where you are.",
    choice4: "Use an item."
  },
  travel: {
    name: "Adventuring - Which way would you like to go?",
    legalChoices: ["forwardControl","rightControl","backwardControl","leftControl"],
    choiceIcons: ["fa-caret-up","fa-caret-right","fa-caret-down","fa-caret-left"],
    flavorIcons: ["fa-compass","fa-compass","fa-compass","fa-compass"],
    choice1: "Travel North",
    choice2: "Travel East",
    choice3: "Travel South",
    choice4: "Travel West"
  },
  finishInspect: {
    name: "Finished inspecting...",
    legalChoices: ["nextControl"],
    choiceIcons: ["fa-angle-double-right"],
    flavorIcons: ["fa-map"],
    choice1: "Click 'NEXT' to continue..."
  },
  attemptSleep: {
    name: "You attempt to sleep.",
    legalChoices: ["nextControl"],
    choiceIcons: ["fa-angle-double-right"],
    flavorIcons: ["fa-map"],
    choice1: "Click 'NEXT' to continue..."
  },
  nextToMap: {
    name: "",
    legalChoices: ["nextControl"],
    choiceIcons: ["fa-angle-double-right"],
    flavorIcons: ["fa-map"],
    choice1: "Click 'NEXT' to continue..."
  },
  blankNext: {
    name: "",
    legalChoices: ["nextControl"],
    choiceIcons: ["fa-angle-double-right"],
    flavorIcons: ["fa"],
    choice1: "Click 'NEXT' to continue..."
  },
  toBattle: {
    name: "To Battle!",
    legalChoices: ["attackControl","defendControl","itemControl"],
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


//==========================================================




//**********************************************************
//============ MENU FUNCTIONS & UI MANIPULATION ============

let ResetUI = () => {
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

  ResetUI();

  //iterate through the package to print the text.
  //Can't use the stored references here, need to plug in the ID instead.
  for (i=0; i<packageLength; i++){
    idString = "exp";
    idString += i+1;
    console.log(idString);
    document.getElementById(idString).textContent = package[i];
  }
};

//==========================================================




//**********************************************************
//===================== GAME COMPONENTS ====================


//==========================================================





//**********************************************************
//===================== CORE GAME LOOP =====================
let mistressOfTurns = () => {
  console.log("\n \n \n");
  console.log("===== ===== =====");
  console.log(" TURN: " + gameClock);

  if(gameClock == 0){
    let openingPackage = packageForConsole([
      expositionLibrary.intro.exp1,
      expositionLibrary.intro.exp2,
      expositionLibrary.intro.exp3
    ]);

    outputToConsole(openingPackage);
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

  //ResetUI - Control buttons

  //UpdateTheStatMenu

  //Run Intro Sequence

  //Initialize PlayerLocation

  //Pass off the game to MOT.
  mistressOfTurns();
}

//+_+_+_++_+_+_+_+_+_+_+_+_+_++_+_+_+_+_++_+_+_+_+_+_+_+_+_+_++_
//turn "0" => start the game.
gamePipeline();