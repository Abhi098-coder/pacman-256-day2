var pacman,pacmanImg,obstacle,obstacleGroup,gameState,replayButton
function preload(){
  pacmanImg = loadImage("images/Pacman1.png");
}

function setup() {
  createCanvas(400,600);
  pacman = createSprite(200,575,100,100);
  pacman.addImage(pacmanImg);
  pacman.scale = 0.025;
  obstacleGroup = createGroup();
  gameState = 0;
  replayButton = createSprite(200,300,100,100);
  replayButton.visible = false;
}

function draw() {
  background(0);
  if(gameState == 0){
    if(frameCount%120 == 0){
      spawnVerticalObstacles();
    }
    if(frameCount%120 == 60){
      spawnHorizontalObstacles();
    }
  }
  stopGame();
  teleport();
  drawSprites();
  text("x: " + mouseX + ",y: " + mouseY, mouseX, mouseY)
}

function keyPressed(){
  if(gameState == 0){
    if(keyCode == UP_ARROW){
      pacman.velocityY = -5;
      pacman.velocityX = 0;
      pacman.rotation = -90;
    }
    if(keyCode == DOWN_ARROW){
      pacman.velocityY = 5;
      pacman.velocityX = 0;
      pacman.rotation = 90;
    }
    if(keyCode == LEFT_ARROW){
      pacman.velocityY = 0;
      pacman.velocityX = -5;
      pacman.rotation = 180;
    }
    if(keyCode == RIGHT_ARROW){
      pacman.velocityY = 0;
      pacman.velocityX = 5;
      pacman.rotation = 0;
    }
  }
}

function spawnVerticalObstacles(){
  obstacle = createSprite(random(0,400),0,random(50,100),random(150,250));
  obstacle.velocityY = 2.5;  
  obstacle.shapeColor = color(Math.round(random(0,255)),Math.round(random(0,255)),Math.round(random(0,255)))
  obstacleGroup.add(obstacle);
}
function spawnHorizontalObstacles(){
  obstacle = createSprite(random(0,400),0,random(150,250),random(50,100));
  obstacle.velocityY = 2.5;
  obstacle.shapeColor = color(Math.round(random(0,255)),Math.round(random(0,255)),Math.round(random(0,255)))
  obstacleGroup.add(obstacle);
}
function teleport(){
  if(pacman.x == 0){
    pacman.x = 390;
  }
  if(pacman.x == 400){
    pacman.x = 10;
  }
}
function stopGame(){
  if(pacman.isTouching(obstacleGroup)){
    gameState = 1;
    pacman.velocityX = 0;
    pacman.velocityY = 0;
    obstacleGroup.setVelocityEach(0, 0);
    replayButton.visible = true;
  }
}