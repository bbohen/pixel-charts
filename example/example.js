import chart from '../src';
import createRandomValues from '../test/helpers';

function exampleUsage() {
  // For the sake of an example, set the max value of the random numbers to the height of the chart
  // pixel-charts will adjust values to match provided chart height (if needed)
  const chartHeight = 400;
  const chartId = 'example-chart';
  const randomValuesLength = 16;
  const randomValues = createRandomValues(randomValuesLength, chartHeight);

  const dev_tool_values = [
    13.5138,
    13.49,
    13.355,
    13.275,
    13.305,
    13.32,
    13.28,
    13.245,
    13.2448,
    13.3036,
    13.335,
    13.325,
    13.425,
    13.3933,
    13.3942,
    13.39,
    13.4333,
    13.4,
    13.367,
    13.385,
    13.33,
    13.365,
    13.3501,
    13.355,
    13.3549,
    13.335,
    13.2989,
    13.3,
    13.2969,
    13.275,
    13.2708,
    13.305,
    13.27,
    13.265,
    13.25,
    13.305,
    13.285,
    13.2932,
    13.32
  ];

  chart(dev_tool_values, 8000, 10, chartId);
}

window.onload = exampleUsage;
