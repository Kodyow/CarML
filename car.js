class Car {
    constructor(game,x,y) {
        Object.assign(this,{game,x,y});
        this.loadProperties();
        this.updateBB();
    
    };



    updateBB() {
        const updateFunction = (widthOrg,heightOrg) => {
            const x = (widthOrg-this.x) *Math.cos(this.rotation*(Math.PI/180)) - (heightOrg-this.y) *Math.sin(this.rotation*(Math.PI/180))+this.x;
            const y = (widthOrg-this.x) *Math.sin(this.rotation*(Math.PI/180)) + (heightOrg-this.y) *Math.cos(this.rotation*(Math.PI/180))+this.y;
            return {x:x,y:y}
        }
        this.lastBB = this.BB;
        const backLeft = updateFunction(this.x - this.WIDTH/2,this.y - this.HEIGHT/2);
        const backRight = updateFunction(this.x - this.WIDTH/2,this.y + this.HEIGHT/2);
        const frontLeft = updateFunction(this.x + this.WIDTH/2,this.y + this.HEIGHT/2);
        const frontRight = updateFunction(this.x + this.WIDTH/2,this.y - this.HEIGHT/2);
        
        this.BB = new BoundingBox(backLeft, backRight, frontLeft, frontRight);
    }

    loadAnimation() {

    }

    loadProperties() {

        //initial
        this.WIDTH = 22.5;
        this.HEIGHT = 15;
        this.MASS = 1300;
        this.GRAVITY = 10;
        this.ROLLINGC = 0.2;
        this.rollingResistance = this.MASS * this.GRAVITY * this.ROLLINGC ;
        this.velocity = {x: 0,y: 0,total: 0};
        this.speedMultiplier = 0.0001;
        this.removeFromWorld = false;
        this.degreeOfRotation = 80;
        this.rotation = 0;
        
    }
    




    XYupdate(TICK) {

        const movement = this.velocity.total * this.speedMultiplier * TICK; 
        this.y +=  movement * Math.sin((Math.PI/180) * this.rotation);
        this.x += movement * Math.cos((Math.PI/180) * this.rotation);
        
    }

    update() {

        const TICK = this.game.clockTick;  

        if(this.game.up) {
            this.velocity.total += this.rollingResistance;
        }   
        else {
            if(this.velocity.total > 0) {
                if(this.game.break) {
                    this.velocity.total -= this.rollingResistance * 10;
                }
                else {
                    this.velocity.total -= this.rollingResistance;
                }
            } 
            else {
                this.velocity.total = 0;
            }


        }
        
        if(this.game.left) {
            this.rotation -= this.degreeOfRotation*TICK;
        }
        else if (this.game.right) {
            this.rotation += this.degreeOfRotation*TICK;
        } 
        this.XYupdate(TICK);
        this.updateBB();

        
    }


    draw(ctx) {
        
        ctx.save();
        //offscreenCtx.imageSmoothingEnabled = false;
        
        ctx.translate(this.x,this.y);
        ctx.rotate(this.rotation*Math.PI/180);     
        ctx.translate(-this.WIDTH/2, -this.HEIGHT/2);

        ctx.fillRect(0,0,this.WIDTH,this.HEIGHT);


        ctx.restore();
        //ctx.fillRect(0,0,this.WIDTH,this.HEIGHT);
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2, true);
        ctx.stroke();

        if (PARAMS.DEBUG) { 
            ctx.strokeStyle = 'Red';
            
            ctx.beginPath();
            ctx.arc(this.BB.backLeft.x, this.BB.backLeft.y,2, 0, Math.PI * 2, true);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(this.BB.backRight.x, this.BB.backRight.y,2, 0, Math.PI * 2, true);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(this.BB.frontLeft.x, this.BB.frontLeft.y,2, 0, Math.PI * 2, true);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(this.BB.frontRight.x, this.BB.frontRight.y,2, 0, Math.PI * 2, true);
            ctx.stroke();
            //ctx.strokeRect(this.BB.x + attackX, this.BB.y + 3, this.BB.width + attackWidth, this.BB.height);
            //ctx.fillRect(this.x - this.WIDTH/2, this.y - this.HEIGHT/2,this.WIDTH,this.HEIGHT);
            ctx.strokeRect(this.x - this.WIDTH/2, this.y - this.HEIGHT/2,this.WIDTH,this.HEIGHT);
        }
    };
};


//////////////////////////////////////////////////////////////////

