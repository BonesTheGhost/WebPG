console.log("[app.js]:: Attached and working!");

const output = (variable, explanation, variableReturn) =>{
  console.log("["+variable+"]:: "+explanation+" == "+variableReturn);
}

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

//COMBAT Branch Checks
let inCombat = false;
let canAttack = false;
let canDefend = true;


//Timer Control Variable (milliseconds)
let globalWaitTimer = 100000;

// *** GAME DATA *** => Will probably need to add things from the Map Tool!!!

mapArray = [[00###],[00###],[000XX],[000XX],[000XX]];
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
//============================================================================

