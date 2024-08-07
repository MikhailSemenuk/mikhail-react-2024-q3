export default function generateArray(n: number) {
  return new Array(n).fill(1).map((value, index) => value + index);
}
