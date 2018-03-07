const CUBE_SIZE = 6;
const NAMESPACE = 'http://www.w3.org/2000/svg';
const PIXEL_CHART_ID = 'pixel-chart-svg';
let totalIndex = 0;

export function createParent() {
  const svg = document.createElementNS(NAMESPACE, 'svg');

  svg.setAttributeNS(null, 'id', PIXEL_CHART_ID);
  svg.setAttributeNS(null, 'version', '1.2');

  return svg;
}

function createSvgRectForCoordinates(
  previousCoordinate,
  currentPointSet,
  nextCoordinate,
  index
) {
  const rect = document.createElementNS(NAMESPACE, 'rect');
  const yValueWillChange =
    nextCoordinate && nextCoordinate[1] !== currentPointSet[1];
  const indexIsOdd = index & 1; // eslint-disable-line

  rect.setAttributeNS(null, 'x', currentPointSet[0]);
  rect.setAttributeNS(null, 'y', currentPointSet[1]);
  rect.setAttributeNS(null, 'height', CUBE_SIZE);
  rect.setAttributeNS(null, 'width', CUBE_SIZE);
  rect.setAttributeNS(null, 'opacity', 0);

  if (previousCoordinate && nextCoordinate && !yValueWillChange) {
    rect.setAttributeNS(null, 'x', currentPointSet[0]);
    if (indexIsOdd) {
      rect.setAttributeNS(null, 'y', currentPointSet[1] - CUBE_SIZE / 3);
    }
  }

  return rect;
}

function createSvgAnimation(index, duration = 10) {
  const animation = document.createElementNS(NAMESPACE, 'animate');

  animation.setAttributeNS(null, 'attributeType', 'CSS');
  animation.setAttributeNS(null, 'attributeName', 'opacity');
  animation.setAttributeNS(null, 'dur', `100ms`);
  animation.setAttributeNS(null, 'fill', `freeze`);
  animation.setAttributeNS(null, 'from', 0);
  animation.setAttributeNS(null, 'to', 1);
  animation.setAttributeNS(null, 'begin', `${index * duration}ms`);

  return animation;
}

export default function svgRenderer(
  coordinates = [],
  chartHeight,
  idOfElementToAppendTo
) {
  let pixelChartElement = document.getElementById(PIXEL_CHART_ID);

  if (!pixelChartElement) {
    pixelChartElement = createParent();
    document
      .getElementById(idOfElementToAppendTo)
      .appendChild(pixelChartElement);
  }

  coordinates.forEach((coordinate, index) => {
    const previousCoordinate = coordinates[index - 1];
    const nextCoordinate = coordinates[index + 1];
    const rect = createSvgRectForCoordinates(
      previousCoordinate,
      coordinate,
      nextCoordinate,
      index
    );
    const animation = createSvgAnimation(totalIndex);

    rect.appendChild(animation);
    pixelChartElement.appendChild(rect);
    totalIndex += 1;
  });
}
