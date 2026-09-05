'use client';

import { useEffect, useRef } from "react";
import styles from "./SimpleRasterBar.module.css";


export default function SimpleRasterBar({ colorArray, speed, stretchFactor, interlace, width }) {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  const scrollOffsetRef = useRef(0);
  const frameCounterRef = useRef(0);
  const bufferRef = useRef([]);

  // Rebuild the stretched + interlaced buffer whenever the pattern options change
  useEffect(() => {
    const buffer = [];

    colorArray.forEach((color, index) => {
      for (let i = 0; i < stretchFactor; i++) {
        buffer.push(color);
      }
      if (interlace && index < colorArray.length - 1) {
        buffer.push("#000");
      }
    });

    bufferRef.current = [...buffer, ...buffer]; // Double for seamless scroll
    scrollOffsetRef.current = 0;
    frameCounterRef.current = 0;
  }, [colorArray, stretchFactor, interlace]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const draw = () => {
      const colorBuffer = bufferRef.current;
      const bufferHeight = colorBuffer.length;
      const visibleHeight = bufferHeight / 2;

      const canvasWidth = canvas.parentElement.offsetWidth;
      canvas.width = canvasWidth;
      canvas.height = visibleHeight;

      const scrollOffset = scrollOffsetRef.current;
      const start = scrollOffset % bufferHeight;

      for (let y = 0; y < visibleHeight; y++) {
        const color = colorBuffer[(start + y) % bufferHeight];
        ctx.fillStyle = color;
        ctx.fillRect(0, y, canvasWidth, 1);
      }

      // Delay the scroll using frameCounter
      frameCounterRef.current++;
      if (frameCounterRef.current >= speed) {
        scrollOffsetRef.current += 1;
        frameCounterRef.current = 0;
      }

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [speed]);

  return (
    <section
      className={styles.rasterbar}
      style={width ? { width: `${width}px` } : undefined}
    >
      <div className={styles.rasterBarHolder}>
        <canvas ref={canvasRef} />
      </div>
    </section>
  );
}
