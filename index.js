// Keep <rect> generation seperate from raw SVG so rendering can be switched for native/etc?

import './styles.css';

const DEFAULT_CHART_HEIGHT = 365;
const CUBE_SIZE = 6;
const SVGNS = 'http://www.w3.org/2000/svg';
let totalIndex = 0;

function createLineCords(startX, startY, count, nextY, nextX, chartHeight) {
  // TODO: Clean this turd up
  let x = startX;
  let y = chartHeight - startY;
  let nexterY = chartHeight - nextY;
  const distance = chartHeight - nextY - startY;
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

function createSvgRectForPoint(
  previousPointSet,
  currentPointSet,
  nextPointSet,
  index
) {
  const rect = document.createElementNS(SVGNS, 'rect');
  const yValueWillChange =
    nextPointSet && nextPointSet[1] !== currentPointSet[1];
  const indexIsOdd = index & 1;

  rect.setAttributeNS(null, 'x', currentPointSet[0]);
  rect.setAttributeNS(null, 'y', currentPointSet[1]);
  rect.setAttributeNS(null, 'height', CUBE_SIZE);
  rect.setAttributeNS(null, 'width', CUBE_SIZE);
  rect.setAttributeNS(null, 'opacity', 0);

  if (previousPointSet && nextPointSet && !yValueWillChange) {
    rect.setAttributeNS(null, 'x', currentPointSet[0]);
    if (indexIsOdd) {
      rect.setAttributeNS(null, 'y', currentPointSet[1] - CUBE_SIZE / 3);
    }
  }

  return rect;
}

function createSvgAnimate(index, duration = 10) {
  const animate = document.createElementNS(SVGNS, 'animate');

  animate.setAttributeNS(null, 'attributeType', 'CSS');
  animate.setAttributeNS(null, 'attributeName', 'opacity');
  animate.setAttributeNS(null, 'dur', `100ms`);
  animate.setAttributeNS(null, 'fill', `freeze`);
  animate.setAttributeNS(null, 'from', 0);
  animate.setAttributeNS(null, 'to', 1);
  animate.setAttributeNS(null, 'begin', `${index * duration}ms`);

  return animate;
}

function renderChartBordersToSvg(chartHeight) {
  const xGrid = document.createElementNS(SVGNS, 'g');
  const xLine = document.createElementNS(SVGNS, 'line');
  const yGrid = document.createElementNS(SVGNS, 'g');
  const yLine = document.createElementNS(SVGNS, 'line');

  xGrid.setAttributeNS(null, 'class', 'grid x-grid');
  xGrid.setAttributeNS(null, 'id', 'xGrid');
  xLine.setAttributeNS(null, 'x1', '0');
  xLine.setAttributeNS(null, 'x2', '0');
  xLine.setAttributeNS(null, 'y1', '5');
  xLine.setAttributeNS(null, 'y2', `${chartHeight + 5}`);

  yGrid.setAttributeNS(null, 'class', 'grid y-grid');
  yGrid.setAttributeNS(null, 'id', 'yGrid');
  yLine.setAttributeNS(null, 'x1', '0');
  yLine.setAttributeNS(null, 'x2', '705');
  yLine.setAttributeNS(null, 'y1', `${chartHeight + 5}`);
  yLine.setAttributeNS(null, 'y2', `${chartHeight + 5}`);

  xGrid.appendChild(xLine);
  yGrid.appendChild(yLine);

  document.getElementById('pixel-chart-svg').appendChild(xGrid);
  document.getElementById('pixel-chart-svg').appendChild(yGrid);
}

function renderPointsToSvg(points = []) {
  points.forEach((pointSet, index) => {
    const previousPointSet = points[index - 1];
    const nextPointSet = points[index + 1];
    const rect = createSvgRectForPoint(
      previousPointSet,
      pointSet,
      nextPointSet,
      index
    );
    const animate = createSvgAnimate(totalIndex);

    rect.appendChild(animate);

    document.getElementById('pixel-chart-svg').appendChild(rect);

    totalIndex += 1;
  });
}

function app(
  data = [],
  chartHeight = DEFAULT_CHART_HEIGHT,
  renderer = renderPointsToSvg
) {
  const ratio = Math.max.apply(Math, data) / chartHeight;
  const adjustedValues = data.map(value => Math.round(value / ratio));
  const increment = 50;
  let currentX = 0;

  // TODO: Add the initial x and y lines that frame the chart to the DOM after doing the above calculations
  renderChartBordersToSvg(chartHeight);

  adjustedValues.forEach((item, index) => {
    const nextItem = adjustedValues[index + 1];
    if (nextItem) {
      const points = createLineCords(
        currentX,
        item,
        increment,
        nextItem,
        currentX + increment,
        chartHeight
      );
      currentX += increment;
      renderer(points);
    }
  });
}

function exampleUsage() {
  const sampleData = [
    0,
    20,
    40,
    100,
    120,
    140,
    160,
    300,
    300,
    350,
    200,
    100,
    50,
    120,
    270
  ];

  app(sampleData, 365);
}

window.onload = exampleUsage;
