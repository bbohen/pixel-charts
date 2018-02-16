// Keep <rect> generation seperate from raw SVG so rendering can be switched for native/etc?

import './styles.css';

const CHART_HEIGHT = 365;
const CUBE_SIZE = 8;

function createLineCords(startX, startY, count, nextY, nextX) {
  // TODO: Clean this turd up
  let x = startX;
  let y = CHART_HEIGHT - startY;
  let nexterY = CHART_HEIGHT - nextY;
  const distance = CHART_HEIGHT - nextY - startY;
  // need to find the right amount of increase
  const a = startX - nextX;
  const b = startY - nextY;
  const calculatedDistance = Math.sqrt(a * a + b * b);
  const angleRadians = Math.atan2(nexterY - y, nextX - startX);

  return Array.apply(0, Array(Math.ceil(calculatedDistance / CUBE_SIZE))).map(
    function(element, index) {
      const result = [x, y];
      const indexIsOdd = index & 1;

      y += CUBE_SIZE * Math.sin(angleRadians);
      x += CUBE_SIZE * Math.cos(angleRadians);

      return result;
    }
  );
}

function renderPointsToSvg(points = []) {
  const svgns = 'http://www.w3.org/2000/svg';
  points.forEach((pointSet, index) => {
    const rect = document.createElementNS(svgns, 'rect');
    const previousPointSet = points[index - 1];
    const nextPointSet = points[index + 1];
    const yValueWillChange = nextPointSet && nextPointSet[1] !== pointSet[1];

    rect.setAttributeNS(null, 'x', pointSet[0]);
    rect.setAttributeNS(null, 'y', pointSet[1]);
    rect.setAttributeNS(null, 'height', CUBE_SIZE);
    rect.setAttributeNS(null, 'width', CUBE_SIZE);

    if (previousPointSet && nextPointSet && !yValueWillChange) {
      rect.setAttributeNS(
        null,
        'transform',
        `rotate(45, ${pointSet[0] + CUBE_SIZE / 2}, ${pointSet[1] +
          CUBE_SIZE / 2})`
      );
    }

    document.getElementById('svgOne').appendChild(rect);
  });
}

function app(data = [], renderer = renderPointsToSvg) {
  const increment = 50;
  let currentX = 90;
  data.forEach((item, index) => {
    const nextItem = data[index + 1];
    if (nextItem) {
      const points = createLineCords(
        currentX,
        item,
        increment,
        nextItem,
        currentX + increment
      );
      currentX += increment;
      renderer(points);
    }
  });
}

function exampleUsage() {
  const sampleData = [0, 20, 40, 100, 120, 140, 160, 300, 300, 200, 100, 50];

  app(sampleData);
}

window.onload = exampleUsage;
