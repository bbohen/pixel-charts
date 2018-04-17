import createLineCoordinates from './helpers/createLineCoordinates';
import svgRenderer from './renderers/svg';
import { DEFAULT_CHART_HEIGHT } from './constants';

export default function app(
  data = [],
  chartHeight = DEFAULT_CHART_HEIGHT,
  increment = 50,
  idOfElementToAppendTo = 'pixel-chart',
  renderer = svgRenderer
) {
  const heightRatio = Math.max(...data) / chartHeight;
  const valuesAdjustedForChartHeight = data.map(value =>
    Math.round(value / heightRatio)
  );
  const pixelChartElement = document.getElementById(idOfElementToAppendTo);
  let currentX = 0;

  if (pixelChartElement) {
    pixelChartElement.innerHTML = '';
  }

  valuesAdjustedForChartHeight.forEach((value, index) => {
    const currentY = value;
    const nextX = currentX + increment;
    const nextY = valuesAdjustedForChartHeight[index + 1];
    if (nextY) {
      const coordinates = createLineCoordinates(
        currentX,
        currentY,
        nextX,
        nextY,
        increment,
        chartHeight
      );

      currentX += increment;
      renderer(coordinates, chartHeight, idOfElementToAppendTo);
    }
  });
}
