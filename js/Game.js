class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(350,500);
    player1.addImage("player1",player_img);
    
    player2 = createSprite(700,500);
    player2.addImage("player2", player_img);
    players=[player1,player2];

        }
    
    play(){
        
        form.hide();

        Player.getPlayerInfo();
        image(back_img, 0, 0, 1000, 800);
        var x =100;
        var y=200;
        var index =0;
        drawSprites();

        for(var plr in allPlayers){
        
            index = index+1;
            x = 500-allPlayers[plr].distance;
            y=500;
            
            players[index -1].x = x;
            players[index - 1].y = y;

            // Differentiate the main player by printing
            // the name of the player on the basket. 
if(index === player.index){
    fill("orange");
    textSize(25);
    text(allPlayers[plr].name,x-25,y+25);
}
        }


        // Give movements for the players using arrow keys
if(keyIsDown(RIGHT_ARROW)&& player.index !== null){
player.distance += 10
player.update();
}
if(keyIsDown(LEFT_ARROW)&& player.index !== null){
    player.distance -= 10
    player.update();
    }
        // Create and spawn fruits randomly
if(frameCount % 2 === 0){
    fruits = createSprite(random(100,1000),0,100,100);
    fruits.velocityY = 6;
    var rand = Math.round(random(1,5))
    switch(rand){
        case 1 : fruits.addImage("fruits",fruit1_img);
        break;
        case 2 : fruits.addImage("fruits",fruit2_img);
        break;
        case 3 : fruits.addImage("fruits",fruit3_img);
        break;
        case 4 : fruits.addImage("fruits",fruit4_img);
        break;
        case 5 : fruits.addImage("fruits",fruit5_img);
        break;
    }
    fruitGroup.add(fruits);
}
        
    
        // Add code to destroy fruits, calculate scores and
        if(player.index !== null){
for(var i = 0;i < fruitGroup.length;i++){
    if(fruitGroup.get(i).isTouching(players)){
        fruitGroup.get(i).destroy();
        player.score = player.score+1;
        player.update();
 }
}
  }
        // update the scores to the database
    textSize(25);
    fill("black")
    text("player 1 :" +allPlayers.player1.score,50,50);
    text("player 2 :" +allPlayers.player2.score,50,100);

        // Add code for game end condition
if(player.score >= 10){
    this.end();
}

    
    }
    end(){

       // Add code to update game state and display Game Over
game.update(2);
clear();
fill("red");
textSize(40);
       text("Game Over",350,300);
    }
  
}