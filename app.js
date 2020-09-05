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
//================== VARIABLES & CONTROLS ==================
//Global Variables, engine control variables, etc.

//GAME CLOCK
let gameClock = 1;
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
  0: {
    char: '0', 
    name: 'Windswept Field',
    subName: '- Current Location -',
    campName: 'Breezy Hilltop (Windswept Field)',
    campSubName: '- Camping -',
    campValues: ["Health", 5],
    campTempValues: ["Agility", 3]
  },
  #: {
    char: '#', 
    name: 'Tranquil Forest',
    subName: '- Current Location -',
    campName: 'Green Grotto (Tranquil Forest)',
    campSubName: '- Camping -',
    campValues: ["Health", 3],
    campTempValues: ["Defense", 3]
  },
  X: {
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
  welcome: {
    '1': "This is a test of the expositionLibrary, Welcome to WebPG!"
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
//============ MENU FUNCTIONS & UI MANIPULATION ============
//Which Controls will be legal and which aren't. 'Settings' class toggles, etc.

//There are two separate button enable/disable functions to make the code more clear as to what is enabled/disabled and when.
// A single toggle function could work as well, but would become confusing to deal with after multiple turns of game logic.
let disableButtons = (buttons) => {
  //A function for disabling buttons and adding the CSS styling to show they're disabled. Pass Arrays
  
  //console.log("disableButtons(): "+buttons);
  //console.log("buttons to disable:",buttons);

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

  for(i=0;i<buttons.length;i++){
    
    switch (buttons[i]){
      case "defendControl":
        //console.log("[DEFEND]: enabled!");
        document.getElementById("defendControl").classList.remove('disabled');
        break;
      case "forwardControl":
        //console.log("[FORWARD]: enabled!");
        document.getElementById("forwardControl").classList.remove('disabled');
        break;
      case "attackControl":
        //console.log("[ATTACK]: enabled!");
        document.getElementById("attackControl").classList.remove('disabled');
        break;
      case "leftControl":
        //console.log("[LEFT]: enabled!");
        document.getElementById("leftControl").classList.remove('disabled');
        break;
      case "rightControl":
        //console.log("[RIGHT]: enabled!");
        document.getElementById("rightControl").classList.remove('disabled');
        break;
      case "backwardControl":
        //console.log("[BACKWARD]: enabled!");
        document.getElementById("backwardControl").classList.remove('disabled');
        break;
      case "itemControl":
        //console.log("[ITEM]: enabled!");
        document.getElementById("itemControl").classList.remove('disabled');
        break;
      case "inspectControl":
        //console.log("[INSPECT]: enabled!");
        document.getElementById("inspectControl").classList.remove('disabled');
        break;
      case "helpControl":
        //console.log("[HELP]: enabled!");
        document.getElementById("helpControl").classList.remove('disabled');
        break;
      case "nextControl":
        //console.log("[NEXT]: enabled!");
        document.getElementById("nextControl").classList.remove('disabled');
        break;
    }
  }
}
//For game start
let resetUI = () => {
  //console.log("RESETTING UI + I/O");

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
    
  }
  //console.log("setTheseInputsAsValid: "+validInputs);

}

//Make Sure to ADD references when stats are added later! This just grabs the latest stat and updates it!!
let updateStatMenu = () => {
  $("#statPlayerName").text(player.playerName);
  $("#statPlayerHealth").text(player.playerHealth);
  $("#statPlayerAgility").text(player.playerAgility);
  $("#statPlayerAttack").text(player.playerATK);
  $("#statPlayerDefense").text(player.playerDEF);
  $("#statPlayerStrength").text(player.playerStrength);
  $("#statPlayerBalance").text(player.playerBalance);
  $("#statPlayerDexterity").text(player.playerDexterity);
}

//==========================================================




//**********************************************************
//==================== BUTTON LISTENERS ====================
//For hooking up the control buttons and checking if legal.


//==========================================================





//**********************************************************
//===================== CORE GAME LOOP =====================

//==========================================================



//**********************************************************
// ============== INITIALIZATION FUNCTIONS =================
attachBurgerMenus();
attachSettingsPanel();
updateStatMenu();