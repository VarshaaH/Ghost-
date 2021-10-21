var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()

   ghost = createSprite(200,200,50,50)
  ghost.addImage(ghostImg)
  ghost.scale = 0.5

  spookySound.loop()
}

function draw() {
  background(200);

  if (gameState==='play'){

  
  
  

  if(tower.y > 400){
      tower.y = 300
  
    }
    if(keyDown('right_arrow')){
      ghost.x = ghost.x + 2;
    }
    if(keyDown('left_arrow')){
      ghost.x = ghost.x - 2;
    }
    if(keyDown('space')){
      ghost.velocityY = -5;
    

    }

    if (climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0
    }
if (invisibleBlockGroup.isTouching(ghost) || ghost.y>600 ){
  ghost.destroy()
  gameState = 'end'
}

    ghost.velocityY = ghost.velocityY+0.8  

    invisibleBlockGroup.collide(ghost)
    Spawndoors() 
    drawSprites()
    
  }
  if (gameState==='end'){
    stroke('yellow')
    fill('yellow') 
    textSize(30) 
    
    text('Game Over',230,250)

    

  }
}

function Spawndoors() {
if (frameCount%240===0){
  door = createSprite(200,-50)
  door.velocityY = 1
  door.addImage(doorImg)
  door.x = Math.round(random(120,400))
  door.lifetime = 800
  doorsGroup.add(door)

  var climber = createSprite(200,10)
  climber.velocityY = 1
  climber.x = door.x
climber.lifetime = 800
climber.addImage(climberImg)
  climbersGroup.add(climber)


  var invisibleBlock = createSprite(400,15)
  invisibleBlock.velocityY = 1
  invisibleBlock.x = door.x
  invisibleBlock.width = climber.width
  invisibleBlock.height = 2;
  invisibleBlock.lifetime = 800
  invisibleBlock.visible = false
  invisibleBlockGroup.add(invisibleBlock)

  ghost.depth = door.depth
  ghost.depth += 1

}

  


}

