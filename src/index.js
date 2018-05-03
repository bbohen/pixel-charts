import createLineCoordinates from './helpers/createLineCoordinates';
import svgRenderer from './renderers/svg';
import { DEFAULT_CHART_HEIGHT } from './constants';

export default function app({
  chartId = 'pixel-chart',
  data = [],
  height = DEFAULT_CHART_HEIGHT,
  increment = 50,
  renderer = svgRenderer
}) {
  const heightRatio = Math.max(...data) / height;
  const valuesAdjustedForChartHeight = data.map(value =>
    Math.round(value / heightRatio)
  );
  const pixelChartElement = document.getElementById(chartId);
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
        height
      );

      currentX += increment;
      renderer(coordinates, height, chartId);
    }
  });
}
