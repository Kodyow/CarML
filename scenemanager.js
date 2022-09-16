class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.title = true;
        this.loadGame = false;
        //this.game.click = false;
        //this.update();
        this.loadWorld();
    };
    clearEntities() {
        this.game.entities[0].forEach(function (entity) {
            entity.removeFromWorld = true;
        });
        this.game.entities[1].forEach(function (entity) {
            entity.removeFromWorld = true;
        });
        this.game.entities[2].forEach(function (entity) {
            entity.removeFromWorld = true;
        });
        this.game.entities[3].forEach(function (entity) {
            entity.removeFromWorld = true;
        });

    };

    loadWorld() {
        //player        
        
       // this.startingScreen();
        PARAMS.TIME = 0;
        this.clearEntities();
        //this.game.addEntity(new Character_2(this.game,0,0));
        this.game.addEntityForeground(new Car(this.game,500,500));
    }

    loadProperties() {
        PARAMS.SLOW = 1;
        PARAMS.INVINCIBILITY = false;
    }

    update() {
        
        PARAMS.DEBUG = document.getElementById("debug").checked;
        this.loadProperties();
        var that = this;
        
    }
    draw(ctx) {
 
    }
}

