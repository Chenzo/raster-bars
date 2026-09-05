import styles from "./App.module.css";
import { c64Colors } from "./constants/c64Colors";
import SimpleRasterBar from "@/components/SimpleRasterBar";

export default function App() {


  const colorArray = [
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
    c64Colors.red
  ];

  const goldArray = [
    c64Colors.brown,
    c64Colors.orange,
    c64Colors.yellow,
    c64Colors.white,
    c64Colors.yellow,
    c64Colors.orange,
    c64Colors.brown,
  ]


  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <article>
          <h3>
            simple raster
          </h3>
          <SimpleRasterBar colorArray={colorArray} speed={4} stretchFactor={3} interlace={false} />
          <p>red</p>
          <SimpleRasterBar colorArray={simpleRed} speed={8} stretchFactor={2} interlace={true} />
          <p>gold</p>
          <SimpleRasterBar colorArray={goldArray} speed={8} stretchFactor={4} interlace={true} />
        </article>
      </main>
      {/* <footer className={styles.footer}>
        footer
      </footer> */}
    </div>
  );
}
