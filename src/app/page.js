import Image from "next/image";
import styles from "./page.module.css";
import SimpleRasterBar from "@/components/SimpleRasterBar";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <article>
        <h3>
          simple raster
        </h3>
        <SimpleRasterBar />
        </article>
      </main>
      <footer className={styles.footer}>
        footer
      </footer>
    </div>
  );
}
