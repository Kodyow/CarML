// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor(ctx) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = ctx;

        // Everything that will be updated and drawn each frame
        this.entities = [[],[],[],[]];//0 = player, 1 = enemies, 2 = background, 3 = inventory

        // Information on the input
        /*
        this.click = null;
        this.mouse = null;
        this.wheel = null;
        this.keys = {};
        */
       this.click = null;
       this.mouse = null;
       this.up = null;
       this.down = null;
       this.left = null;
       this.right = null;
       this.break = null;


       this.elapsedTime = 0;
       this.totalTime = 90;

        // THE KILL SWITCH
        this.running = false;

        // Options and the Details
        this.options = {
            prevent: {
                contextMenu: true,
                scrolling: true,
            },
            debugging: false,
        };
    };

    init(ctx) {

        this.ctx = ctx;
        this.startInput();
        this.timer = new Timer();
    };

    start() {
        this.running = true;
        const gameLoop = () => {
            this.loop();
            if (this.running) {
                requestAnimFrame(gameLoop, this.ctx.canvas);
            }
        };
        gameLoop();
    };

    startInput() {
        var that = this;

        const getXandY = e => ({
            x: e.clientX - that.ctx.canvas.getBoundingClientRect().left,
            y: e.clientY - that.ctx.canvas.getBoundingClientRect().top
        });

        this.ctx.canvas.addEventListener("mousemove", function (e) {
            that.mouse = getXandY(e);
        }, false);

        this.ctx.canvas.addEventListener("click", function (e) {
            that.click = getXandY(e);
        }, false);

        this.ctx.canvas.addEventListener("keydown", function (e) {
            switch (e.code) {
                case "Space":
                    that.break = true;
                    break;

                case "KeyW":
                    that.up = true;
                    break;

                case "KeyA":
                    that.left = true;
                    break;    

                case "KeyS":
                    that.down = true;
                    break;

                case "KeyD":
                    that.right = true;
                    break;

                case "ShiftLeft":
                    that.run = true;
            }
            console.log(e.code);
        }, false);

        this.ctx.canvas.addEventListener("keyup", function (e) {
            switch (e.code) {
                case "Space":
                    that.break = false;
                    break;

                case "KeyW":
                    that.up = false;
                    break;

                case "KeyA":
                    that.left = false;
                    break;    

                case "KeyS":
                    that.down = false;
                    break;

                case "KeyD":
                    that.right = false;
                    break;
                case "ShiftLeft":
                    that.run = false;
            }
        }, false);
    };

    addEntityForeground(entity) {
        this.entities[0].push(entity);
    };

    addEntityEnemies(entity) {
        this.entities[1].push(entity);
    };

    addEntityBackground(entity) {
        this.entities[2].push(entity);
    };

    addEntityInventory(entity) {
        this.entities[3].push(entity);
    }

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // Draw latest things first
        
        for (let i = this.entities[2].length - 1; i >= 0; i--) {
            this.entities[2][i].draw(this.ctx, this);
        }
        for (let i = this.entities[1].length - 1; i >= 0; i--) {
            this.entities[1][i].draw(this.ctx, this);
        }
        for (let i = this.entities[0].length - 1; i >= 0; i--) {
            this.entities[0][i].draw(this.ctx, this);
        }

        for (let i = this.entities[3].length - 1; i >= 0; i--) {
            this.entities[3][i].draw(this.ctx, this);
        }
        this.camera.draw(this.ctx);

    };

    update() {
        let entitiesHeroCount = this.entities[0].length;
        let entitiesEnemiesCount = this.entities[1].length;
        let entitiesBackgroundCount = this.entities[2].length;
        let entitiesInventoryCount = this.entities[3].length;

        for (let i = 0; i < entitiesInventoryCount; i++) {
            let entity = this.entities[3][i];

            if (!entity.removeFromWorld) {
                entity.update();
            }
        }

        for (let i = 0; i < entitiesHeroCount; i++) {
            let entity = this.entities[0][i];
            if (!entity.removeFromWorld) {
                entity.update();
            }
        }
        for (let i = 0; i < entitiesEnemiesCount; i++) {
            let entity = this.entities[1][i];

            if (!entity.removeFromWorld) {
                entity.update();
            }
        }

        for (let i = 0; i < entitiesBackgroundCount; i++) {
            let entity = this.entities[2][i];

            if (!entity.removeFromWorld) {
                entity.update();
            }
        }

        

        this.removeFromWorldSplice(3);
        this.removeFromWorldSplice(0);
        this.removeFromWorldSplice(1);
        this.removeFromWorldSplice(2);
        
    };

    removeFromWorldSplice(level) {
        for (let i = this.entities[level].length - 1; i >= 0; --i) {
            if (this.entities[level][i].removeFromWorld) {
                this.entities[level].splice(i, 1);
            }
        }
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
        if(this.elapsedTime >= this.totalTime) {
            this.elapsedTime = 0;
            
            this.camera.update();
        }
        this.elapsedTime += 1;
    };

};

