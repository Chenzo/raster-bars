import { useState } from "react";
import styles from "./App.module.css";
import { palettes } from "./constants/palettes";
import SimpleRasterBar from "@/components/SimpleRasterBar";
import { downloadRasterBarGif } from "./lib/downloadRasterBarGif";

export default function App() {
  const [palette, setPalette] = useState(palettes[0].id);
  const [width, setWidth] = useState("720");
  const [stretchFactor, setStretchFactor] = useState("2");
  const [speed, setSpeed] = useState("4");
  const [sizeMultiplier, setSizeMultiplier] = useState("1");
  const [interlace, setInterlace] = useState(false);

  const selectedPalette = palettes.find((p) => p.id === palette);

  const handleDownloadGif = () => {
    downloadRasterBarGif({
      colorArray: selectedPalette.colors,
      stretchFactor: Number(stretchFactor) || 1,
      interlace,
      width: Number(width) || 720,
      speed: Number(speed) || 1,
      sizeMultiplier: Number(sizeMultiplier) || 1,
      filename: `${palette}-raster-bar.gif`,
    });
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Raster Bar Factory</h1>

        <section className={styles.preview}>
          <SimpleRasterBar
            colorArray={selectedPalette.colors}
            speed={Number(speed)}
            stretchFactor={Number(stretchFactor) || 1}
            sizeMultiplier={Number(sizeMultiplier) || 1}
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
                {palettes.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
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
              <select
                className={styles.menuFieldInput}
                id="stretchFactor"
                name="stretchFactor"
                value={stretchFactor}
                onChange={(e) => setStretchFactor(e.target.value)}
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.menuField}>
              <label className={styles.menuFieldLabel} htmlFor="sizeMultiplier">
                Size
              </label>
              <select
                className={styles.menuFieldInput}
                id="sizeMultiplier"
                name="sizeMultiplier"
                value={sizeMultiplier}
                onChange={(e) => setSizeMultiplier(e.target.value)}
              >
                <option value="1">1</option>
                <option value="1.25">1.25</option>
                <option value="1.5">1.5</option>
                <option value="1.75">1.75</option>
                <option value="2">2</option>
              </select>
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
                <option value="0.1">0.1 - Fastest</option>
                <option value="0.25">0.25</option>
                <option value="0.5">0.5</option>
                <option value="0.75">0.75</option>
                <option value="1">1</option>
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

        <div className={styles.downloadRow}>
          <button
            type="button"
            className={styles.downloadButton}
            onClick={handleDownloadGif}
          >
            Download GIF
          </button>
        </div>
      </main>
    </div>
  );
}
