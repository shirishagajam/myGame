/*
* Name: Kelly De Naples
* Course: VCDS225_01FA17
* Assignment: Final Project
* Project: http://alpha.editor.p5js.org/full/rkoZUPZGG
* Blog Post: 	https://kellydenaples.wordpress.com/2017/12/16/pop-final-project/
* Description: 
*		Pop! is a game where users use their mouse to pop bubbles on their screen. 
*		There are 3 levels: easy, moderate, and hard. The bubbles get smaller and
*		greater in quantity as the levels increase in difficulty. When your mouse
*		comes into contact with a bubble, it disappears with a "pop" sound.
*		When you complete a level, there is a button that lets you play again.
*  	The DrawCircle object is modified from week 05 example: an array of DrawCircle objects
 */

var circles = []; // array to hold DrawCircle objects
var easyB, moderateB, hardB, playAgain; // the buttons
var popped; // sound file
var chooseLevel, popLogo, blank; // images
var circleCount; // number of circles
var checkPop = false; // checks if mouse is inside bubble
var onceFirst = false; // makes sure logo pop sound plays only once
var once = false; // makes sure bubble pop sound plays only once per pop
var bubbleCounter = 0; // counts how many bubbles have been popped per level


function preload() {
  popped = loadSound("cartoonpop.wav"); // sound file
  popLogo = loadImage("Pop! Logo-01.png"); // pop! logo image
  chooseLevel = loadImage("chooseALevel-01.png"); // choose a level image
  blank = loadImage("blank-01.png"); // blank image
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  // easy button
  easyB = createButton("Easy");
  easyB.position(width / 4, height / 5 + 250);
  easyB.mousePressed(easyMode); // largest bubbles
  easyB.size(100, 50); 
  easyB.style("font-size", "25px");
	easyB.hide(); // hide buttons during first screen
  // moderate button
  moderateB = createButton("Moderate");
  moderateB.position(width / 2 - 43, height / 5 + 250);
  moderateB.mousePressed(moderateMode); // medium bubbles
  moderateB.size(130, 50); 
  moderateB.style("font-size", "25px");
  moderateB.hide(); // hide buttons during first screen
  // hard button
  hardB = createButton("Hard");
  hardB.position(width * (3 / 4) - 55, height / 5 + 250);
  hardB.mousePressed(hardMode); // smallest bubbles
  hardB.size(100, 50); 
  hardB.style("font-size", "25px");
  hardB.hide(); // hide buttons during first screen
  // playAgain button
  playAgain = createButton("PLAY AGAIN");
  playAgain.position(-200, -100); // hide buttons during first screen
  playAgain.size(160, 50); 
  playAgain.style("font-size", "25px");
  playAgain.mousePressed(gameReset); // press button to choose level and play again
}

function draw() {
  background(255);
  logoPop(); // click anywhere to make the logo disappear

  // iterate over the circles array and call the methods of the DrawCircle object
  for (var i = 0; i < circles.length; i++) {
    circles[i].display();
    circles[i].popSound();
  }
  // When the user pops all the bubbles - they win!
  if (bubbleCounter == circleCount) { // if all the bubbles are popped
    playAgain.position(width / 2 - 60, height / 2 - 5); // button now visible
    print("play again"); // press to play again
    bubbleCounter = 0; // reset bubble counter
  }
}

  function logoPop() { // Make the logo disappear by clicking anywhere
    image(popLogo, width / 2 + 10, height / 2); // displays logo image
    if (mouseIsPressed) {
      popLogo = chooseLevel; // replace "POP!" image with "choose a level" image
      easyB.show(); moderateB.show(); hardB.show(); // show the hidden buttons
      if (!onceFirst) { // Plays pop sound once.
        popped.play();
        onceFirst = true;
      }
    }
  }

  function easyMode() { // Draws all the circles for Easy level
    // hide buttons by moving them off screen
    easyB.position(-200, 0); moderateB.position(-200, 0);
    hardB.position(-200, 0); playAgain.position(-200, -50);
    chooseLevel = blank; // replace "choose a level" image with blank image
    circleCount = 25; // draws 25 circles
    circles = []; // empties circles array; starts fresh
    bubbleCounter = 0; // reset bubbleCounter
    // Create and initialize the instances of the DrawCircle object.
    // Populate the circles array with all the instances.
    for (var i = 0; i < circleCount; i++) {
      var d = 125; // diameter is 125
      var x = random(d / 4, width - d / 4);
      var y = random(d / 4, height - d / 4);
      var c = color(random(255), random(255), 255, 100); // circles are blue tinted
      checkPop = false; // reset check pop. mouse is NOT inside circle
      circles[i] = new DrawCircle(x, y, d, c, checkPop, once);
    }
  }

  function moderateMode() { // Draws all the circles for Moderate level
    // hide buttons by moving them off screen
   	easyB.position(-200, 0); moderateB.position(-200, 0);
    hardB.position(-200, 0); playAgain.position(-200, -50);
    chooseLevel = blank; // replace "choose a level" image with blank image
    circleCount = 30; // draws 30 circles
    circles = []; // empties circles array; starts fresh
    bubbleCounter = 0; // reset bubbleCounter
    for (var i = 0; i < circleCount; i++) {
      var d = 75; // diameter is 75
      var x = random(width);
      var y = random(height);
      var c = color(255, random(255), random(255), 100); // circles are red tinted
      checkPop = false; // reset check pop. mouse is NOT inside circle
      circles[i] = new DrawCircle(x, y, d, c, checkPop, once);
    }
  }

  function hardMode() { // Draws all the circles for Hard level
    // hide buttons by moving them off screen
    easyB.position(-200, 0); moderateB.position(-200, 0);
    hardB.position(-200, 0); playAgain.position(-200, -50);
    chooseLevel = blank; // replace "choose a level" image with blank image
    circleCount = 30; // draws 30 circles
    circles = []; // empties circles array; starts fresh
    bubbleCounter = 0; // reset bubbleCounter
    for (var i = 0; i < circleCount; i++) {
      var d = 25; // diameter is 25
      var x = random(d / 2, width - d / 2); // make sure circles are always visible on canvas
      var y = random(d / 2, height - d / 2);
      var c = color(random(255), 255, random(255), 100); // circles are green tinted
      checkPop = false; // reset check pop. mouse is NOT inside circle
      circles[i] = new DrawCircle(x, y, d, c, checkPop, once);
    }
  }

  function gameReset() { // Want to play again?
    easyB.position(width / 4, height / 5 + 300); // show easyB
    moderateB.position(width / 2 - 43, height / 5 + 300); // show easyB
    hardB.position(width * (3 / 4) - 55, height / 5 + 300); // show easyB
    playAgain.position(-100, -50); // hide play again button
    chooseLevel = loadImage("chooseALevel-01.png"); // replace blank image with choose level image
  }

  // *** DrawCircle object *** // Modified from week 05 example: An array of DrawCircle objects
  // --- parameters --- //
  // x 			-> circle - x position (center)
  // y 			-> circle - y position (center)
  // d 			-> circle - diameter
  // c 			-> circle - fill color
  function DrawCircle(x, y, d, c, checkPop, once) {
    // declare the properties
    this.xPos = x;
    this.yPos = y;
    this.diameter = d;
    this.color = c;
    this.checkPop = checkPop; // is the mouse touching a circle?
    this.once = once; // boolean value. makes sure sound plays only once.
  }

  DrawCircle.prototype = {
    constructor: DrawCircle,
    // *** Method: display the circle on the canvas *** 
    display: function() {
      fill(this.color);
      if (this.checkPop == false) // if mouse is outside of circle, display it
        ellipse(this.xPos, this.yPos, this.diameter, this.diameter);
      this.xPos += random(-1, 1);
      this.yPos += random(-1, 1);
    },

    // *** Method: pop the circle ***
    popSound: function() {
      var d = dist(mouseX, mouseY, this.xPos, this.yPos);
      if (d < this.diameter / 2) { // if mouse touches a circle, it disappears
        this.checkPop = true; // checkPop is true when mouse touches circle
        if (!this.once) {
          popped.play(); // Sound plays only once for every bubble popped
          this.once = true;
          bubbleCounter++; // keeps track of how many bubbles are popped each level
          print(bubbleCounter);
        }
      }
    }
  }