import createLineCoordinates from './createLineCoordinates';
import svgRenderer from './svgRenderer';

import './styles.css';

const DEFAULT_CHART_HEIGHT = 365;

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
