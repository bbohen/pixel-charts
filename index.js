// Keep <rect> generation seperate from raw SVG so rendering can be switched for native/etc?

import "./styles.css";

function createLineCords(startX, startY, count, nextY, nextX) {
  let x = startX;
  let y = 365 - startY;
  let nexterY = 365 - nextY;
  const distance = 365 - nextY - startY;
  // need to find the right amount of increase
  const a = startX - nextX;
  const b = startY - nextY;
  const calculatedDistance = Math.sqrt(a * a + b * b);
  const ratio = 5;
  const amount = calculatedDistance / 5;
  // angle in radians
  const angleRadians = Math.atan2(nextY - startY, nextX - startX);

  // angle in degrees
  const angleDeg = Math.atan2(nexterY - y, nextX - startX) * 180 / Math.PI;
  const otherDeg = Math.atan2(y - nexterY, startX - nextX) * 180 / Math.PI;

  console.log("****************");
  console.log("startY", startY);
  console.log("nextY", nextY);
  console.log("startX", startX);
  console.log("nextX", nextX);
  console.log("y", y);
  console.log("nexterY", nexterY);
  console.log("calculated distance", calculatedDistance);
  console.log("angleRadians", angleRadians);
  console.log("degree", angleDeg);
  console.log("other degree", otherDeg);
  console.log("****************");

  return Array.apply(0, Array(Math.ceil(calculatedDistance / 5))).map(function(
    element,
    index
  ) {
    const result = [x, y];
    const indexIsOdd = index & 1;

    console.log(5 * Math.sin(angleDeg));
    y -= Math.abs(5 * Math.sin(angleDeg));

    console.log(5 * Math.cos(angleDeg));
    x += Math.abs(5 * Math.cos(angleDeg));

    return result;
  });
}

function renderPointsToDom(points = []) {
  const svgns = "http://www.w3.org/2000/svg";
  points.forEach(pointSet => {
    const rect = document.createElementNS(svgns, "rect");

    rect.setAttributeNS(null, "x", pointSet[0]);
    rect.setAttributeNS(null, "y", pointSet[1]);
    rect.setAttributeNS(null, "height", "5");
    rect.setAttributeNS(null, "width", "5");

    document.getElementById("svgOne").appendChild(rect);
  });
}

function app(data = [], renderer = renderPointsToDom) {
  const increment = 50;
  let currentX = 90;
  data.forEach((item, index) => {
    const nextItem = data[index + 1];
    const points = createLineCords(
      currentX,
      item,
      increment,
      nextItem,
      currentX + increment
    );
    currentX += increment;
    renderer(points);
  });
}

function exampleUsage() {
  // const sampleData = [0, 40, 80, 30, 30, 140, 160, 50, 100, 40, 5, 4];
  const sampleData = [0, 80, 100, 120, 140, 160, 300, 300];

  app(sampleData);
}

window.onload = exampleUsage;
