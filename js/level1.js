var scoreText;
var map;
var backgroundLayer;
var blockedLayer;
var coins;
var spikes;
var monster;
var levelstate =  {

        preload : function() {
            
            //Hintergrundfarbe
            

            //Player
            game.load.image('player', 'assets/Sonicsprite.png');
            game.load.tilemap('map', 'projectdata/level1.json', null, Phaser.Tilemap.TILED_JSON);
            game.load.image('GrassTileset', 'assets/tilemaplevel1.png');
            game.load.image('coin', 'assets/coin.png');
            game.load.image('spike', 'assets/spike.png');
            game.load.image('bg', 'assets/Background.png')
            game.load.image('monster', 'assets/Opponent.png')
            
                
        },
        create : function() {
            
            monster = game.add.group();
            monster.enableBody = true;
            monster.create = (100, 450, 'monster');
            
            map = game.add.tilemap('map');

            map.addTilesetImage('GrassTileset');
            

            coins = game.add.group();
            coins.enableBody = true;
            
            spikes = game.add.group();
            spikes.enableBody = true;
            
            map.createFromObjects('coins', 35, 'coin', 0, true, false, coins);
            map.createFromObjects('spikes', 47, 'spike', 0, true, false, spikes);
            
            backgroundLayer = map.createLayer('background');
            map.setCollisionBetween(1, 5000, true, 'background');

            
           
            //Playerspawn
            player = game.add.sprite(0, 450, 'player');
            
            //Physics aktivieren
            game.physics.arcade.enable(player);
            game.physics.arcade.collide(player, backgroundLayer);
            
             //resizes the game world to match the layer dimensions
            backgroundLayer.resizeWorld();



            
            //Spieler stößt gegen Weltende
            player.body.collideWorldBounds = true;
            //Schwerkraft
            player.body.gravity.y = 500;

            

            //Pfeiltasten einfügen
            cursors = game.input.keyboard.createCursorKeys();
                      
            //Kamera folgt Spieler
            game.camera.follow(player);
            
            
            //Score wird eingefügt
            scoreText = game.add.text(16, 16, 'Coins: ' + game.global.score, { fontSize: 25, fill: '#ffd700'});
            
  
            
          
    
            

            
        
      
    },
    
    update: function(){
           scoretext = game.global.score;
            
            game.physics.arcade.overlap(player, coins, collectCoin, null, this);
           game.physics.arcade.overlap(player, spikes, gameOver, null, this);
            game.physics.arcade.collide(player, backgroundLayer, null, null, this);
        //Spieler bewegt sich nicht automatisch
        player.body.velocity.x = 0;
        
        //Stoppen
        if (cursors.left.isDown){
            player.body.velocity.x = -250;
        }
        
        //Nach rechts bewegen
        if (cursors.right.isDown){
            player.body.velocity.x = 250;
        }
        
        //Sprung
        if (cursors.up.isDown && (player.body.onFloor() || player.body.touching.down)){
            player.body.velocity.y = -400;
        }
        
        //Schnellerer Fall
        if (cursors.down.isDown){
            player.body.velocity.y = 500;
        }
    
    }
    
}

function collectCoin(player, coin) {

    coin.kill();
    game.global.score++;
    console.log(game.global.score);
}
function gameOver(player, spike){
    this.state.start('gameover')
}
    
    
    

