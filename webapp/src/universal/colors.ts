export const colors = {
  Maroon: 0x800000,
  Pink: 0xfabebe,
  Orange: 0xf58231,
  Yellow: 0xffe119,
  Navy: 0x000075,
  Blue: 0x4363d8,
  Lavender: 0xe6beff,
};

export const colorNames = {
  '#800000': 'Maroon',
  '#fabebe': 'Pink',
  '#f58231': 'Orange',
  '#ffe119': 'Yellow',
  '#000075': 'Navy',
  '#4363d8': 'Blue',
  '#e6beff': 'Lavender',
};

// https://sashat.me/2017/01/11/list-of-20-simple-distinct-colors/
export const rainbow = [
  colors.Maroon,
  colors.Pink,
  colors.Orange,
  colors.Yellow,
  colors.Navy,
  colors.Blue,
  colors.Lavender,
];

export function toHexString (color: number) {
  const paddedColor = '000000' + color.toString(16);
  return '#' + paddedColor.slice(-6);
}

export function getRGBComponents (color: number) {
  const r = (color & 0x000000FF);
  const g = ((color & 0x0000FF00) >> 8);
  const b = ((color & 0x00FF0000) >> 16);

  return [ r, g, b ];
}

export function getLightness (color: number) {
  const [ r, g, b ] = getRGBComponents(color);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  return (max + min) / 2;
  // return (r + g + b) / 3;
}
