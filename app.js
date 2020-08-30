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

attachBurgerMenus();
attachSettingsPanel();