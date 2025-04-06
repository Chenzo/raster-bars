'use client'

import { useEffect, useRef } from "react";
import styles from "./SimpleRasterBar.module.css";
import { c64Colors } from "../constants/c64Colors";
import { userAgentFromString } from "next/server";
export default function SimpleRasterBar() {

  const canvasRef = useRef(null);
  const animationFrameRef = userAgentFromString(null);


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

  const colorArrayRef = useRef([...colorArray]);
  const frameCounterRef = useRef(0);
  const speed = 14;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !colorArrayRef) return;
    const height = colorArray.length;
    const width = canvas.parentElement.offsetWidth;

    const draw = () => {
      frameCounterRef.current++;
      if (frameCounterRef.current >= speed) {


        canvas.width = width;
        canvas.height = height;

        const colorArray = colorArrayRef.current;
        colorArray.forEach((color, index) => {
          ctx.fillStyle = color;
          ctx.fillRect(0, index, width, 1);
        });

        // Rotate the array for animation
        colorArray.push(colorArray.shift());
        frameCounterRef.current = 0;
      }


      // Request next frame
      animationFrameRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [colorArray]);

  return (
    <section className={styles.rasterbar}>
      <div className={styles.rasterBarHolder}>
        <canvas ref={canvasRef} />
      </div>
    </section>
  );
}
