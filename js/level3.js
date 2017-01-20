var Score = 0
var scoreText;
var background;
var levelstate3 =  {

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
            game.load.image('spike', 'assets/Spike helper.png');
            //Ziel
            game.load.image('fin', 'assets/ZielNew.gif');
            //Coin
            game.load.image('coin', 'assets/Coin.png');
            //InvisPlattform
            game.load.image('invis','assets/invis platform.png');
            //InvisPlattform2
            game.load.image('invis2','assets/invis platform2.png');
            //InvisLabyrinthPart1
            game.load.image('invislaby1','assets/invislaby.png');
            //InvisLabyrinthPart2
            game.load.image('invislaby2','assets/invislaby2.png');
        
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
            player = game.add.sprite(0, 0, 'player');
            
            //Physics aktivieren
            game.physics.arcade.enable(player);
            
            //Spieler stößt gegen Weltende
            player.body.collideWorldBounds = true;
            //Schwerkraft
            player.body.gravity.y = 500;
            
            //Plattformgruppen
            platforms = game.add.physicsGroup();
            movableplatforms = game.add.physicsGroup();
            
            //Plattformen erstellen
            platforms.create(0,100, 'platform')
            platforms.create(0, 264, 'invis')
            platforms.create(248, 264, 'invis')
            platforms.create(496, 264, 'invis')
            platforms.create(794, 264, 'invis')
            platforms.create(1042, 264, 'invis')
            platforms.create(1290, 264, 'invis')
            platforms.create(1538, 264, 'invis')
            platforms.create(800, 439, 'invislaby1')
            platforms.create(700, 450, 'invislaby2')
            platforms.create(0, 764, 'invis')
            platforms.create(248, 764, 'invis')
            platforms.create(496, 764, 'invis')
            platforms.create(550, 764, 'invis')
            platforms.create(794, 764, 'invis')
            platforms.create(1042, 764, 'invis')
            platforms.create(1290, 764, 'invis')
            platforms.create(1538, 764, 'invis')
            
            
            
      
            //Zielgruppe
            level3ending = game.add.group();
            
            level3ending.enableBody = true;
            
            level3ending.setAll('body.immovable', true);
            
            level3ending.create(450, 300, 'fin')
            
            //Spikegruppe
            spikes = game.add.group();
            
            spikes.enableBody = true;
            
            for(var i = 0; i < 40 ;i++){
                spikes.create(i  * 41.45 , 882, 'spike');
            }
            
            spikes.setAll('body.immovable', true);
            
            //Coingruppe
            coins = game.add.group();
            
            coins.enableBody = true;
            
            coins.create(600, 700, 'coin')
            coins.create(300, 235, 'coin')
            
                                
            //Plattform sind unbeweglich
            platforms.setAll('body.immovable', true);
            platforms.setAll('body.allowGravity', false);
            movableplatforms.setAll('body.immovable', true);
            movableplatforms.setAll('body.allowGravity', false);
            movableplatforms.setAll('body.velocity.x', 65)
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
        game.physics.arcade.collide(player, movableplatforms);
        game.physics.arcade.collide(player, coins, collectCoin, null, this);
        game.physics.arcade.collide(player, spikes, gameOver, null, this);
        game.physics.arcade.collide(player, level3ending, level3finish, null, this);
        
        //Beweglicher Hintergrund
        //background.x +=4;
  ;
        //Spieler bewegt sich nicht automatisch
        player.body.velocity.x = 0;
        
        //Nach links bewegen
        if (cursors.left.isDown){
            player.body.velocity.x = -250;
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
            player.body.velocity.y = 650;
        }
    
    }
}
//Coins sammeln
function collectCoin (player, coin) {
           coin.kill();
           scoreText.text = 'Coins: ' + game.global.score++;
        }
//GameOver
function gameOver (player, spikes) {
            player.kill();
            this.state.start('gameover');
         }

//Ende
function level3finish (player, level3ending) {
            game.state.start("level4");
}