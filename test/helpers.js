export default function createRandomValues(length = 10, maxValue = 100) {
  return Array.from({ length }, () => Math.floor(Math.random() * maxValue));
}
