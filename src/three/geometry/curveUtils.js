export function soriOffset(t, curve = 1.6, exponent = 1.7) {
  return curve * Math.pow(t, exponent);
}
export function soriSlope(t, curve = 1.6, exponent = 1.7) {
  return curve * exponent * Math.pow(Math.max(t, 1e-4), exponent - 1);
}
