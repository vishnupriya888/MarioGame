var ground,groundimg;
var mario,marioimg;
var clouds, cloudsimg;
var invisibleground;
var pipesGroup,cloudsGroup;
var PLAY =1;
var END = 0;
var gameState = PLAY;

function preload(){
  bg = loadImage("images/bg.png");
  groundimg = loadImage("images/ground.png");
  marioimg = loadAnimation("images/mario1.png","images/mario2.png");
  pipesimg =loadImage("images/pipes.png");
  cloudsimg =loadImage("images/cloud.png");
  mario_deadimg = loadAnimation("images/mario_dead.png");
  gameover = loadImage("images/gameover.png");
}

function setup() {
  createCanvas(1200, 400);
  ground = createSprite(600,390,1200,10);
  ground.addImage("ground",groundimg);
  

  mario = createSprite(50,335,10,10);
  mario.addAnimation("mario",marioimg);
  mario.addAnimation("mario_dead",mario_deadimg);
  mario.scale =0.3;

  invisibleground = createSprite(600,375,1200,10);
  invisibleground.visible = false;

  pipesGroup = new Group();
  cloudsGroup = new Group();

}

function draw() {
  background("skyblue");
  drawSprites();

  if(gameState === PLAY){
    ground.velocityX = -7;

    if(ground.x<0){
      ground.x = ground.width/2;
    }

    if(keyDown("space") && mario.y>329){
      mario.velocityY = -20;
    }

    mario.velocityY = mario.velocityY + 1;
    spawnPipes();
    spawnClouds();
    if(pipesGroup.isTouching(mario)){
      gameState = END;
    }
   

  }
  else if(gameState === END){
    ground.velocityX = 0;
    cloudsGroup.setVelocityXEach(0);
    pipesGroup.setVelocityXEach(0);
    cloudsGroup.setLifetimeEach(-1);
    pipesGroup.setLifetimeEach(-1);
    mario.velocityY = 0;
    mario.changeAnimation("mario_dead",mario_deadimg);
    //textSize(70);
    
    //text("GAME OVER",400,200);
    gameOver = createSprite(620,150);
    gameOver.addImage("gameover",gameover);
    gameOver.scale = 0.5;

  }
  mario.collide(invisibleground);
  console.log(mario.y);  
}
function spawnPipes(){
  if(frameCount %90  === 0){
    pipes = createSprite(1200,320,10,10);
    pipes.addImage("pipes",pipesimg);
    pipes.velocityX = -5;
    pipes.scale = 0.5;
    pipes.lifetime = 240;
    pipesGroup.add(pipes);
  
  }
}
function spawnClouds(){
  if(frameCount %100  === 0){
    clouds = createSprite(1200,random(50,150),10,10);
    clouds.addImage("clouds",cloudsimg);
    clouds.velocityX = -3;
    clouds.scale = 2;
    clouds.lifetime = 400;
    cloudsGroup.add(clouds);
  }
}