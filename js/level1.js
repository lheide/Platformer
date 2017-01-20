var Score = 0
var scoreText;
var background;
var levelstate =  {

        preload : function() {
            
            //Hintergrundfarbe
            game.stage.backgroundColor = '#FFF';
            //Hintergrundbild
            game.load.image('background','assets/bg.png');
            //Player
            game.load.image('player', 'assets/Player-2.gif');
            //MainPlattform
            game.load.image('platform', 'assets/Ufo.png');
            //Spikes
            game.load.image('platform2', 'assets/Spike helper.png');
            //Ziel
            game.load.image('fin', 'assets/ZielNew.gif');
            //Coin
            game.load.image('coin', 'assets/Coin.png');
                
        },
        create : function() {
            
            //Späterer Hintergrund
            //background = game.add.image(game.world.X, game.world.Y, 'background');
            //background.x = 0;
            //background.y = 0;
            //background.height = game.height;
            //background.width = game.width; 
            
            //Hintergrund einfügen
            background2 = game.add.image(game.world.X, game.world.Y, 'background');
            background2.x = 0;
            background2.y = 0;
            background2.height = game.height;
            background2.width = game.width;  
            
            //Weltgröße
            game.world.setBounds(0, 0, 1653, 919);
            //Playerspawn
            player = game.add.sprite(0, 387, 'player');
            
            //Physics aktivieren
            game.physics.arcade.enable(player);
            
            //Spieler stößt gegen Weltende
            player.body.collideWorldBounds = true;
            //Schwerkraft
            player.body.gravity.y = 500;
            
            //Plattformgruppe
            platforms = game.add.physicsGroup();
            
            //Plattformen erstellen
            platforms.create(300, 365, 'platform');
            platforms.create(0, 450, 'platform');
            platforms.create(700, 700, 'platform');
            platforms.create(1000, 630, 'platform');
      
            //Zielgruppe
            ending = game.add.group();
            
            ending.enableBody = true;
            
            ending.create(1175, 510, 'fin');
            
            ending.setAll('body.immovable', true);
            
            //Spikegruppe
            spikes = game.add.group();
            
            spikes.enableBody = true;
            
            for(var i = 0; i < 40 ;i++){
                spikes.create(i  * 41.45 , 882, 'platform2');
            }
            
            spikes.setAll('body.immovable', true);
            
            //Coingruppe
            coins = game.add.group();
            
            coins.enableBody = true;
            
            coins.create(275, 200, 'coin')
            coins.create(750, 350, 'coin')
            coins.create(25, 280, 'coin')
            coins.create(1000, 200, 'coin');
                                
            //Plattform sind unbeweglich
            platforms.setAll('body.immovable', true);
            
            //Pfeiltasten einfügen
            cursors = game.input.keyboard.createCursorKeys();
                      
            //Kamera folgt Spieler
            game.camera.follow(player);
            
            //Score wird eingefügt
            scoreText = game.add.text(16, 16, 'Coins: ' + game.global.score, { fontSize: 25, fill: '#ffd700'});
      
    },
    
    update: function(){
        
        
        
        //Physics
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(player, coins, collectCoin, null, this);
        game.physics.arcade.collide(player, spikes, gameOver, null, this);
        game.physics.arcade.collide(player, ending, finish, null, this);
        
        //Beweglicher Hintergrund
        //background.x +=4;
  ;
        //Spieler bewegt sich nicht automatisch
        player.body.velocity.x = 0;
        
        //Stoppen
        if (cursors.left.isDown){
            player.body.velocity.x = 0;
        }
        
        //Nach rechts bewegen
        if (cursors.right.isDown){
            player.body.velocity.x = 250;
        }
        
        //Sprung
        if (cursors.up.isDown && (player.body.onFloor() || player.body.touching.down)){
            player.body.velocity.y = -300;
        }
        
        //Schnellerer Fall
        if (cursors.down.isDown){
            player.body.velocity.y = 500;
        }
    
    }
}
//Coins sammeln
function collectCoin (player, coin) {
           coin.kill();
           game.global.score++;
           scoreText.text = 'Coins: ' +   game.global.score;
        }
//GameOver
function gameOver (player, spikes) {
            player.kill();
            this.state.start('gameover');
         }

//Ende
function finish (player, ending) {
            game.state.start("level2");
}