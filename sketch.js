var balloon, balloonImage1, balloonImage2, database, position;
// create database and position variable here

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  
  createCanvas(1500,700);
  
  
  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  textSize(20); 
database=firebase.database();
  
var balloonPosition = database.ref('balloon/position');
  balloonPosition.on("value", readPost);

}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){ 
    updatePosition(-5,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    
  }
  else if(keyDown(RIGHT_ARROW)){
    updatePosition(5,0)
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    
  }
  else if(keyDown(UP_ARROW)){
    updatePosition(0,-5)
    balloon.addAnimation("hotAirBalloon",balloonImage2);
   
  }
  else if(keyDown(DOWN_ARROW)){
    updatePosition(0,+5)
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("Use arrow keys to move Hot Air Balloon!",40,40);
}

function updatePosition(x,y){
  database.ref('balloon/position').set({
    'x' : position.x + x,
    'y' : position.y + y
  })
}

function readPost(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

