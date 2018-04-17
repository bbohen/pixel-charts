import chart from '../src';
import createRandomValues from '../test/helpers';

function exampleUsage() {
  // For the sake of an example, set the max value of the random numbers to the height of the chart
  // pixel-charts will adjust values to match provided chart height (if needed)
  const chartHeight = 400;
  const chartId = 'example-chart';
  const randomValuesLength = 16;
  const randomValues = createRandomValues(randomValuesLength, chartHeight);

  chart(randomValues, chartHeight, 50, chartId);
}

window.onload = exampleUsage;
