import createCoordinates from './createCoordinates';
import svgRenderer, { createParent } from './svgRenderer';

import './styles.css';

const DEFAULT_CHART_HEIGHT = 365;

export default function app(
  data = [],
  chartHeight = DEFAULT_CHART_HEIGHT,
  idOfElementToAppendTo = 'pixel-chart',
  renderer = svgRenderer
) {
  const heightRatio = Math.max.apply(Math, data) / chartHeight;
  const valuesAdjustedForChartHeight = data.map(value =>
    Math.round(value / heightRatio)
  );
  const increment = 50;
  let currentX = 0;

  valuesAdjustedForChartHeight.forEach((value, index) => {
    const nextValue = valuesAdjustedForChartHeight[index + 1];
    if (nextValue) {
      const coordinates = createCoordinates(
        currentX,
        value,
        currentX + increment,
        nextValue,
        increment,
        chartHeight
      );

      currentX += increment;
      renderer(coordinates, chartHeight, idOfElementToAppendTo);
    }
  });
}
