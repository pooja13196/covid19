var PLAY = 1
var END  = 0 
var gameState = PLAY
var kid,kidImg,kid_collided,virus,virusImg,bg,bgImg,enemy,enemyImg;
var virusGroup,enemyGroup;
var death = 0;
var invisibleGround;

  
function preload (){
  kidImg = loadAnimation("kid_2_walking.png");
  virusImg = loadImage("virus.png");
  enemyImg = loadImage ("enemy.png");
  bgImg = loadImage ("bg.gif");
  kid_collided = loadAnimation("kid_collided.png");
}




function setup() {
  createCanvas(displayWidth, displayHeight);
  bg = createSprite(0,0,1396,500)
  bg.addImage("bg",bgImg);
  bg.scale=2.8
  bg.velocityX=-3;
  
  kid=createSprite(110, 390, 50, 50);
  kid.addAnimation("kid_2_walking",kidImg);
  kid.addAnimation("collided",kid_collided)
  kid.scale = 0.5;
  //kid.velocityX = 2;

  ground =createSprite (500,480,1000,10);
  ground.visible=false;
  
  
  invisibleGround =createSprite (500,490,1000,10);
  invisibleGround.visible = false;
  
  

  virusGroup =new Group ();
  enemyGroup = new Group();
 

  
  
}

function draw() {
  background(0); 
 
  if(gameState === PLAY){
    bg.velocityX = -4;


    if(bg.x<0){
      bg.x =width/2
    }   
    ground.velocityX=-3;
    if(ground.x<0){
      ground.x=width/2;
    }
    if(keyDown(RIGHT_ARROW)){
      kid.x= kid.x +2
    }
  if(keyDown(LEFT_ARROW)){
    kid.x= kid.x -2
  }
  if(keyDown(UP_ARROW) && kid.x<1000){
    kid.velocityY = -10;
  }
   kid.velocityY= kid.velocityY + 0.5
   spawnvirus();
   spawnenemy();
   
  if(virusGroup.isTouching(kid)||enemyGroup.isTouching(kid)){
    gameState = END
   
  }
       
  }


  else if(gameState=== END){
    
    kid.velocityX=0;
    virusGroup.destroyEach()
    enemyGroup.destroyEach()
    bg.destroy();
    
    kid.changeAnimation("collided",kid_collided)
    kid_collided.scale=5
    stroke("orange");
    fill("white");
    textSize(50);
    text("YOU DIED:" + death,100,200);


  }

  kid.collide(invisibleGround)
  drawSprites();

}
function spawnvirus (){
  if(frameCount%240===0){
    var virus = createSprite(1200,120,20,20)
    virus.addImage(virusImg);
    virus.scale = 0.3;
    virus.velocityX = -2
    virus.y=Math.round(random(20,240))
    virus.lifetime = 1000;
    virusGroup.add(virus)
  }
}
function spawnenemy(){
  if(frameCount%100===0){
    var enemy = createSprite(1200,120,50,50)
    enemy.addImage(enemyImg);
    enemy.scale = 1;
    enemy.velocityY = -2
    enemy.x=Math.round(random(100,1250)) 
    enemy.y=Math.round(random(100,1000)) 
    enemyGroup.add(enemy);
  }
}