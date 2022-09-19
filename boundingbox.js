class BoundingBox {
    constructor(backLeft, backRight, frontLeft, frontRight) {
        Object.assign(this, { backLeft, backRight, frontLeft, frontRight });

        // this.left = x;
        // this.top = y;
        // this.right = this.left + this.width;
        // this.bottom = this.top + this.height;
    };

    collide(oth) {
        if (this.right > oth.left && this.left < oth.right && this.top < oth.bottom && this.bottom > oth.top) return true;
        return false;
    };
};