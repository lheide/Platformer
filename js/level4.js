var Score = 0
var scoreText;
var background;
var monster;
var levelstate4 =  {

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
            //Gegner
            game.load.image('opponent', 'assets/Opponent.png');
            //Kleine Plattform
            game.load.image('smallplat', 'assets/Small platform.png')
        
        },
        create : function() {
            
            //Späterer Hintergrund
            //background = game.add.image(game.world.X, game.world.Y, 'background');
            //background.x = 0;
            //background.y = 0;
            //background.height = game.height;
            //background.width = game.width; 
            
             
            
            //Weltgröße
            game.world.setBounds(0, 0, 1653, 919);
            
            
            //Hintergrund einfügen
            background2 = game.add.tileSprite(0, 0, 1653, 919, 'background');
            
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
            platforms.create(0, 300, 'smallplat')
            platforms.create(500, 200, 'smallplat')
            platforms.create(800, 110, 'smallplat')
            
            
            
      
            //Zielgruppe
            level4ending = game.add.group();
            
            level4ending.enableBody = true;
            
            level4ending.setAll('body.immovable', true);
            
            level4ending.create(800, -115, 'fin');
            
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
            coins.create(350, 235, 'coin')
            
            //Gegnergruppe
            monster = game.add.group();
            
            monster.enableBody = true;
            
            monster.create(Math.random() *1652, 700, 'opponent');
            
            game.physics.arcade.enable(monster);
            
            
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
        
        
        background2.tilePosition.x += 2;
        //Physics
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(player, movableplatforms);
        game.physics.arcade.collide(player, monster);
        game.physics.arcade.collide(player, coins, collectCoin, null, this);
        game.physics.arcade.collide(player, spikes, gameOver, null, this);
//        game.physics.arcade.collide(player, level4ending, level4finish, null, this);
        game.physics.arcade.collide(player, monster, monsterGameOver, null, this);
        
        //Beweglicher Hintergrund
        //background.x +=4;
  
        //Spieler bewegt sich nicht automatisch
        player.body.velocity.x = 0;
        
        
        for(var i = 0; i < monster.length; i++){
            var monsterObject = monster.children[i];
            monsterObject.body.velocity.x = 100;    
        }
        
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

//MonsterGameOver
function monsterGameOver (player,  monster){
    player.kill();
    this.state.start('gameover');
}
//GameOver
function gameOver (player, spikes) {
            player.kill();
            this.state.start('gameover');
         }

//Ende
//function level4finish (player, level4ending) {
//            game.state.start("level3");
//}