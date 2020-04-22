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
  gameoverimg = loadImage("images/gameover.png");
  restartImg = loadImage("images/restart.png");
  bulletimg = loadImage("images/bullet.png");
}

function setup() {
  createCanvas(1200, 400);
  ground = createSprite(600,390,1200,10);
  ground.addImage("ground",groundimg);
  ground.x = ground.width/2;

  mario = createSprite(50,335,10,10);
  mario.addAnimation("mario",marioimg);
  mario.addAnimation("mario_dead",mario_deadimg);
  mario.scale =0.3;

  invisibleground = createSprite(600,375,1200,10);
  invisibleground.visible = false;

 
  gameOver = createSprite(620,150);
  gameOver.addImage("gameover",gameoverimg);
  gameOver.scale = 0.5;
  restart = createSprite(1100,40);
  restart.addImage("restart",restartImg);
  restart.scale =0.2;
  gameOver.visible = false;
  restart.visible = false;

  pipesGroup = new Group();
  cloudsGroup = new Group();
  bulletGroup = new Group();

}

function draw() {
  background("skyblue");
  drawSprites();

  if(gameState === PLAY){
    ground.velocityX = -7;

    if(ground.x<0){
      ground.x = ground.width/2;
    }

    if(keyDown("UP_ARROW") && mario.y>329){
      mario.velocityY = -20;
    }

    if(keyWentDown("space")){
      bullet = createSprite(mario.x,mario.y);
      bullet.addImage("bullet",bulletimg);
      bullet.velocityX= 4;
      bulletGroup.add(bullet);

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
    gameOver.visible = true;
    restart.visible = true; 

  }
  if(mousePressedOver(restart)){
    gameState = PLAY;
    pipesGroup.destroyEach();
    cloudsGroup.destroyEach();
    gameOver.visible = false;
    restart.visible = false;
    mario.changeAnimation("mario",marioimg);
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
function spawnEnemies(){
  if(frameCount %120 === 0 ){
    enemies = createSprite(1000,320,10,20);
    enemies.velocityX = -2;
    
  }
}