// Options for Cue Messages
//
export const COLOR_ARRAY = [
  [255, 255, 255], // WHITE
  [255, 0, 0], // RED
  [0, 255, 0], // GREEN
  [0, 0, 255] // BLUE
]
export enum Color {
  WHITE,
  RED,
  GREEN,
  BLUE,
}

export interface CharColor {
  char: string
  color: Color
}
