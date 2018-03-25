import createLineCoordinates from './helpers/createLineCoordinates';
import svgRenderer from './renderers/svg';
import { DEFAULT_CHART_HEIGHT } from './constants';

export default function app(
  data = [],
  chartHeight = DEFAULT_CHART_HEIGHT,
  idOfElementToAppendTo = 'pixel-chart',
  renderer = svgRenderer
) {
  const heightRatio = Math.max(...data) / chartHeight;
  const valuesAdjustedForChartHeight = data.map(value =>
    Math.round(value / heightRatio)
  );
  const increment = 50;
  let currentX = 0;

  valuesAdjustedForChartHeight.forEach((value, index) => {
    const nextX = currentX + increment;
    const nextValue = valuesAdjustedForChartHeight[index + 1];
    if (nextValue) {
      const coordinates = createLineCoordinates(
        currentX,
        value,
        nextX,
        nextValue,
        increment,
        chartHeight
      );

      currentX += increment;
      renderer(coordinates, chartHeight, idOfElementToAppendTo);
    }
  });
}
