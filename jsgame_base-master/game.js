// our javascript code

/****************************************************
 *** Variables ***
 ****************************************************/

// important HTML blocks
let container = document.querySelector("#game");
let player = document.querySelector("#player");
let ground = document.querySelector("#ground");
let enemies = document.querySelector("#enemies");
let gover = document.querySelector("#gover");

// some parameters
// minimal margin to the bottom (in pixels)
let marginBottom = 100;
// plane jump speed (in seconds)
let jumpSpeed = 0.5;
// how much height is a jump (in pixels)
let jumpStep = 100;

// how long is a fall (in seconds)
let fallSpeed = 2;
// how much time after a jump do we fall (in milliseconds)
let timeToFallAfterJump = 400;

// delay between two enemies motion (in milliseconds)
let motionDelay = 5;

// motion distance at each step (in pixels)
let motionStep = 4;

// other variables
let spawn, motion, playerGravity;

let musicGame;
musicGame = new Audio("alien.mp3");



/****************************************************
 *** When game starts ***
 ****************************************************/


// enemy motion

let gameOver = document.querySelector(".button");

document.addEventListener("click", function() {
  start();
})

function suprim_new_div() {
  referent.removeChild(eagle);
  } 

function suppr(elt)
{
    elt.parentNode.removeChild(elt);
}

musicGame.play();
musicGame.loop = true;

function start()
{
  musicGame.play();
  spawnEnemy();
  suppr(enemies);
  setInterval(motion);
  setInterval(spawn);
  player.style.display = "block";
  enemies.style.display = "block";
  gover.style.display = "none";
  intervalID = window.setInterval(spawnEnemy, 1700);
  player.style.bottom = marginBottom + "px";
};

motion = setInterval(function () {
  document.querySelectorAll("#enemies > .eagle").forEach(function (div) {
    move(div);
  });
}, motionDelay);

document.addEventListener('keydown', event => {
  if (event.keyCode == 32) {
    jump();
    return;
  }
});

intervalID = window.setInterval(spawnEnemy, 1700);






// player gravity
// make the player fall
// change the player bottom margin
// 'px' is the unit (=pixels)
// thanks to the CSS 'transition' rule,
// the fall is progressive
player.style.bottom = marginBottom + "px";

// invoke an enemy
spawnEnemy();

/****************************************************
 *** Functions ***
 ****************************************************/


// make the player jump
function jump() {
  // if we are on the top, don't jump anymore
  if (player.offsetTop < 50) return;

  // set the jump duration
  // as we use the CSS animation
  player.style.transition = jumpSpeed + "s";
  // the CSS animation is described in the 'fallingPlayer' class
  player.classList.remove("fallingPlayer");

  // if we jump, we stop the gravity fall
  clearInterval(playerGravity);

  // and then update the player position
  let offsetBottom =
    container.offsetHeight - (player.offsetTop + player.offsetHeight);
  player.style.bottom = offsetBottom + jumpStep + "px";

  // after we have jumped, we fall again (gravity)
  setGravity();
}



// make the player fall after a jump
function setGravity() {
  playerGravity = setTimeout(function () {
    player.style.transition = fallSpeed + "s";
    player.style.bottom = marginBottom + "px";
  }, timeToFallAfterJump);
}

function getPosition(div) {
  let left = div.offsetLeft;
  let top = div.offsetTop;
  let right = div.offsetLeft + div.offsetWidth;
  let bottom = div.offsetTop + div.offsetHeight;

  // the '10' here is to allow some tolerance in the collision
  return [left + 10, right - 10, top + 10, bottom - 10];
}

// check if there is a collision between two blocks
function isCollision(bloc1, bloc2) {
  return !(
    bloc1[1] < bloc2[0] ||
    bloc1[0] > bloc2[1] ||
    bloc1[3] < bloc2[2] ||
    bloc1[2] > bloc2[3]
  );
}

// spawn a new enemy HTML block
function spawnEnemy() {
  let newObstacle = document.createElement("div");
  newObstacle.classList.add("eagle");
  newObstacle.style.bottom = marginBottom + "px";
  enemies.appendChild(newObstacle);
}


// move an enemy
// this function is called for each enemy step
// see the setInterval above
function move(div) {
  div
  div.style.left = div.offsetLeft - motionStep + "px";

  div.style.left == (div.style.left - 1);

  console.log(div.style.left);

  if (div.offsetLeft <= 0) div.remove();

  posPlayer = getPosition(player);
  posObs = getPosition(div);

  if (isCollision(posPlayer, posObs)) stopAll();
}

gover.style.display = "none";

// allow to stop the game
function stopAll() {
  // hide the player
  player.style.display = "none";
  enemies.style.display = "none";
  gover.style.display = "block";

  // stop the enemies motion
  clearInterval(motion);

  // stop to spawn new enemies
  clearInterval(spawn);
  musicGame.pause();

}

