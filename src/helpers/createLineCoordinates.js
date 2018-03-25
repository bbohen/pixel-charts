import { CUBE_SIZE } from '../constants';

export default function createLineCoordinates(
  currentX,
  currentY,
  nextX,
  nextY,
  count,
  chartHeight
) {
  let x = currentX;
  let y = chartHeight - currentY;
  const adjustedNextY = chartHeight - nextY;
  const xDelta = currentX - nextX;
  const yDelta = currentY - nextY;
  const calculatedDistance = Math.sqrt(xDelta * xDelta + yDelta * yDelta);
  const angleRadians = Math.atan2(adjustedNextY - y, nextX - currentX);

  // Create a line of x/y coordinates to the next set of points
  return Array.apply(0, Array(Math.ceil(calculatedDistance / CUBE_SIZE))).map(
    () => {
      const result = [x, y];

      x += CUBE_SIZE * Math.cos(angleRadians);
      y += CUBE_SIZE * Math.sin(angleRadians);

      return result;
    }
  );
}
