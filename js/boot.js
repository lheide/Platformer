var scoreText;
var bootstate = {
    create: function(){
        scoreText = game.add.text(16, 16, 'Coins: 0', { fontSize: 25, fill: '#ffd700'});
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.state.start('level1');
    }
}