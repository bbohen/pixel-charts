![pixel charts](example/logo.png)

Simple charting library with lines between values represented as series of boxes.

![example](example/example.gif)

## Installation

```
npm install pixel-charts --save
```

## Example

```javascript
import chart from 'pixel-charts';

function exampleUsage() {
  // Y axis is scaled to match these values
  const values = [10, 15, 30, 60];
  // Optional
  const chartHeight = 400;
  // Optional
  const chartId = 'example-chart';

  chart(values, chartHeight, chartId);
}

window.onload = exampleUsage;
```

Check out [the full example](example) for more.

## Why?

I wanted "retro looking" charts for [a stock tracker](https://github.com/bbohen/re-robinhood) I'm working on and didn't really see any options. This led to me trying to figure out what a "retro looking" chart even is (still trying to make it look better, help is welcome). I think there are possibly some cool ways to visualize and animate data with boxes instead of lines.
