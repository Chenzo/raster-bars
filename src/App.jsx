import { useState } from "react";
import styles from "./App.module.css";
import { c64Colors } from "./constants/c64Colors";
import SimpleRasterBar from "@/components/SimpleRasterBar";

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

const palettes = {
  blueGreen,
  simpleRed,
  gold: goldArray,
};

export default function App() {
  const [palette, setPalette] = useState("blueGreen");
  const [width, setWidth] = useState("720");
  const [stretchFactor, setStretchFactor] = useState("2");
  const [speed, setSpeed] = useState("4");
  const [interlace, setInterlace] = useState(false);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Raster Bar Factory</h1>

        <section className={styles.preview}>
          <SimpleRasterBar
            colorArray={palettes[palette]}
            speed={Number(speed)}
            stretchFactor={Number(stretchFactor) || 1}
            interlace={interlace}
            width={Number(width) || undefined}
          />
        </section>

        <section className={styles.menu}>
          <div className={styles.menuRow}>
            <div className={styles.menuField}>
              <label className={styles.menuFieldLabel} htmlFor="palette">
                Palette
              </label>
              <select
                id="palette"
                name="palette"
                value={palette}
                onChange={(e) => setPalette(e.target.value)}
              >
                <option value="blueGreen">Blue Green</option>
                <option value="simpleRed">Simple Red</option>
                <option value="gold">Gold</option>
              </select>
            </div>

            <div className={styles.menuField}>
              <label className={styles.menuFieldLabel} htmlFor="width">
                Width
              </label>
              <input
                className={styles.menuFieldInput}
                id="width"
                name="width"
                type="text"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
              />
            </div>

            <div className={styles.menuField}>
              <label className={styles.menuFieldLabel} htmlFor="stretchFactor">
                Stretch Factor
              </label>
              <input
                className={styles.menuFieldInput}
                id="stretchFactor"
                name="stretchFactor"
                type="text"
                value={stretchFactor}
                onChange={(e) => setStretchFactor(e.target.value)}
              />
            </div>

            <div className={styles.menuField}>
              <label className={styles.menuFieldLabel} htmlFor="speed">
                Speed
              </label>
              <select
                className={styles.menuFieldInput}
                id="speed"
                name="speed"
                value={speed}
                onChange={(e) => setSpeed(e.target.value)}
              >
                <option value="1">1 - Fastest</option>
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="12">12</option>
                <option value="16">16</option>
                <option value="20">20 - Slowest</option>
              </select>
            </div>

            <div className={styles.menuField}>
              <label className={styles.menuFieldLabel} htmlFor="interlace">
                Interlace
              </label>
              <input
                id="interlace"
                name="interlace"
                type="checkbox"
                checked={interlace}
                onChange={(e) => setInterlace(e.target.checked)}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
