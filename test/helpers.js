export function createRandomValues(length = 10, maxValue = 100) {
  return Array.from({ length: length }, () =>
    Math.floor(Math.random() * maxValue)
  );
}
