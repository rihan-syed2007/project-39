var backImage,backgr;
var player, playerImg;
var giant,giantImg;
var title,titleImg;
var play;
var playImg,resetImg;
var rockImg,rock;
var coinImg,coin;
var Ground;
var score=0;

var END =0;
var PLAY =1;
var SERVE=2;
var gameState = SERVE;

function preload(){
  backImage=loadImage("back.jpg");
  playerImg = loadImage("boy.png");
  giantImg = loadImage("giant.png");
  titleImg = loadImage("title.png");
  playImg = loadImage("play.png");

  rockImg = loadImage("rock.png");
  coinImg = loadImage("coin.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  backgr=createSprite(1000,200,10,800);
  backgr.addImage(backImage);
  backgr.scale=4.0;
  backgr.velocityX=-6;
  
  title = createSprite(700,300,20,50);
  title.addImage(titleImg);
  title.scale = 0.4;
  title.visible=true;
  
  Ground = createSprite(700,700,3000,20);
  Ground.visible=false;

  play = createSprite(700,600,20,50);
  play.addImage(playImg);
  play.scale = 0.1;
  play.visible=true;

  rock = createSprite(1700,600,20,50);
  rock.addImage(rockImg);
  rock.scale = 0.2;
  rock.velocityX=0;
  rock.visible=false;

  coin = createSprite(1900,600,20,50);
  coin.y = random(250,400);
  coin.addImage(coinImg);
  coin.scale = 0.01;
  coin.velocityX=0;
  coin.visible=false;

  player = createSprite(700,550,20,50);
  player.addImage(playerImg);
  player.scale = 0.1;
  player.visible=false;

  giant = createSprite(300,200,20,50);
  giant.addImage(giantImg);
  giant.scale = 0.8;
  giant.visible=false;
  

  rockGroup = new Group();
  coinGroup = new Group();
}

function draw() { 
  background("green");


  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }

 if(gameState===SERVE){

    if(mousePressedOver(play)){
      gameState=PLAY;
    }
 }

  if(gameState===PLAY){
   
  player.visible=true;
  giant.visible=true;
  title.visible=false;
  play.visible=false;
  rock.visible=true;
  rock.velocityX=-12;
  coin.visible=true;
  coin.velocityX=-12;

  if(keyDown("space") && player.y >= 380) {
    player.velocityY = -12;
  }
  player.velocityY = player.velocityY + 0.8;

  if(coinGroup.isTouching(player)){
    coinGroup.destroyEach();
    score=score+2;
  }

  if(rockGroup.isTouching(player)){
    rockGroup.destroyEach();
  }

  spawnObstacles();
  spawnCoins();

  }
  else if(gameState===END){

  player.visible=false;
  giant.visible=true;
  rock.visible=false;
  rock.velocityX=0;
  coin.visible=false;
  coin.velocityX=0;
  
  }

 player.collide(Ground);

  drawSprites();

  
  textSize(15);
  text("SCORE  "+score,1400,50);

}

function spawnObstacles(){

 if(frameCount % 200===0){
  rock = createSprite(1700,600,20,50);
  rock.addImage(rockImg);
  rock.scale = 0.2;
  rock.velocityX=0;
  rock.visible=false;
  rock.lifetime=300;
  player.depth=rock.depth+1;
  rockGroup.add(rock);

 }
}
function spawnCoins(){

  if(frameCount % 200===0){
    coin = createSprite(1700,600,20,50);
    coin.y = random(250,400);
    coin.addImage(coinImg);
    coin.scale = 0.01;
    coin.velocityX=0;
    coin.visible=false;
    coin.lifetime=300;
    coinGroup.add(coin);
  }

}