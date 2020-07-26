//console.log("[app.js]:: Attached and working!");

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
let gameClock = 1;
let previousClockState = 0;

//Player Position Checks. 
let playerX = 0;
let playerY = 0;

//For Controlling various functions, like inspect based on location vs. item. vs. mob.
let playerCurrentTile = "";
let playerCurrentTileIndex = 0;
let inTown = false;
let inDungeon = false;

//Player Stats
player = {
  playerName: "Zorus",
  playerATK: 0,
  playerDEF: 5,
  playerHealth: 5,
  playerAgility: 5,
  playerDexterity: 5,
  playerBalance: 5,
  playerStrength: 5,
  playerAttack1EXP: ["You strike quickly with your blade!"],
  playerLevel: 1,
  playerExperience: 0,
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

let enemyTurnControl = 1;
let enemyDefending = false;

//========================= *** GAME DATA *** => Will probably need to add things from the Map Tool!!! ======================================================================================

//The length of a single sub-array from mapArray!!
let mapHeight = 5;

//The number of sub-arrays in mapArray!!
let mapWidth = 5;

//OFFSETS to compensate for different map sizes!!
let playerPositionOffsetX = Math.floor(mapWidth/2);
let playerPositionOffsetY = Math.floor(mapHeight/2);


//ENEMIES
let enemies = [
  {
    name: "Corrupted Skeleton",
    type: "Undead",
    enemyHealth: 5,
    enemyAgility: 6,
    enemyATK: 0,
    enemyDEF: 10,
    enemyDexterity: 5,
    enemyBalance: 5,
    enemyStrength: 5,
    enemyAttack1EXP: ["The skeleton lurches forward with a rusty knife!"],
    enemyDefend1EXP: ["The skeleton weakly blocks with its rusty knife!"],
    enemyExperiencePoints: 15,
  }
];


//Map, Map Locations, and Choices.
mapArray = [["0","0","#","#","#"],["0","0","#","#","#"],["0","0","0","X","X"],["0","0","0","X","X"],["0","0","X","X","X"]];
areaLibrary = [
  {
    char: '0', 
    name: 'Windswept Field',
    subName: '- Current Location -',
    campName: 'Breezy Hilltop (Windswept Field)',
    campSubName: '- Camping -',
    areaEXP: ["The grass is knee high and very soft.", 
    "A gentle warm breeze waves through the plains, an ebb and flow, an ocean of life.", 
    "You can see for quite some distance."],
    inspectEXP: ["You kneel down to examine the grass further.", 
    "The plant-life is so dense that it appears nothing dangerous could hide in it.", 
    "This would make for an ideal camping spot!","You are completely at ease."],
    campEXP: ["You stop in a small clearing.", 
    "A small fire-pit is prepared, with ample blocking for the wind!", 
    "All of the extra grass makes cozy bedding.", "The night is calm and cool."],
    campValues: ["Health", 5],
    campTempValues: ["Agility", 3]
  },
  {
    char: '#', 
    name: 'Tranquil Forest',
    subName: '- Current Location -',
    campName: 'Green Grotto (Tranquil Forest)',
    campSubName: '- Camping -',
    areaEXP: ["The trees are tall and thick.", 
    "The rustle of leaves and chirping of birds gives off a healthy feeling.", 
    "The air is clear but a little stagnant."],
    inspectEXP: ["You crouch to examine the forest floor.", 
    "The forest is clearly healthy, there may be the occasional predator.", 
    "Camping here could prove, invigorating.","It is peaceful here."],
    campEXP: ["You discover the exposed roots of a giant tree.", 
    "Camp is prepared tucked against the roots. A humble campfire is lit.", 
    "The forest becomes very dark, yet you feel secure.", "You rest easily, but keep a weapon near just in case."],
    campValues: ["Health", 3],
    campTempValues: ["Defense", 3]
  },
  {
    char: 'X', 
    name: 'Barren Wasteland',
    subName: '- Current Location -',
    campName: 'Exposed Camp (Barren Wasteland)',
    campSubName: '- Camping -',
    areaEXP: ["Shale and cracked earth stretch out before you.", 
    "The air is heavy and sour smelling. Only small thorny brush dots the landscape.", 
    "You see nothing of value."],
    inspectEXP: ["You bend to claw at the dirt.", 
    "The clay is pale and hard, leaving a sandy residue on your hand.", 
    "This area is completely exposed...","Something might be watching you..."],
    campEXP: ["You halt at a random spot.", 
    "There is no cover so a fire would be seen for miles.", 
    "Your meal is cold and unsatisfying.", "Something feels off..."],
    campValues: ["Health", -3],
    campTempValues: ["Agility", -3, "Defense", -5, "Attack", 1]
  }
];

//Current Choices will be passed AS AN INDEX to provideChoices()
let playerCurrentChoices = 0;

//GLOBAL GAME EXPOSITION :: EXP ARRAY CAN ONLY HOLD UP TO >> 4 << THINGS!!!
//This section is for transition explanations and the smoothing over of the various game "modes": entering/leaving combat, being unable to use items, etc.
let expositionArray = [
  {
    name: "Travel",
    subName: "Preparing to move",
    EXP: ["You have chosen to set off!"]
  },
  {
    name: "Survey Findings",
    subName: "Its hard to be sure, but you mostly see:",
    EXP: []
  },
  {
    name: "You Encounter a Threat!",
    subName: ">> Entering Combat <<",
    EXP: ["Something has clawed its way out of the ground, its a "]
  },
  {
    name: "You Died!!!",
    subName: "* Thanks For Playing *",
    EXP: ["This game is currently a proof of concept.", "No permanent plans have been made for the game.", "If you have feedback, you can email me at bonestheghost@gmail.com!", "If there is enough interest I may continue building this :)"]
  }
];

//THIS IS FOR COMBAT SPECIFIC EXPOSITION! 
let combatExposition = [
  {
    name: "How Will You Fight?!",
    subName: "- In Combat -",
    EXP: ["Your enemy is sizing you up!"],
    EXP1: ["The beast is staring you down"],
    EXP2: ["Feral snarling assaults you ears!"]
  },
  {
    name: "First Strike: Enemy",
    subName: "- In Combat -",
    EXP: ["The enemy is faster than you are!","It lurches forward to attack!"],
    EXP1: ["The enemy is faster than you are!","It lunges at you furiously!"],
    EXP2: ["The enemy is faster than you are!","Un-human speed grants it an opening!"],
  },
  {
    name: "First Strike: "+player.playerName,
    subName: "- In Combat -",
    EXP: ["Your reflexes give you first strike!"]
  },
  {
    name: "Player Attack",
    subName: "- In Combat -",
    EXP: ["Your weapon choices are limited...","You strike with your knife!!"]
  },
  {
    name: "Player Defend",
    subName: "- In Combat -",
    EXP: ["You have little to defend yourself with...","A parry is attempted!!"]
  },
  {
    name: " Attacks!",
    subName: "- In Combat -"
  },
  {
    name: " Defends!",
    subName: "- In Combat -"
  }
];

//playerGlobalChoices is for OVERWORLD CHOICES, TOWN CHOICES.
//The ORDER of 'legalChoices' and 'choiceIcons' is RESPECTIVE!!!
let playerGlobalChoices = [
  {
    name: "Map - What will you do?",
    legalChoices: ["forwardControl","rightControl","backwardControl","itemControl","inspectControl"],
    choiceIcons: ["fa-caret-up","fa-caret-right","fa-caret-down","fa-flask"],
    flavorIcons: ["fa-hiking","fa-binoculars","fa-fire-alt","fa-drumstick-bite"],
    choice1: "Travel.",
    choice2: "Survey the land.",
    choice3: "Make camp where you are.",
    choice4: "Use an item."
  },
  {
    name: "Adventuring - Which way would you like to go?",
    legalChoices: ["forwardControl","rightControl","backwardControl","leftControl"],
    choiceIcons: ["fa-caret-up","fa-caret-right","fa-caret-down","fa-caret-left"],
    flavorIcons: ["fa-compass","fa-compass","fa-compass","fa-compass"],
    choice1: "Travel North",
    choice2: "Travel East",
    choice3: "Travel South",
    choice4: "Travel West"
  },
  {
    name: "Finished inspecting...",
    legalChoices: ["nextControl"],
    choiceIcons: ["fa-angle-double-right"],
    flavorIcons: ["fa-map"],
    choice1: "Click 'NEXT' to continue..."
  },
  {
    name: "You attempt to sleep.",
    legalChoices: ["nextControl"],
    choiceIcons: ["fa-angle-double-right"],
    flavorIcons: ["fa-map"],
    choice1: "Click 'NEXT' to continue..."
  },
  {
    name: "",
    legalChoices: ["nextControl"],
    choiceIcons: ["fa-angle-double-right"],
    flavorIcons: ["fa-map"],
    choice1: "Click 'NEXT' to continue..."
  },
  {
    name: "To Battle!",
    legalChoices: ["attackControl","defendControl","itemControl"],
    choiceIcons: ["fa-skull","fa-shield-alt","fa-flask"],
    flavorIcons: ["fa-gavel","fa-times-circle","fa-drumstick-bite"],
    choice1: "Attack the Enemy!",
    choice2: "Defend Yourself!",
    choice3: "Use an Item."
  },
  {
    name: "Made By:",
    legalChoices: ["nextControl"],
    choiceIcons: ["fa-angle-double-right"],
    flavorIcons: ["fa-skull-crossbones"],
    choice1: "BonesTheGhost"
  },
];
//============================================================================

//============================== UI FUNCTIONS ================================

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


//Area Targeting and String printing functions. USE THE TOP TWO FUNCTIONS TO PRINT STUFF, FOR THE THIRD USE provideChoices();
let outputToOverworld = (title, subTitle) => {
  //This is for printing major events/area names.
  //console.log("[outputToOverworld() >> title, subTitle]: "+title+", "+subTitle);

  document.getElementById("ow1").textContent = title;
  document.getElementById("ow2").textContent = subTitle;
}
let outputToExpose = (exposition) => {
  //Outputs exposition text. Expecting an areaLibrary[#].areaEXP
  //console.log("[outputToExpose(areaIndex).areaEXP]: "+exposition);
  //console.log("[areaEXP.length]: ", exposition.length);

  //Reset the area.
  document.getElementById("exp1").textContent = "";
  document.getElementById("exp2").textContent = "";
  document.getElementById("exp3").textContent = "";
  document.getElementById("exp4").textContent = "";

  switch (exposition.length) {
    case 1:
      //console.log("There is 1 line of exposition.");
      //console.log("[areaEXP.length]: ", areaEXP.length);
      document.getElementById("exp1").textContent = exposition[0];
      break;
    case 2:
      //console.log("There are 2 lines of exposition.");
      //console.log("[areaEXP.length]: ", areaEXP.length);
      document.getElementById("exp1").textContent = exposition[0];
      document.getElementById("exp2").textContent = exposition[1];
      break;
    case 3:
      //console.log("There are 3 lines of exposition.");
      //console.log("[areaEXP.length]: ", areaEXP.length);
      document.getElementById("exp1").textContent = exposition[0];
      document.getElementById("exp2").textContent = exposition[1];
      document.getElementById("exp3").textContent = exposition[2];
      break;
    case 4:
      //console.log("There are 4 lines of exposition.");
      //console.log("[areaEXP.length]: ", areaEXP.length);
      document.getElementById("exp1").textContent = exposition[0];
      document.getElementById("exp2").textContent = exposition[1];
      document.getElementById("exp3").textContent = exposition[2];
      document.getElementById("exp4").textContent = exposition[3];
      break;
  }
}
//Use the provide choices, not this specifically if it can be helped.
let outputToPlayerComms = (availablePlayerChoices) => {
  //Outputs the player choices.

  //Gets the number of choices -4 to account for the name, legalChoices[], choiceIcons[], and flavorIcons[].
  let howManyChoices = checkObjectSize(availablePlayerChoices)-4;
  //console.log("[the length of the current choices]: "+howManyChoices);

  //Resetting the icons
  document.getElementById("input1").className = "fas";
  document.getElementById("choice1").className = "fas";

  document.getElementById("input2").className = "fas";
  document.getElementById("choice2").className = "fas";

  document.getElementById("input3").className = "fas";
  document.getElementById("choice3").className = "fas";

  document.getElementById("input4").className = "fas";
  document.getElementById("choice4").className = "fas";

  document.getElementById("com1").textContent = "";
  document.getElementById("com2").textContent = "";
  document.getElementById("com3").textContent = "";
  document.getElementById("com4").textContent = "";

  switch (howManyChoices) { 
    case 1:
      //console.log("There is 1 choice");
      //console.log(availablePlayerChoices.name);
      document.getElementById("com0").textContent = availablePlayerChoices.name;
      document.getElementById("com1").textContent = availablePlayerChoices.choice1;
      document.getElementById("input1").classList.add(availablePlayerChoices.choiceIcons[0]);
      document.getElementById("choice1").classList.add(availablePlayerChoices.flavorIcons[0]);
      break;
    case 2:
      //console.log("There are 2 choices");
      //console.log(availablePlayerChoices.name);
      document.getElementById("com0").textContent = availablePlayerChoices.name;
      document.getElementById("com1").textContent = availablePlayerChoices.choice1;
      document.getElementById("input1").classList.add(availablePlayerChoices.choiceIcons[0]);
      document.getElementById("choice1").classList.add(availablePlayerChoices.flavorIcons[0]);

      document.getElementById("com2").textContent = availablePlayerChoices.choice2;
      document.getElementById("input2").classList.add(availablePlayerChoices.choiceIcons[1]);
      document.getElementById("choice2").classList.add(availablePlayerChoices.flavorIcons[1]);
      break;
    case 3:
      //console.log("There are 3 choices");
      //console.log(availablePlayerChoices.name);
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
      break;
    case 4:
      //console.log("There are 4 choices");
      //console.log(availablePlayerChoices.name);

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

//I MAY NOT NEED THIS SET UP THIS WAY, ALL CHOICES WILL GO THROUGH playerGlobalChoices, but the EXP will come from elsewhere as needed!
//Choices Object Checking and Output Behavior itself.
let provideChoices = (arrayIndicator, arrayIndex) => {
  
  let currentArray = [];
  switch(arrayIndicator){
    case "playerGlobalChoices":
      currentArray = playerGlobalChoices;
      break;
    case "expositionArray":
      //currentArray = expositionArray;
      break;
    case "itemArray":
      //Set to item Array
    case "enemyArray":
      //Set to enemy array
    default:
      console.log("[X] FATAL ERROR IN OUTPUT FUNCTION!")
  }

  resetUI();

  //Using the playerCurrentChoices global control variable, pick the choices you want to provide and send to output.
  //console.log("[Selected Choices]: "+currentArray[arrayIndex].name);
  outputToPlayerComms(currentArray[arrayIndex]);

  //Setting whatever choices are legal as valid inputs.
  setTheseInputsAsValid(currentArray[arrayIndex].legalChoices);

  //Making sure the valid inputs are enabled.
  enableButtons(currentArray[arrayIndex].legalChoices);


  //Make a copy of the global Array to modify.
  let buttonsToDisable = [...globalInputs];

  //For each input in the legal choices array, find it in the global input array copy and remove it; leaving unnecessary buttons.
  for(i=0;i<currentArray[arrayIndex].legalChoices.length;i++){
    var index = buttonsToDisable.indexOf(currentArray[arrayIndex].legalChoices[i]);
    delete buttonsToDisable[index];
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


// *******************************************************************
//ANY TIME THERE IS OUTPUT TO CONSOLE, INCLUDE THIS!!
let toggleTypeAnim = () => {
  document.getElementById("ow1").classList.toggle("resetAnim");
  document.getElementById("ow2").classList.toggle("resetAnim");

  document.getElementById("exp1").classList.toggle("resetAnim");
  document.getElementById("exp2").classList.toggle("resetAnim");
  document.getElementById("exp3").classList.toggle("resetAnim");
  document.getElementById("exp4").classList.toggle("resetAnim");

  document.getElementById("com0").classList.toggle("resetAnim");
  document.getElementById("com1Div").classList.toggle("resetAnim");
  document.getElementById("com2Div").classList.toggle("resetAnim");
  document.getElementById("com3Div").classList.toggle("resetAnim");
  document.getElementById("com4Div").classList.toggle("resetAnim");
}



//=========================== UI EFFECTS FOR SELECTIONS AND TEXT ===============================
//Button hover effect. Exit function removes blink when no longer hovered.
$(".controlButton").hover(function(){
  let currentClasses = [...this.classList];

  let controlButtonIcon = $(this).children()[0].classList[1];
  let choiceIcons = [];

  controlButtonIcon.trim();

    //Make sure the button isn't disabled.
    if(!currentClasses.includes('disabled')){

      
      
      //console.log("Current number of choices: ",currentNumberOfChoices);
      //console.log("Syntax check for input1:",$("#com1Div").children()[0].classList[1]);

      //console.log($("#com1Div").children()[0].classList[1]);
      //console.log($("#com2Div").children()[0].classList[1]);
      //console.log($("#com3Div").children()[0].classList[1]);
      //console.log($("#com4Div").children()[0].classList[1]);

      switch(currentNumberOfChoices){
        case 1:
          //console.log("There is 1 choice.");
          choiceIcons.push(
            $("#com1Div").children()[0].classList[1],
            $("#com2Div").children()[0].classList[1],
            $("#com3Div").children()[0].classList[1],
            $("#com4Div").children()[0].classList[1]
            );

          switch (controlButtonIcon){
            case choiceIcons[0]:
              //console.log("MATCHED: "+controlButtonIcon);
              $("#com1Div").addClass("blink");
              break;
            default:
              console.log("[X] FATAL ERROR HOVER CHOICE 1");
          }
          break;
        case 2:
          //console.log("There are 2 choices.");
          choiceIcons.push(
            $("#com1Div").children()[0].classList[1],
            $("#com2Div").children()[0].classList[1],
            $("#com3Div").children()[0].classList[1],
            $("#com4Div").children()[0].classList[1]
            );

          switch (controlButtonIcon){
            case choiceIcons[0]:
              //console.log("MATCHED: "+controlButtonIcon);
              $("#com1Div").addClass("blink");
              break;
            case choiceIcons[1]:
              //console.log("MATCHED: "+controlButtonIcon);
              $("#com2Div").addClass("blink");
              break;
            default:
              console.log("[X] FATAL ERROR HOVER CHOICE 2");
          }
          break;
        case 3:
          //console.log("There are 3 choices.");
          choiceIcons.push(
            $("#com1Div").children()[0].classList[1],
            $("#com2Div").children()[0].classList[1],
            $("#com3Div").children()[0].classList[1],
            $("#com4Div").children()[0].classList[1]
            );

          switch (controlButtonIcon){
            case choiceIcons[0]:
              //console.log("MATCHED: "+controlButtonIcon);
              $("#com1Div").addClass("blink");
              break;
            case choiceIcons[1]:
              //console.log("MATCHED: "+controlButtonIcon);
              $("#com2Div").addClass("blink");
              break;
            case choiceIcons[2]:
              //console.log("MATCHED: "+controlButtonIcon);
              $("#com3Div").addClass("blink");
              break;
            default:
              console.log("[X] FATAL ERROR HOVER CHOICE 3");
          }
          break;
        case 4:
          //console.log("There are 4 choices.");
          choiceIcons.push(
            $("#com1Div").children()[0].classList[1],
            $("#com2Div").children()[0].classList[1],
            $("#com3Div").children()[0].classList[1],
            $("#com4Div").children()[0].classList[1]
            );

          switch (controlButtonIcon){
            case choiceIcons[0]:
              //console.log("MATCHED: "+controlButtonIcon);
              $("#com1Div").addClass("blink");
              break;
            case choiceIcons[1]:
              //console.log("MATCHED: "+controlButtonIcon);
              $("#com2Div").addClass("blink");
              break;
            case choiceIcons[2]:
              //console.log("MATCHED: "+controlButtonIcon);
              $("#com3Div").addClass("blink");
              break;
            case choiceIcons[3]:
              //console.log("MATCHED: "+controlButtonIcon);
              $("#com4Div").addClass("blink");
              break;
            default:
              console.log("[X] FATAL ERROR HOVER CHOICE 4");
          }
          break;
        case 5:
        //console.log("There are 4 choices ( + inspect ).");
          choiceIcons.push(
            $("#com1Div").children()[0].classList[1],
            $("#com2Div").children()[0].classList[1],
            $("#com3Div").children()[0].classList[1],
            $("#com4Div").children()[0].classList[1]
            );

            //console.log(choiceIcons);

          switch (controlButtonIcon){
            case choiceIcons[0]:
              //console.log("MATCHED: "+controlButtonIcon);
              $("#com1Div").addClass("blink");
              break;
            case choiceIcons[1]:
              //console.log("MATCHED: "+controlButtonIcon);
              $("#com2Div").addClass("blink");
              break;
            case choiceIcons[2]:
              //console.log("MATCHED: "+controlButtonIcon);
              $("#com3Div").addClass("blink");
              break;
            case choiceIcons[3]:
              //console.log("MATCHED: "+controlButtonIcon);
              $("#com4Div").addClass("blink");
              break;
            default:
              //console.log("[X] FATAL ERROR HOVER CHOICE 5");
          }
        break;
        default:
          console.log("[X] FATAL ERROR IN HOVER CHOICE COUNT!")
      }

    } else {
      //console.log("THIS BUTTON IS DISABLED; NO BLINK");

      //Grab the icons that are there.
      choiceIcons.push(
        $("#com1Div").children()[0].classList[1],
        $("#com2Div").children()[0].classList[1],
        $("#com3Div").children()[0].classList[1],
        $("#com4Div").children()[0].classList[1]
        );

        //console.log(choiceIcons);

      switch (controlButtonIcon){
        case choiceIcons[0]:
          //console.log("MATCHED: "+controlButtonIcon);
          $("#com1Div").addClass("notAvailable");
          break;
        case choiceIcons[1]:
          //console.log("MATCHED: "+controlButtonIcon);
          $("#com2Div").addClass("notAvailable");
          break;
        case choiceIcons[2]:
          //console.log("MATCHED: "+controlButtonIcon);
          $("#com3Div").addClass("notAvailable");
          break;
        case choiceIcons[3]:
          //console.log("MATCHED: "+controlButtonIcon);
          $("#com4Div").addClass("notAvailable");
          break;
        default:
          //console.log("[X] FATAL ERROR DISABLE BUTTON HOVER");
    }
  }
},
function() {
  $("#com1Div").removeClass("blink");
  $("#com2Div").removeClass("blink");
  $("#com3Div").removeClass("blink");
  $("#com4Div").removeClass("blink");

  $("#com1Div").removeClass("notAvailable");
  $("#com2Div").removeClass("notAvailable");
  $("#com3Div").removeClass("notAvailable");
  $("#com4Div").removeClass("notAvailable");
})
//This prevents disabled buttons from continuing to blink their choice on next turn.
$(".controlButton").on("click", function() {
  $("#com1Div").removeClass("blink");
  $("#com2Div").removeClass("blink");
  $("#com3Div").removeClass("blink");
  $("#com4Div").removeClass("blink");
})

//Exposition highlight quality of life feature on hover.
$("#exp1").hover(function(){
  $("#exp1").addClass("highlight");
}, function(){
  $("#exp1").removeClass("highlight");
})
$("#exp2").hover(function(){
  $("#exp2").addClass("highlight");
}, function(){
  $("#exp2").removeClass("highlight");
})
$("#exp3").hover(function(){
  $("#exp3").addClass("highlight");
}, function(){
  $("#exp3").removeClass("highlight");
})
$("#exp4").hover(function(){
  $("#exp4").addClass("highlight");
}, function(){
  $("#exp4").removeClass("highlight");
})
//======================================================================================
//===========================================================================

//========================== MOVEMENT FUNCTIONS ==============================
let getPlayerLocation = () => {
  toggleTypeAnim();
  //Check the coordinates, find the location in the areaLibrary, then pass the correct exposition to the appropriate output function.

  //***Keep in mind what the global control variable playerCurrentChoices is doing!!

  //Converts the players Cartesian Coordinate System Variables to the 0-based index array values. Y must be inverted because of monitor draw direction
  let playerArrayX = playerX + playerPositionOffsetX;
  let playerArrayY = (-1*playerY) + playerPositionOffsetY;

  //For checking the position of the player and if it accurately lines up with the mapArray.
  //For an odd X/Y value, "spawn" should be the center tile. For an even X/Y value, it should be offset towards 0
  //console.log("[mapArray Offset Check]:: position(0,0) == ", mapArray[playerPositionOffsetX][playerPositionOffsetY]);
  console.log("(playerX,playerY): " + playerX + " , " + playerY);
  console.log("playerX: "+playerX+" | playerArrayX: "+playerArrayX);
  console.log("playerY: "+playerY+" | playerArrayY: "+playerArrayY);

  let currentIndex = 0;
  let testChar = "";
  let chosenIndex = 0;

  //Used a while loop here so that if the character is found sooner, can exit the loop.
  while(currentIndex < areaLibrary.length){
    testChar = areaLibrary[currentIndex].char;
    //console.log("Current Test Char: " + testChar);

    switch (testChar == mapArray[playerArrayX][playerArrayY]){
      case true:
        //console.log("character matched!");
        //store the correct index for the areaLibrary
        chosenIndex = currentIndex;

        //Break the loop early
        currentIndex = (areaLibrary.length + 1);
      break;
      case false:
        //console.log("character didn't match");
        currentIndex++;
      break;
      default:
        console.log("retrieve char WHILE error...");
    }
  }
  //console.log("Chosen areaLibrary Index: "+chosenIndex);

  //Save these for later in case the current area needs to be quickly referenced (i.e. INSPECT);
  playerCurrentTileIndex = chosenIndex;
  playerCurrentTile = areaLibrary[chosenIndex].char;

  //Grab the name of the Area -- And grab the subTitle of the area and pass it to the output.
  outputToOverworld(areaLibrary[chosenIndex].name, areaLibrary[chosenIndex].subName);
  //Grab the exposition from that same area and pass it to the output.
  outputToExpose(areaLibrary[chosenIndex].areaEXP);
  //Pass the name of the array that we want and the specific INDEX We want
  provideChoices("playerGlobalChoices", 0);

  //Update the Hover choice count.
  currentNumberOfChoices = playerGlobalChoices[0].legalChoices.length;
} 

let playerTravel = () => {
  //Include this to ensure anims play correctly.
  toggleTypeAnim();
  outputToOverworld(expositionArray[0].name, expositionArray[0].subName);
  //Grab the travel exposition.
  outputToExpose(expositionArray[0].EXP);
  //Provide the standard travel choices (& set valid inputs/buttons)
  provideChoices("playerGlobalChoices", 1);

  //Update the Hover choice count.
  currentNumberOfChoices = playerGlobalChoices[1].legalChoices.length;

  //Check to See if the player is near map boundaries. Do this NOW to set up input check!
  let playerArrayX = playerX + playerPositionOffsetX;
  let playerArrayY = (-1*playerY) + playerPositionOffsetY;

  console.log("playerArrayX (adj): ", playerArrayX);
  console.log("playerArrayY (adj): ", playerArrayY);

  if(playerArrayX == 0){
    //disable the move west button.
    console.log("disabled move west.");
    disableButtons(["leftControl"]);
    setTheseInputsAsValid(["forwardControl","rightControl","backwardControl"]);
  }
  if(playerArrayX == (mapWidth - 1)){
    //disable the move east button.
    console.log("disabled move east.");
    disableButtons(["rightControl"]);
    setTheseInputsAsValid(["forwardControl","backwardControl","leftControl"]);
  }
  if(playerArrayY == 0){
    //disable the move north button.
    console.log("disabled move north.");
    disableButtons(["forwardControl"]);
    setTheseInputsAsValid(["rightControl","backwardControl","leftControl"]);
  }
  if(playerArrayY == (mapHeight - 1)){
    //disable the move south button.
    console.log("disabled move south.");
    disableButtons(["backwardControl"]);
    setTheseInputsAsValid(["forwardControl","rightControl","leftControl"]);
  }

  console.log(playerArrayX + "," + playerArrayY);
}

let movePlayer = (input) => {
  //This will actually update the player coordinates.

  console.log("movePlayer Input: ", input);

  //USES CARTESIAN COORD. SYSTEM!
  switch (input){
    case "forwardControl":
      playerY += 1;
      break;
    case "rightControl":
      playerX += 1;
      break;
    case "backwardControl":
      playerY -= 1;
      break;
    case "leftControl":
      playerX -= 1;
      break;
  }

  console.log("playerX, playerY: ", playerX+","+playerY);
}
//===========================================================================

//========================== GAME 'MODE' FUNCTIONS ==============================

//Great example of a single turn function. Anim update,
let inspectThis = () => {
  console.log("INSPECTING...");

  //Include this to ensure anims play correctly.
  toggleTypeAnim();
  //Grab the name of the Area -- And grab the subTitle of the area and pass it to the output.
  outputToOverworld(areaLibrary[playerCurrentTileIndex].name, areaLibrary[playerCurrentTileIndex].subName);
  //Grab the exposition from that same area and pass it to the output.
  outputToExpose(areaLibrary[playerCurrentTileIndex].inspectEXP);
  //Pass the name of the array that we want and the specific INDEX We want
  provideChoices("playerGlobalChoices", 2);

  //Update the Hover choice count.
  currentNumberOfChoices = playerGlobalChoices[2].legalChoices.length;

}

let surveyTheLand = () => {
  console.log("SURVEYING...")

  //Reset the terrain array in case the player has moved and thus the survey results are now different.
  expositionArray[1].EXP = [];

  //Get the ARRAY position to check how far we can go in each direction.
  let playerArrayX = playerX + playerPositionOffsetX;
  let playerArrayY = (-1*playerY) + playerPositionOffsetY;

  /*
  //Distance to '0' on the mapHeight Column index.
  let surveyViewNorth = playerArrayY;
  //Distance to '0' on the mapWidth index.
  let surveyViewWest = playerArrayX;
  //Total width subtract the array position, subtract 1 to adjust for 0-base.
  let surveyViewEast = (mapWidth - playerArrayX) -1;
  //Total height subtract the array position, subtract 1 to adjust for 0-base.
  let surveyViewSouth = (mapHeight - playerArrayY) -1;
  */


  let tilesNorth = [];
  let tilesWest = [];
  let tilesEast = [];
  let tilesSouth = [];

  for(i=(playerArrayY-1); i >= 0; i--){
    tilesNorth.push(mapArray[playerArrayX][i]);
  }
  for(i=(playerArrayX-1); i >= 0; i--){
    tilesWest.push(mapArray[i][playerArrayY]);
  }
  for(i=(playerArrayX+1); i<mapWidth; i++){
    tilesEast.push(mapArray[i][playerArrayY]);
  }
  for(i=(playerArrayY+1); i<mapHeight; i++){
    tilesSouth.push(mapArray[playerArrayX][i]);
  }

  let northernTerrain = mostFreqStr(tilesNorth);
  let westernTerrain = mostFreqStr(tilesWest);
  let easternTerrain = mostFreqStr(tilesEast);
  let southernTerrain = mostFreqStr(tilesSouth);

  //For finding the index of each character we have in the areaLibrary array.
  let cardinalDirection = [northernTerrain, westernTerrain, easternTerrain,southernTerrain];
  let areaCharIndexMap = [];

  //Grab the character at index 0 of areaLibrary, and put here. Repeat for each char available. Because the for loop starts at 0,
  // the indexes are in the SAME order as the area library.
  for(i=0; i < areaLibrary.length; i++){
    areaCharIndexMap.push(areaLibrary[i].char);
  }

  //Meaning we can now match the character we have for each direction with the index in the match array, and it will mirror the char's actual position.
  let northernIndex = areaCharIndexMap.indexOf(cardinalDirection[0]);
  let westernIndex = areaCharIndexMap.indexOf(cardinalDirection[1]);
  let easternIndex = areaCharIndexMap.indexOf(cardinalDirection[2]);
  let southernIndex = areaCharIndexMap.indexOf(cardinalDirection[3]);

  //Assign the name for that match to the variables.
  let northernName = areaLibrary[northernIndex].name;
  let westernName = areaLibrary[westernIndex].name;
  let easternName = areaLibrary[easternIndex].name;
  let southernName = areaLibrary[southernIndex].name;

  //Add those 'name descriptions' to a specific array in expositionArray purposely for this function.
  expositionArray[1].EXP.push("NORTH: "+northernName,"WEST: "+westernName,"EAST: "+easternName,"SOUTH: "+southernName);

  //Include this to ensure anims play correctly.
  toggleTypeAnim();

  //Grab the expositionArray stuff for this function: the title update, expose, and next choice.
  outputToOverworld(expositionArray[1].name, expositionArray[1].subName);
  //Output the terrain names we just grabbed earlier in this function.
  outputToExpose(expositionArray[1].EXP);
  //Provide only the 'next' choice, to give the player a chance to read.
  provideChoices("playerGlobalChoices", 2);

  //Update the Hover choice count.
  currentNumberOfChoices = playerGlobalChoices[2].legalChoices.length;
}

//For finding the most common string in the cardinal tiles Arrays.
function mostFreqStr(arr) {
  var obj = {}, mostFreq = 0, which = [];

  arr.forEach(ea => {
    if (!obj[ea]) {
      obj[ea] = 1;
    } else {
      obj[ea]++;
    }

    if (obj[ea] > mostFreq) {
      mostFreq = obj[ea];
      which = [ea];
    } else if (obj[ea] === mostFreq) {
      which.push(ea);
    }
  });

  //Return the first most common
  return which[0];
}

let makeCamp = () => {
  console.log("CAMPING");

  console.log(playerCurrentTile);
  console.log(playerCurrentTileIndex);

  //Update the players health
  player.playerHealth = player.playerHealth + (areaLibrary[playerCurrentTileIndex].campValues[1]);
  updateStatMenu();

  //Include this to ensure anims play correctly.
  toggleTypeAnim();
  //Grab the name of the Area -- And grab the subTitle of the area and pass it to the output.
  outputToOverworld(areaLibrary[playerCurrentTileIndex].campName, areaLibrary[playerCurrentTileIndex].campSubName);
  //Grab the exposition from that same area and pass it to the output.
  outputToExpose(areaLibrary[playerCurrentTileIndex].campEXP);
  //Pass the name of the array that we want and the specific INDEX We want
  provideChoices("playerGlobalChoices", 3);

  //Update the Hover choice count.
  currentNumberOfChoices = playerGlobalChoices[3].legalChoices.length;
}

/*
player = {
  playerName: "Zorus",
  playerATK: 3,
  playerDEF: 5,
  playerHealth: 10,
  playerAgility: 7,
  playerAttack1EXP: ["You strike quickly with your blade!"]
};

let enemies = [
  {
    name: "Corrupted Skeleton",
    type: "Undead",
    enemyHealth: 5,
    enemyAgility: 6,
    enemyATK: 2,
    enemyDEF: 4,
    enemyAttack1EXP: ["The skeleton lurches forward with a rusty knife!"]
  }
];
*/

//COMBAT ============
//Pick the enemy
let decideEnemy = () => {
  //Make a function that provides a number based on the terrain, dungeon, weather, etc.
};
//"Pokemon grass music!!""
let enterCombat = () => {
  console.log("ENTERING COMBAT");

  //Include this to ensure anims play correctly.
  toggleTypeAnim();
  //Grab the name of the Area -- And grab the subTitle of the area and pass it to the output.
  outputToOverworld(expositionArray[2].name, expositionArray[playerCurrentTileIndex].subName);
  //Grab the exposition from that same area and pass it to the output.
  outputToExpose([expositionArray[2].EXP,enemies[0].name]);
  //Pass the name of the array that we want and the specific INDEX We want
  provideChoices("playerGlobalChoices", 4);

  //Update the Hover choice count.
  currentNumberOfChoices = playerGlobalChoices[4].legalChoices.length;
};
//"Communicate to the player who goes first."
let calculateFirstMove = () => {
  if(player.playerAgility > enemies[0].enemyAgility){

    //Include this to ensure anims play correctly.
    toggleTypeAnim();
    //Grab the name of the Area -- And grab the subTitle of the area and pass it to the output.
    outputToOverworld(combatExposition[2].name, combatExposition[2].subName);
    //Grab the exposition from that same area and pass it to the output.
    outputToExpose(combatExposition[2].EXP);
    //Pass the name of the array that we want and the specific INDEX We want
    provideChoices("playerGlobalChoices", 4);

    //Update the Hover choice count.
    currentNumberOfChoices = playerGlobalChoices[4].legalChoices.length;

    return 1;
  }

  //Include this to ensure anims play correctly.
  toggleTypeAnim();
  //Grab the name of the Area -- And grab the subTitle of the area and pass it to the output.
  outputToOverworld(combatExposition[1].name, combatExposition[1].subName);
  //Grab the exposition from that same area and pass it to the output.
  outputToExpose(combatExposition[1].EXP);
  //Pass the name of the array that we want and the specific INDEX We want
  provideChoices("playerGlobalChoices", 4);

  //Update the Hover choice count.
  currentNumberOfChoices = playerGlobalChoices[4].legalChoices.length;

  return 3;
};
//Player decision screen.
let playerCombatDecision = () => {
  //Include this to ensure anims play correctly.
  toggleTypeAnim();
  //Grab the name of the Area -- And grab the subTitle of the area and pass it to the output.
  outputToOverworld(combatExposition[0].name, combatExposition[0].subName);
  //Grab the exposition from that same area and pass it to the output.
  outputToExpose(combatExposition[0].EXP);
  //Pass the name of the array that we want and the specific INDEX We want
  provideChoices("playerGlobalChoices", 5);

  //Update the Hover choice count.
  currentNumberOfChoices = playerGlobalChoices[5].legalChoices.length;
}
//If the player chose to attack, heres how that goes...
let playerAttackResults = () => {
  //Include this to ensure anims play correctly.
  toggleTypeAnim();
  //Grab the name of the Area -- And grab the subTitle of the area and pass it to the output.
  outputToOverworld(combatExposition[3].name, combatExposition[3].subName);
  //Grab the exposition from that same area and pass it to the output.
  outputToExpose(combatExposition[3].EXP);
  //Pass the name of the array that we want and the specific INDEX We want
  provideChoices("playerGlobalChoices", 4);

  //Update the Hover choice count.
  currentNumberOfChoices = playerGlobalChoices[4].legalChoices.length;
}
//If the player chose to defend, heres how that goes...
let playerDefendResults = () => {
  //Include this to ensure anims play correctly.
  toggleTypeAnim();
  //Grab the name of the Area -- And grab the subTitle of the area and pass it to the output.
  outputToOverworld(combatExposition[4].name, combatExposition[4].subName);
  //Grab the exposition from that same area and pass it to the output.
  outputToExpose(combatExposition[4].EXP);
  //Pass the name of the array that we want and the specific INDEX We want
  provideChoices("playerGlobalChoices", 4);

  //Update the Hover choice count.
  currentNumberOfChoices = playerGlobalChoices[4].legalChoices.length;
}
//Decide what the enemy 'AI' will do.
let decideEnemyAction = () => {
  //Generate a random number from 1 to 2.
  let enemyDecision = Math.floor((Math.random() * 2) + 1);

  return enemyDecision;
}
//What happens to the player as a result of enemy attacking.
let enemyAttackResults = () => {
  //Include this to ensure anims play correctly.
  toggleTypeAnim();
  //Grab the name of the Area -- And grab the subTitle of the area and pass it to the output.
  outputToOverworld(enemies[0].name+combatExposition[5].name, combatExposition[5].subName);
  //Grab the exposition from that same area and pass it to the output.
  outputToExpose(enemies[0].enemyAttack1EXP);
  //Pass the name of the array that we want and the specific INDEX We want
  provideChoices("playerGlobalChoices", 4);

  //Update the Hover choice count.
  currentNumberOfChoices = playerGlobalChoices[4].legalChoices.length;
}
//Communicate to the player that the enemy is defending.
let enemyDefendResults = () => {
  //Include this to ensure anims play correctly.
  toggleTypeAnim();
  //Grab the name of the Area -- And grab the subTitle of the area and pass it to the output.
  outputToOverworld(enemies[0].name+combatExposition[6].name, combatExposition[6].subName);
  //Grab the exposition from that same area and pass it to the output.
  outputToExpose(enemies[0].enemyDefend1EXP);
  //Pass the name of the array that we want and the specific INDEX We want
  provideChoices("playerGlobalChoices", 4);

  //Update the Hover choice count.
  currentNumberOfChoices = playerGlobalChoices[4].legalChoices.length;
}
//We may need an 'interval' function that calculates INDIRECT damage to player or enemy (like poison, etc.)

let updatePreCombatValues = () => {
  //For terrain advantages, debuffs, buffs, etc.
}

let calculatePhysicalDamage = (whatEntity, entityIndex) => {
  //This is the damage algorithm.
  let character = whatEntity;
  let enemiesIndex = entityIndex;
  let damage = 0;

  if(character == player.playerName){
    damage = (1 + (player.playerDexterity / 100)) * (player.playerStrength + (player.playerBalance / 2));
  } else if(character !== player.playerName){
    damage = (1 + (enemies[enemiesIndex].enemyDexterity / 100)) * (enemies[enemiesIndex].enemyStrength + (enemies[enemiesIndex].enemyBalance / 2));
  } else {
    console.log("[X] FATAL ERROR IN PHYSICAL DAMAGE CALCULATION")
  }

  //Round to nearest whole number. Negative rounds to 0. X.49 rounds down, X.5 rounds up!
  damage = Math.round(damage);
  return damage;
}

let updateCombatValues = (whatEntity, entityIndex, whatStats, valueChanges) => {
  //expecting (string, Int, ARRAY, ARRAY)
  //...(enemies[0].name, 0, ["enemyHealth", ... , "whatever"], [-3, ... , 2])
  let character = whatEntity;
  let enemiesIndex = entityIndex;
  let statsMap = whatStats;
  let howValuesChange = valueChanges;

  console.log(character, " , ",enemiesIndex, " , ",statsMap, " , ",howValuesChange)
  
  if(character == player.playerName){
    for (i=0; i<statsMap.length; i++){
      let property = statsMap[i];
      player[property] += howValuesChange[i];
    }
  } else if(character !== player.playerName){
    for (i=0; i<statsMap.length; i++){
      //set 'enemyHealth' etc. in variable.
      let property = statsMap[i];
      //use bracket notation to dynamically access property.
      enemies[enemiesIndex][property] += howValuesChange[i];
      
      console.log("Changing stats: ", enemies[enemiesIndex][property]);
      console.log("How values change: ", howValuesChange[i])
    }
  } else {
    console.log("[X] FATAL ERROR IN UPDATING COMBAT VALUES.")
  }

  console.log(character, " , ",enemies[0].enemyHealth);
}
//===================

//ITEM FUNCTION

//===========================================================================

//============================ CORE ENGINE ==================================

let updateGameClock = () => {
  //Control The Game Clock here. 0 to pass without moving, 1 to update +=1?
  
  //Preserve the previous time for comparison.
  previousClockState = gameClock;

  //increment the game clock.
  gameClock += 1;
  console.log("[GAME CLOCK]: (+1) = ", gameClock);
}

let grabID = (event) => {
  console.log(event);
}

function onClickLogic(event) {
  //DEFEND BUTTON
  document.getElementById("defendControl").onclick = function() {
    console.log("\n \n \n");
    grabID(this.id + "clicked");
    mistressOfTurns("defendControl");
  };

  //FORWARD BUTTON
  document.getElementById("forwardControl").onclick = function() {
    console.log("\n \n \n");
    console.log("forwardControl Clicked");
    mistressOfTurns("forwardControl");
  };

  //ATTACK BUTTON
  document.getElementById("attackControl").onclick = function() {
    console.log("\n \n \n");
    grabID(this.id + " clicked");
    mistressOfTurns("attackControl");
  };

  //LEFT BUTTON
  document.getElementById("leftControl").onclick = function() {
    console.log("\n \n \n");
    grabID(this.id + " clicked");
    mistressOfTurns("leftControl");
  };

  //RIGHT BUTTON
  document.getElementById("rightControl").onclick = function() {
    console.log("\n \n \n");
    grabID(this.id + " clicked");
    mistressOfTurns("rightControl");
  };

  //BACKWARD BUTTON
  document.getElementById("backwardControl").onclick = function() {
    console.log("\n \n \n");
    grabID(this.id + " clicked");
    mistressOfTurns("backwardControl");
  };

  //ITEM BUTTON
  document.getElementById("itemControl").onclick = function() {
    console.log("\n \n \n");
    grabID(this.id + " clicked");
    mistressOfTurns("itemControl");
  };

  //INSPECT BUTTON
  document.getElementById("inspectControl").onclick = function() {
    console.log("\n \n \n");
    grabID(this.id + " clicked");
    mistressOfTurns("inspectControl");
  };

  //HELP BUTTON
  document.getElementById("helpControl").onclick = function() {
    console.log("\n \n \n");
    grabID(this.id + " clicked");
    mistressOfTurns("helpControl");
  };

  //NEXT BUTTON
  document.getElementById("nextControl").onclick = function() {
    console.log("\n \n \n");
    grabID(this.id + " clicked");
    mistressOfTurns("nextControl");
  };
}

//A play on "the goddess of time".
let mistressOfTurns = (playerInput) => {

  console.log("========================");
  console.log(" TURN: " + gameClock);
  //console.log("[validInputs[]: ",validInputs);

  if(validInputs.includes(playerInput) && (gameClock > previousClockState)){

    setTimeout(function(){
      

      //The MASTER Switch Statement
    switch (gameModeCheck){
      default:
        console.log("[X]: FATAL ERROR IN gameModeCheck! MoT.")
      //Main map actions.
      case "overworld":
        switch(playerInput){
          case "forwardControl":
            //CHECK IF canMove.
            //Y: GAME EXPOSITION FOR TRAVELLING.
            //N: GAME EXPOSITION FOR BEING UNABLE TO TRAVEL.
            console.log("You decide to travel.");
            //check for map boundary and disable buttons if needed.
            playerTravel();
            //set check for next input.
            gameModeCheck = "travel";
            //update the game clock so next turn can proceed
            updateGameClock();
            return;
            break;
          case "rightControl":
            //GET THE VISIBILITY VALUE FROM THE AREA.
            //CALCULATE THE AVG TILE, IF NO AVG TILE RETURN CLOSEST TILE.
            //DO FOR EACH CARDINAL DIRECTION.
            //MAKE SURE THERE ARE TILES AVAILABLE - compensate for map edge.
            console.log("You survey the land.");
            surveyTheLand();
            updateGameClock();
            return;
            break;
          case "backwardControl":
            //RUN THE CAMP FUNCTION USING THE VALUES OF THAT AREA.
            //LATER CAN ADD BONUSES BASED ON ITEMS IN INVENTORY +Health:meat, +Mana:softmat, +Stamina:cot, etc.
            console.log("You set up camp here.");
            makeCamp();
            gameModeCheck = "camping";
            updateGameClock();
            return;
            break;
          case "itemControl":
            //CHECK FOR ITEM USE
            //Y: USE ITEM FUNCTION, GAME EXPOSITION.
            //N: GAME EXPOSITION FOR NO.
            console.log("You use an item from your pack.");
            return;
            break;
          case "inspectControl":
            inspectThis();
            gameModeCheck = "inspecting";
            updateGameClock();
            return;
            break;
          default: 
            console.log("[X] FATAL ERROR - MoT: Overworld Choices!");
        }
    
      //The Travel Menu of the overworld.
      case "travel":
          switch(playerInput){
            case "forwardControl":
              console.log("You travel to the north.");
              gameModeCheck = "enterCombat";
              movePlayer(playerInput);
              getPlayerLocation();
              updateGameClock();
              return;
              break;
            case "rightControl":
              console.log("You travel to the east.");
              gameModeCheck = "overworld";
              movePlayer(playerInput);
              getPlayerLocation();
              updateGameClock();
              return;
              break;
            case "backwardControl":
              console.log("You travel south.");
              gameModeCheck = "overworld";
              movePlayer(playerInput);
              getPlayerLocation();
              
              updateGameClock();
              return;
              break;
            case "leftControl":
              console.log("You travel west.");
              //set game check for next turn back to map.
              gameModeCheck = "overworld";
              //moves player and updates coordinates
              movePlayer(playerInput);
              //re-update the screen with the new area.
              getPlayerLocation();
              //update game clock for next turn.
              updateGameClock();
              return;
              break;
            default: 
              console.log("[X] FATAL ERROR - MoT: Travel Choices!");
          }
      case "inspecting":
        getPlayerLocation();
        gameModeCheck = "overworld";
        updateGameClock();
        return;
        break;
      case "camping":
        getPlayerLocation();
        gameModeCheck = "overworld";
        updateGameClock();
        return;
        break;







      case "enterCombat":
        console.log("MoT: Combat entered...")
        enterCombat();
        gameModeCheck = "calculateFirstMove";
        updateGameClock();
        return;
        break;
      case "calculateFirstMove":
        console.log("MoT: Combat entered...")
        //Update the combat phase to the correct 'Turn 1'.
        combatPhase = calculateFirstMove();
        //Set the combat condition so the game goes there next.
        gameModeCheck = "combat";
        updateGameClock();
        return;
        break;









      case "combat":
        switch (combatPhase){
          case 1:
            console.log("Its the players DECISION turn");
            playerCombatDecision();
            //Set the combat phase for the next turn.
            combatPhase = 2;
            updateGameClock();
            return;
            break;
          case 2:
            console.log("Its the players RESULTS turn")

            switch(playerInput){
              case "attackControl":
                let damage = calculatePhysicalDamage(player.playerName, 0);
                console.log("PLAYER DAMAGE: ", damage);
                updateCombatValues(enemies[0].name, 0, ["enemyHealth"],[-damage]);
                playerAttackResults();
                break;
              case "defendControl":
                //player defend SETUP! WILL HAVE TO APPLY THIS ON NEXT ENEMY ATTACK!
                playerDefendResults();
                break;
              default:
                console.log("[X] Fatal Error in Player Combat RESULTS");
            }

            //Enemy Death Check. Slightly different because the game must continue after enemy dies.
            if(enemies[0].enemyHealth <= 0){
                combatPhase = 0;
                console.log("The enemy has been slain!");
                gameModeCheck = "overworld";
                updateGameClock();
                return;
            } else if(enemies[0].enemyHealth > 0) {
              combatPhase = 1;
                console.log("Enemy survived, combat continues!");
                gameModeCheck = "combat";
                combatPhase = 3;
                updateGameClock();
            } else {
              console.log("error in enemy death check MoT");
            }
            console.log("ENEMY ENDING HEALTH: ", enemies[0].enemyHealth);

            

            updateGameClock();
            
            return;
            break;
          case 3:
            console.log("Its the enemies DECISION event");
            //Calculate some stuff here for the enemy to do.
            enemyTurnControl = decideEnemyAction();
            updateGameClock();
            console.log("Its the enemies RESULTS phase")
            
            switch (enemyTurnControl){
              case 1:
                let damage = calculatePhysicalDamage(enemies[0].name, 0);
                console.log("ENEMY DAMAGE: ", damage);
                updateCombatValues(player.playerName, 0, ["playerHealth"],[-damage]);
                enemyAttackResults();
                updateStatMenu();
                break;
              case 2:
                enemyDefendResults();
                break;
            }

            //Player Death Check.
            if(player.playerHealth <= 0){
              combatPhase = 0;
                alert("YOU HAVE DIED!")
                gameModeCheck = "new game";
                gameOver();
            } else if(player.playerHealth > 0) {
              combatPhase = 3;
                console.log("You survived, combat continues!")
                gameModeCheck = "combat";
            } else {
              console.log("error in player death check MoT");
            }

            combatPhase = 1;
            updateGameClock();
            return;
            break;
          default:
            console.log("[X] FATAL ERROR IN COMBAT TURN LOGIC!")
        }


      //MASTER SWITCH CLOSE  
      }
    }, 500);
    
    } else {
      //The FIRST undefined will be passed because of the initial call of MoT in gamePipeline();
      console.log("ILLEGAL INPUT: "+playerInput);
      updateGameClock();
    }
    

}

let gameOver = () => {
  //Include this to ensure anims play correctly.
  toggleTypeAnim();
  //Grab the name of the Area -- And grab the subTitle of the area and pass it to the output.
  outputToOverworld(expositionArray[3].name, expositionArray[3].subName);
  //Grab the exposition from that same area and pass it to the output.
  outputToExpose(expositionArray[3].EXP);
  //Pass the name of the array that we want and the specific INDEX We want
  provideChoices("playerGlobalChoices", 6);

  //Update the Hover choice count.
  currentNumberOfChoices = playerGlobalChoices[6].legalChoices.length;
}



let gamePipeline = () => {
  //The main game pipeline to keep the order of events flowing properly.
  
  //Initialize the onclick listeners.
  onClickLogic();
  //Initialize the Burger Menus
  attachBurgerMenus();
  //Reset the UI
  resetUI();
  //Update The stats for start of game
  updateStatMenu();
  
  getPlayerLocation();
  mistressOfTurns();
}
//==========================================================================


//=========================== SETUP =======================================
//turn "0" => start the game.
gamePipeline();