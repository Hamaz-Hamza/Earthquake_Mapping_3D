class ImpactIndicator {
    constructor(locX, locY, locZ, magnitude, col) {
        this.location = createVector(locX,locY,locZ);
        this.size = magnitude
        this.colour = col
    }
}
