var mainmenustate = {
    

        preload : function() {

                this.load.spritesheet('button',
                                'assets/menu/button_editor.png', 0, 0);

                 this.game.load.json('version', 'projectdata/version.json');
                
                
                this.load.spritesheet('l1button', 'assets/Buttonl1.png', 0, 0);
            
                this.load.image('mainmenu', 'assets/mm2.png');

        },
        create : function() {

                var phaserJSON = this.game.cache.getJSON('version');
                var style = {
                        font : "17px Arial",
                        fill : "#FFFFFF",
                        align : "center",
                };
            
                background = this.add.image(this.worldX, this.worldY, 'mainmenu')
                background.x = 0;
                background.y = 0;
                background.height = game.height;
                background.width = game.width; 

                this.game.add.text(0, 0, "Version: " + phaserJSON.version, style);
				this.game.add.text(0, 20, "Author: " + phaserJSON.author, style);
            
                button = this.add.button(this.world)
                
                game.add.button(780, 410, 'l1button', actionOnClick,
                               this, 1, 0, 2);
        }
}

function actionOnClick() {
        this.state.start("level4");
}