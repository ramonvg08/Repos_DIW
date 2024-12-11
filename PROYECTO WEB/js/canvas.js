function setup() {
    // Crear el Canvas en un DIV específico
    let canvasDiv = document.getElementById('canvas-container');
    let canvas = createCanvas(canvasDiv.offsetWidth, 400);
    canvas.parent('canvas-container');

    // Configurar el fondo inicial
    background(220);
}

function draw() {
    // Ejemplo de interacción: Dibujar un círculo siguiendo el ratón
    if (mouseIsPressed) {
        fill(random(255), random(255), random(255));
        noStroke();
        ellipse(mouseX, mouseY, 20, 20);
    }
}

function windowResized() {
    let canvasDiv = document.getElementById('canvas-container');
    resizeCanvas(canvasDiv.offsetWidth, 400);
}

function keyPressed() {
    if (key === 'r') background(255, 0, 0); // Fondo rojo
    if (key === 'g') background(0, 255, 0); // Fondo verde
    if (key === 'b') background(0, 0, 255); // Fondo azul
    if (key === 'w') background(255); // Fondo blanco
}
