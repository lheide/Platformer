var score = 0;
var scoreText;
var background;
var gameoverstate =  {

        preload : function() {
            
            game.load.image('gameover', 'assets/gameOver.png');

        },
        create : function() {
            
            background = game.add.image(game.world.X, game.world.Y, 'gameover');
            background.x = 0;
            background.y = 0;
            background.height = game.height;
            background.width = game.width;  
            
            
        }
    
}