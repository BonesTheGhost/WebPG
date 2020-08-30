console.log("[app.js]: Attached and working!")

//================= CSS Animation Script ===================

const burgerLeft = document.querySelector('.burger.left');
const burgerRight = document.querySelector('.burger.right');

const inventory = document.getElementById('inventorySidebar');
const stats = document.getElementById('statsSidebar');

const settingsButton = document.getElementById('settingsButton');
const settingsPanel = document.getElementById('settingsPanel');

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

let attachSettingsPanel = () => {
  settingsButton.addEventListener('click', ()=> {
    settingsPanel.classList.toggle('active');
  })
}

//==========================================================

attachBurgerMenus();
attachSettingsPanel();