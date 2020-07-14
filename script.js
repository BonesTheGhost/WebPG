console.log("[script.js]:: Attached correctly")

/*
let inspectButton = document.querySelector(".defend-button");
let inspectButton = document.querySelector(".forward-button");
let inspectButton = document.querySelector(".attack-button");

let inspectButton = document.querySelector(".left-button");
let inspectButton = document.querySelector(".inspect-button");
let inspectButton = document.querySelector(".right-button");

let inspectButton = document.querySelector(".help-button");
let inspectButton = document.querySelector(".backward-button");
let inspectButton = document.querySelector(".item-button");



showSomeText = (chosenButton) => {
  console.log(chosenButton);
}

inspectButton.onclick = showSomeText;
*/

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



function handoffInput(event) {
  console.log("[Mouse Event]: ", event);
}