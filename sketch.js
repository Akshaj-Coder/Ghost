var tower, towerimg;
var doors, doorimg, doorsgrp;
var climber, climberimg, climbergrp;
var invisible, invisiblegrp;
var ghost, ghostimg;
var spooky;

//gameStates
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function setup() {
  createCanvas(600, 600);

  tower = createSprite(300, 300);
  tower.addImage("towerimg", towerimg);
  tower.velocityY = 1;

  
  ghost = createSprite(300,300,50,50);
  ghost.addImage("ghostimg", ghostimg);
  ghost.scale = 0.3;
  
  doorsgrp = new Group();
  climbergrp = new Group();
  invisiblegrp =  new Group();
}

function preload() {

  towerimg = loadImage("tower.png");

  doorimg = loadImage("door.png");
  
  climberimg = loadImage("climber.png");
  
  ghostimg = loadImage("ghost-standing.png");
  
  spooky = loadSound("spooky.wav");
  
}

function draw() {
  background(0);
  
  if (gameState === PLAY) {
    
  if (tower.y > 400) {
    tower.y = 300;
  }
  
  spooky.loop();
  SpawnDoors();
    
  if (keyDown(RIGHT_ARROW)) {
    ghost.x = ghost.x +3;
  }
    
  if (keyDown(LEFT_ARROW)) {
    ghost.x = ghost.x -3;
  }
    
  if (keyDown("space")) {
    ghost.velocityY = -10;
  }
  ghost.velocityY = ghost.velocityY +0.8;
  
  //climbergrp.collide(ghost);
if (climbergrp.isTouching(ghost)) {
  ghost.velocityY = 0;
}
 
if (invisiblegrp.isTouching(ghost) || ghost.y > 600) {
  ghost.destroy();
  gameState = END;
}  
 
  drawSprites();
  //console.log(frameCount);
}
  
else if (gameState === END) {
  fill("yellow");
  stroke("yellow");
  textSize(30);
  
  text("GAME OVER",250,300);
}

  

}

function SpawnDoors() {
  if (frameCount % 240 === 0) {
    doors = createSprite(200, 100);
    doors.x = Math.round(random(120,400));
    doors.addImage("doorimg", doorimg);
    
    climber = createSprite(200,150);
    climber.addImage("climberimg", climberimg);
    climber.x = doors.x;
    climber.velocityY = 1;
    
    invisible = createSprite(200,150,120,10);
    invisible.velocityY = 1;
    invisible.x = doors.x;
    //invisible.visible = false;
    invisible.debug = true;
    
    doorsgrp.add(doors);
    
    climbergrp.add(climber);
    
    invisiblegrp.add(invisible);
    
    ghost.depth = doors.depth;
    ghost.depth +=1;
    
    
    doors.lifetime = 600;
    climber.lifetime = 600;
    invisible.lifetime = 600;
    
   
    
    doors.velocityY = 1;
    
    
  }
}