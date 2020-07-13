console.log("[script.js]:: Attached correctly")

testTheConsole = () => {
  document.getElementById("descriptorWindow").innerHTML = "Bones";
}

document.addEventListener('keydown', function(event) {
  checkInput(event);
});

function checkInput(event) {
  if (event == 37) {
    document.getElementById("flavor1Window").innerHTML = "Your are standing in a field of grass.";
    document.getElementById("flavor2Window").innerHTML = "A calming breeze rustles your hair.";
    document.getElementById("playerChoicesWindow").innerHTML = "[1]: LEFT >> walk to the west. [2] RIGHT >> walk to the east.";
    return event;
  } else if (event == 39)
    document.getElementById("flavor1Window").innerHTML = "You discover a forest.";
    document.getElementById("flavor2Window").innerHTML = "A sense of dread creeps over you.";
    document.getElementById("playerChoicesWindow").innerHTML = "[1]: LEFT >> walk to the west. [2] RIGHT >> walk to the east.";
    return event;
};



dummyGame = () =>{

  document.getElementById("descriptorWindow").innerHTML = "Overworld";
  document.getElementById("flavor1Window").innerHTML = "You discover a camp.";
  document.getElementById("flavor2Window").innerHTML = "The sound of laughter fills you with ease.";
  document.getElementById("playerChoicesWindow").innerHTML = "[1]: LEFT >> walk to the west. [2] RIGHT >> walk to the east.";

  returnedCode = checkInput();

  console.log("returnedCode");
  console.log("game is over");
}

dummyGame();