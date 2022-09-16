class Animator {
    constructor(spriteSheet, xStart, yStart, width, height, 
        frameCount, frameDuration, framePadding, reverse, loop) {

        Object.assign(this, {spriteSheet, xStart, 
            yStart, width, height, frameCount, frameDuration, framePadding, 
            reverse, loop});

        this.elapsedTime = 0;
        this.totalTime = this.frameCount * this.frameDuration;
    }

    drawFrame(tick, ctx, x, y, scale) {
        this.elapsedTime += tick;

        if (this.isDone()) {
            if (this.loop) {
                this.elapsedTime -= this.totalTime;
            } else {
                console.log("drawing empty frame");
                return;
            }
        }

        let frame = this.currentFrame();
        if (this.reverse) frame = this.frameCount - frame - 1;


        ctx.drawImage(this.spriteSheet,
            this.xStart + frame * (this.width + this.framePadding), this.yStart, //source from sheet
            this.width, this.height,
            x, y,
            this.width * scale,
            this.height * scale);
    };

    drawFrameY(tick, ctx, x, y, scale) {
        this.elapsedTime += tick;

        if (this.isDone()) {
            if (this.loop) {
                this.elapsedTime -= this.totalTime;
            } else {
                console.log("drawing empty frame");
                return;
            }
        }

        let frame = this.currentFrame();
        if (this.reverse) frame = this.frameCount - frame - 1;


        ctx.drawImage(this.spriteSheet,
            this.xStart, this.yStart + frame * (this.height + this.framePadding), //source from sheet
            this.width, this.height,
            x, y,
            this.width * scale,
            this.height * scale);
    };



    currentFrame() {
        let currFrame = Math.floor(this.elapsedTime / this.frameDuration);
        return currFrame;
    };

    drawFrameReverse(tick, ctx, x, y, scale) {
        if (this.isDone()) {
            if (this.loop) {
                this.elapsedTime -= this.totalTime;
            } else {
                console.log("drawing empty frame");
                return;
            }
        }

        let frame = this.currentFrame();
        if (this.reverse) frame = this.frameCount - frame - 1;
        var offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.height = this.height * scale;
        offscreenCanvas.width = this.width * scale;
        var offscreenCtx = offscreenCanvas.getContext('2d');
        offscreenCtx.imageSmoothingEnabled = false;
        offscreenCtx.save();
        offscreenCtx.scale(-scale,scale);
        this.elapsedTime += tick;
        offscreenCtx.drawImage(this.spriteSheet,
            this.xStart + frame * (this.width + this.framePadding), this.yStart, //source from sheet
            this.width, this.height,
            -(this.width), 0,
            this.width,
            this.height);
        offscreenCtx.restore();
        ctx.drawImage(offscreenCanvas,x,y);

    }

    drawFrameReverseY(tick, ctx, x, y, scale) {
        if (this.isDone()) {
            if (this.loop) {
                this.elapsedTime -= this.totalTime;
            } else {
                console.log("drawing empty frame");
                return;
            }
        }

        let frame = this.currentFrame();
        if (this.reverse) frame = this.frameCount - frame - 1;
        var offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.width = this.width*scale;
        offscreenCanvas.height = this.width*scale;
        var offscreenCtx = offscreenCanvas.getContext('2d');
        offscreenCtx.imageSmoothingEnabled = false;
        offscreenCtx.save();
        offscreenCtx.scale(-scale,scale);
        this.elapsedTime += tick;
        offscreenCtx.drawImage(this.spriteSheet,
            this.xStart, this.yStart +frame * (this.height + this.framePadding), //source from sheet
            this.width, this.height,
            -(this.width),0,
            this.width,
            this.height);
        offscreenCtx.restore();
        ctx.drawImage(offscreenCanvas,x,y);
    }

    isDone() {
        let isDoneVar = (this.elapsedTime >= this.totalTime)
        return isDoneVar;
    };

}