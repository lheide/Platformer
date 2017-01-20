// replace aa with your div container class if you want
var game = new Phaser.Game(1653,919, Phaser.AUTO, 'aa');

// load all states
game.state.add('boot', bootstate);
game.state.add('load', loadstate);
game.state.add('mainmenu', mainmenustate);
game.state.add('level1', levelstate);
game.state.add('level2', levelstate2);
game.state.add('level3', levelstate3);
game.state.add('level4', levelstate4);
game.state.add('gameover', gameoverstate);

game.global = {
    score: 0
}


// start the game at state boot
game.state.start('boot');