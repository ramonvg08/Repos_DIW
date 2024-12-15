let timeZones = [
    { city: "New York", offset: -5, activeHours: [8, 17] }, // 8AM-5PM
    { city: "Tokyo", offset: 9, activeHours: [19, 4] }, // 7PM-4AM
    { city: "Sydney", offset: 11, activeHours: [17, 2] }, // 5PM-2AM
    { city: "London", offset: 0, activeHours: [3, 12] }, // 3AM-12PM
  ];
  
  function setup() {
    let canvas = createCanvas(800, 180); 
    canvas.parent("relojes-container");
    textAlign(CENTER, CENTER);
    noStroke();
  }
  
  function draw() {
    clear();
  
    let numClocks = timeZones.length;
    let clockSize = width / numClocks;
  
    for (let i = 0; i < numClocks; i++) {
      let x = clockSize * i + clockSize / 2;
      let y = height / 2;
  
      drawClock(x, y, clockSize * 0.3, timeZones[i]);
    }
  }
  
  function drawClock(x, y, size, zone) {
    let now = new Date();
    let utcHours = now.getUTCHours();
    let estHours = (utcHours - 5 + 24) % 24; // Convertir UTC a EST
    let hours = (utcHours + zone.offset + 24) % 24; // Hora local de la zona
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
  
    let isActive = isActiveTime(estHours, zone.activeHours);
  
    // Fondo del reloj
    fill(isActive ? color(200, 255, 200) : 255);
    ellipse(x, y, size * 2);
  
    // Nombre de la ciudad
    fill(0);
    textSize(size * 0.2);
    text(zone.city, x, y - size * 1.3);
  
    // Dibujar los números de las horas
    fill(0);
    textSize(size * 0.15);
    for (let i = 1; i <= 12; i++) {
      let angle = map(i, 0, 12, 0, TWO_PI) - HALF_PI; // Calcular ángulo para cada hora
      let numX = x + cos(angle) * size * 0.8; // Posición X
      let numY = y + sin(angle) * size * 0.8; // Posición Y
      text(i, numX, numY); // Dibujar el número
    }
  
    // Agujas del reloj
    push();
    translate(x, y);
    rotate(map(hours % 12, 0, 12, 0, TWO_PI) - HALF_PI);
    stroke(0);
    strokeWeight(6);
    line(0, 0, size * 0.5, 0);
    pop();
  
    push();
    translate(x, y);
    rotate(map(minutes, 0, 60, 0, TWO_PI) - HALF_PI);
    stroke(0);
    strokeWeight(4);
    line(0, 0, size * 0.7, 0);
    pop();
  
    push();
    translate(x, y);
    rotate(map(seconds, 0, 60, 0, TWO_PI) - HALF_PI);
    stroke(255, 0, 0);
    strokeWeight(2);
    line(0, 0, size * 0.9, 0);
    pop();
  
    // Centro del reloj
    fill(0);
    ellipse(x, y, size * 0.1);
  }
  
  function isActiveTime(currentHour, activeHours) {
    let [start, end] = activeHours;
  
    if (start <= end) {
      return currentHour >= start && currentHour < end;
    } else {
      return currentHour >= start || currentHour < end;
    }
  }
  