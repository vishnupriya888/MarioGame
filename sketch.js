var ground,groundimg;
var mario,marioimg;
function preload(){
  bg = loadImage("images/bg.png");
  groundimg = loadImage("images/ground.png");
  marioimg = loadAnimation("images/mario1.png","images/mario2.png");
  pipesimg =loadImage("images/pipes.png");
}

function setup() {
  createCanvas(1200, 400);
  ground = createSprite(600,390,1200,10);
  ground.addImage("ground",groundimg);
  ground.velocityX = -5;
  mario = createSprite(50,335,10,10);
  mario.addAnimation("mario",marioimg);
  mario.scale =0.3;
  invisibleground = createSprite(600,375,1200,10);
  invisibleground.visible = false;

}

function draw() {
  background(bg);
  drawSprites();
  if(ground.x<0){
    ground.x = ground.width/2;
  }
  mario.collide(invisibleground);
  spawnPipes();
}
function spawnPipes(){
  if(frameCount %90  === 0){
    pipes = createSprite(1200,320,10,10);
    pipes.addImage("pipes",pipesimg);
    pipes.velocityX = -5;
    pipes.scale = 0.5;
  }
}