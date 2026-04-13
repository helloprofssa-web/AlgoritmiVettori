export function parseVector(text) {
  return text
    .split(",")
    .map((x) => x.trim())
    .filter((x) => x !== "")
    .map(Number)
    .filter((x) => !Number.isNaN(x));
}