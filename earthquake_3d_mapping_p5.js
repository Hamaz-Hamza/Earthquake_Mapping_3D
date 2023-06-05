let radius = 240;
let map;
let earthquakeData;
let clickLocation;
let rotX = 0, rotY = 0;
let saveRotX = 0, saveRotY = 0;
let firstDrag = true;
let impacts = [];

function preload() {
    map = loadImage('map.jpg'); 
    earthquakeData = loadStrings("earthquake_data.csv");
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    noStroke();
    reloadIndicators();
}

function draw() {
    background(0);

    rotateX(saveRotY + rotY);
    rotateY(saveRotX + rotX);

    noStroke();

    push();
    texture(map);
    sphere(radius);
    pop();

    for (const impact of impacts) {
        push();
        translate(impact.location);
        fill(impact.colour)
        sphere(impact.size);
        pop();
    }
}

function reloadIndicators(){
    impacts = [];
    let location;
    let magnitude;
    let impactColor;
    for (let i = 1; i < earthquakeData.length; i++) {
        data = earthquakeData[i].split(",");
        location = convertToXYZ(parseFloat(data[1]), parseFloat(data[2]));
        magnitude = pow(12, parseFloat(data[4])/7);
        impactColor = color(200,0,0);
        impacts.push(new ImpactIndicator(location.x, location.y, location.z, magnitude, impactColor));
    }
}

function convertToXYZ(lat, lon) {
    let v = createVector(-parseInt(radius * sin(radians(lon)) * cos(radians(lat))),
        -parseInt(radius * sin(radians(lat))),
        -parseInt(radius * cos(radians(lon)) * cos(radians(lat))));
    return v;
}

function mouseDragged() {
    if (!mouseInCanvas()) { return; }
    
    if (firstDrag) {
        clickLocation = createVector(mouseX, mouseY);
        firstDrag = false;
    }
    rotX = mouseX-clickLocation.x;
    rotY = mouseY-clickLocation.y;

    rotX = rotX * TWO_PI / width;
    rotY = -(rotY * PI / height);
}

function mouseReleased() {
    if (!mouseInCanvas()) { return; }

    saveRotX += rotX;
    saveRotY += rotY;

    rotX = 0;
    rotY = 0;

    firstDrag = true;
}

function mapRange (value, a, b, c, d) {
    value = (value - a) / (b - a);
    return c + value * (d - c);
}

function mouseInCanvas(){
    return mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height;
}
