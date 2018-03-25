import { PIXEL_CHART_ID } from '../constants';

export default function createPixelChartSVGId(id) {
  return `pixel-chart-svg-${id || PIXEL_CHART_ID}`;
}
