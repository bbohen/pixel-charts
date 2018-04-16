import { CUBE_SIZE, NAMESPACE } from '../constants';
import createPixelChartSVGId from '../helpers/createPixelChartSVGId';

let totalIndex = 0; // eslint-disable-line

function createParent(id) {
  const svg = document.createElementNS(NAMESPACE, 'svg');

  svg.setAttributeNS(null, 'id', createPixelChartSVGId(id));
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
  rect.setAttributeNS(null, 'opacity', 1);

  if (previousCoordinate && nextCoordinate && !yValueWillChange) {
    rect.setAttributeNS(null, 'x', currentPointSet[0]);
    if (indexIsOdd) {
      rect.setAttributeNS(null, 'y', currentPointSet[1] - CUBE_SIZE / 3);
    }
  }

  return rect;
}

// @deprecated
// Not being used until delayed render issue resolved
// function createSvgAnimation(index, duration = 10) {
//   const animation = document.createElementNS(NAMESPACE, 'animate');

//   animation.setAttributeNS(null, 'attributeType', 'CSS');
//   animation.setAttributeNS(null, 'attributeName', 'opacity');
//   animation.setAttributeNS(null, 'dur', `100ms`);
//   animation.setAttributeNS(null, 'fill', `freeze`);
//   animation.setAttributeNS(null, 'from', 0);
//   animation.setAttributeNS(null, 'to', 1);
//   animation.setAttributeNS(null, 'begin', `${index * duration}ms`);

//   return animation;
// }

export default function svgRenderer(
  coordinates = [],
  chartHeight,
  idOfElementToAppendTo
) {
  let pixelChartElement = document.getElementById(
    createPixelChartSVGId(idOfElementToAppendTo)
  );

  if (!pixelChartElement) {
    pixelChartElement = createParent(idOfElementToAppendTo);
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

    // Disabled animations until delayed render issue resolved
    // const animation = createSvgAnimation(totalIndex);
    // rect.appendChild(animation);

    pixelChartElement.appendChild(rect);
    totalIndex += 1;
  });
}
