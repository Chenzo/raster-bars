import { c64Colors } from "./c64Colors";

const blueGreen = [
  c64Colors.blue,
  c64Colors.lightblue,
  c64Colors.lightgray,
  c64Colors.lightgreen,
  c64Colors.white,
  c64Colors.white,
  c64Colors.lightgreen,
  c64Colors.lightgray,
  c64Colors.lightblue,
  c64Colors.blue,
];

const simpleRed = [
  c64Colors.red,
  c64Colors.lightred,
  c64Colors.white,
  c64Colors.white,
  c64Colors.lightred,
  c64Colors.red,
];

const goldArray = [
  c64Colors.brown,
  c64Colors.orange,
  c64Colors.yellow,
  c64Colors.white,
  c64Colors.yellow,
  c64Colors.orange,
  c64Colors.brown,
];

const grayBar = [
  c64Colors.black,
  c64Colors.darkgray,
  c64Colors.gray,
  c64Colors.lightgrey,
  c64Colors.gray,
  c64Colors.darkgray,
  c64Colors.black,
];

const bigGray = [
  c64Colors.black,
  c64Colors.darkgray,
  c64Colors.gray,
  c64Colors.lightgrey,
  c64Colors.white,
  c64Colors.lightgrey,
  c64Colors.gray,
  c64Colors.darkgray,
  c64Colors.black,
];

const bigGreen = [
  c64Colors.black,
  c64Colors.darkgray,
  c64Colors.green,
  c64Colors.lightgrey,
  c64Colors.lightgreen,
  c64Colors.white,
  c64Colors.lightgreen,
  c64Colors.lightgrey,
  c64Colors.green,
  c64Colors.darkgray,
  c64Colors.black,
];

const palettes = [
  { id: "blueGreen", label: "Blue Green", colors: blueGreen },
  { id: "simpleRed", label: "Simple Red", colors: simpleRed },
  { id: "gold", label: "Gold", colors: goldArray },
  { id: "grayBar", label: "Gray", colors: grayBar },
  { id: "bigGray", label: "Big Gray", colors: bigGray },
  { id: "bigGreen", label: "Big Green", colors: bigGreen },
];

export { palettes };
