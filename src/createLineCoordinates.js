const CUBE_SIZE = 6;

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

  return Array.apply(0, Array(Math.ceil(calculatedDistance / CUBE_SIZE))).map(
    function(element, index) {
      const result = [x, y];
      const indexIsOdd = index & 1;

      y += CUBE_SIZE * Math.sin(angleRadians);
      x += CUBE_SIZE * Math.cos(angleRadians);

      return result;
    }
  );
}
