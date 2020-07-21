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