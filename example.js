import pixelCharts from './src';

function exampleUsage() {
  const randomExampleValues = Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 400)
  );

  pixelCharts(randomExampleValues, 400, 'example-chart');
}

window.onload = exampleUsage;
