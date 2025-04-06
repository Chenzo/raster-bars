

//import styles from "./SimpleRasterBar.module.css";
import c64Colors from "../constants/c64Colors";
export default function SimpleRasterBar() {


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
        c64Colors.blue
    ];


  return (
    <section className={styles.rasterbar}>
      <div className={rasterBarHolder}>
        rasterbar here
      </div>
    </section>
  );
}
