'use client';

import { useEffect, useRef, useState } from "react";
import styles from "./SimpleRasterBar.module.css";
import { c64Colors } from "../constants/c64Colors";

export default function SimpleRasterBar() {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

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

  const [speed, setSpeed] = useState(3); // Higher = slower
  const stretchFactor = 3;
  const interlace = true;

  const scrollOffsetRef = useRef(0);
  const frameCounterRef = useRef(0);
  const bufferRef = useRef([]);

  // Build stretched + interlaced buffer once
  if (bufferRef.current.length === 0) {
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
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const colorBuffer = bufferRef.current;
    const bufferHeight = colorBuffer.length;
    const visibleHeight = bufferHeight / 2;

    const draw = () => {
      const width = canvas.parentElement.offsetWidth;
      canvas.width = width;
      canvas.height = 20; //visibleHeight;

      const scrollOffset = scrollOffsetRef.current;
      const start = scrollOffset % bufferHeight;

      for (let y = 0; y < visibleHeight; y++) {
        const color = colorBuffer[(start + y) % bufferHeight];
        ctx.fillStyle = color;
        ctx.fillRect(0, y, width, 1);
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
  }, [speed, stretchFactor, interlace]);

  // Keyboard speed control (↑ slower, ↓ faster)
  useEffect(() => {
    const handleKeyDown = (evt) => {
      if (evt.key === "ArrowUp") {
        setSpeed((prev) => Math.min(60, prev + 1)); // slower
      } else if (evt.key === "ArrowDown") {
        setSpeed((prev) => Math.max(1, prev - 1)); // faster
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className={styles.rasterbar}>
      <div className={styles.rasterBarHolder}>
        <canvas ref={canvasRef} />
      </div>
    </section>
  );
}
