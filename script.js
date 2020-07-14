console.log("[script.js]:: Attached correctly")

//============ VARIABLES ============================================

//The core game loop. This keeps time moving in one direction.
let gameTime = 0;
//this corresponds to the arrays index for areas. Helps to keep track of where the player is on the map.
let areaLocationId = 0;

let playerX = 0;
let playerY = 0;
let playerZ = 0;

//The value that triggers whether to activate the combat branch.
let combatYES = 0;

//===================================================================
//============= LIBRARIES ===========================================

let helpText = [
  {
    page1: "Hello and welcome to WebPG! This game is in ALPHA currently so there will be issues!",
    page2: "Thank you for your patience, I hope you like what you see! :)"
  }
];

//An array of objects than contain geographical information.
let areas = [
  {
    area: "Grassy Plains",
    xLeftBound: -3,
    xRightBound: 3,
    yForwardBound: 3,
    yBackwardBound: -3,
    flavor1: "There is soft grass beneath your feet.",
    flavor2: "A gentle breeze waves through the subtle curves of this land.",
  },
  {
    area: "Wasteland",
    xLeftBound: -10,
    xRightBound: -4,
    yForwardBound: 5,
    yBackwardBound: -5,
    flavor1: "There is soft grass beneath your feet.",
    flavor2: "A gentle breeze waves through the subtle curves of this land.",
  }

];
//===================================================================

//============ ONCLICK LISTENERS FOR SOFTWARE BUTTONS ===============
//Grab the onclick event and pass the id of the element clicked.
document.getElementById("defend-button").onclick = function() {
  handoffInput(this.id)
}
document.getElementById("forward-button").onclick = function() {
  handoffInput(this.id)
}
document.getElementById("attack-button").onclick = function() {
  handoffInput(this.id)
}
document.getElementById("left-button").onclick = function() {
  handoffInput(this.id)
}
document.getElementById("inspect-button").onclick = function() {
  handoffInput(this.id)
}
document.getElementById("right-button").onclick = function() {
  handoffInput(this.id)
}
document.getElementById("help-button").onclick = function() {
  handoffInput(this.id)
}
document.getElementById("backward-button").onclick = function() {
  handoffInput(this.id)
}
document.getElementById("item-button").onclick = function() {
  handoffInput(this.id)
}
//===================================================================



function handoffInput(event) {

  //Format Console for better readability
  console.log("\n \n \n");
  console.log("==========================");
  console.log("[Mouse Event]: ", event);
  
  gameTime++
  console.log("[GAMECOUNTER]:: ", gameTime);

  switch(event) {
    case "defend-button":
      console.log("DEFEND");
      break
    case "forward-button":
      console.log("Forward");
      playerY += 1;
      break
    case "attack-button":
      console.log("Attack");
      break
    case "left-button":
      console.log("Left");
      playerX -= 1;
      break
    case "inspect-button":
      console.log("INSPECT");
      break
    case "right-button":
      console.log("Right");
      playerX += 1;
      break
    case "help-button":
      console.log("HELP");
      break
    case "backward-button":
      console.log("Backward");
      playerY -= 1;
      break
    case "item-button":
      console.log("ITEM");
      break
  }

  checkPosition();
}

function checkPosition(){

  switch(playerX, playerY) {
    case (-3<playerX<3) && (-3<playerY<3):
      areaLocationId = 0;
      console.log("[checkPosition()]:: 0 switch case triggered.")
      break
    case (-10<playerX<-4) && (-5<playerY<5):
      areaLocationId = 1;
      console.log("[checkPosition()]:: 1 switch case triggered.")
      break
    default:
      console.log("[checkPosition()]:: default switch case triggered.")
  }

  updateConsole();
}

function updateConsole(){

  if(combatYES === true){
    //combat Function path
    console.log("combat");
  }

  switch(playerX, playerY) {
    case areaLocationId = 0:
      document.getElementById("descriptorWindow").innerHTML = areas[areaLocationId].area
      break
    case areaLocationId = 1:
      document.getElementById("descriptorWindow").innerHTML = areas[areaLocationId].area
      break
    default:
      console.log("[updateConsole()]:: default switch case triggered.")
  }

  console.log("[COORDS: X , Y ]:: ", playerX, playerY);
  console.log("==========================");

}



