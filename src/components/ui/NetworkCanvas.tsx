"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  accent: "white" | "orange" | "green";
};

const EDGE_LEVELS = 5;

const colors = {
  white: "255,255,255",
  orange: "243,146,0",
  green: "46,204,113",
};

/**
 * Animated constellation (nodes + edges) filling its parent.
 * Nodes drift, link up when close, and react to the mouse pointer.
 */
export function NetworkCanvas({
  density = 26000,
  className = "network-canvas",
}: {
  /** Pixels² per node — lower means more nodes. */
  density?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const parent = canvas?.parentElement;
    if (!canvas || !ctx || !parent) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let nodes: Node[] = [];
    let raf = 0;
    let running = false;
    let width = 0;
    let height = 0;
    const pointer = { x: -9999, y: -9999, active: false };

    const seed = () => {
      const count = Math.min(80, Math.max(24, Math.floor((width * height) / density)));
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.8 + 1.1,
        accent: i % 9 === 0 ? "orange" : i % 15 === 0 ? "green" : "white",
      }));
    };

    const draw = (animate: boolean) => {
      ctx.clearRect(0, 0, width, height);
      const maxDist = Math.min(150, Math.max(90, width * 0.12));
      const reach = 190;

      if (animate) {
        for (const n of nodes) {
          if (pointer.active) {
            const dx = pointer.x - n.x;
            const dy = pointer.y - n.y;
            const d = Math.hypot(dx, dy);
            if (d < reach && d > 1) {
              // gentle attraction toward the cursor
              n.vx += (dx / d) * 0.012;
              n.vy += (dy / d) * 0.012;
            }
          }
          n.vx *= 0.995;
          n.vy *= 0.995;
          const speed = Math.hypot(n.vx, n.vy);
          if (speed < 0.12) {
            n.vx += (Math.random() - 0.5) * 0.03;
            n.vy += (Math.random() - 0.5) * 0.03;
          }
          if (speed > 1.2) {
            n.vx *= 0.9;
            n.vy *= 0.9;
          }
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
        }
      }

      // Edges are grouped into a few opacity levels: one stroke() per level, not per edge.
      ctx.lineWidth = 1;
      const maxDist2 = maxDist * maxDist;
      const levels: number[][] = Array.from({ length: EDGE_LEVELS }, () => []);
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxDist2) {
            const level = Math.min(EDGE_LEVELS - 1, Math.floor((1 - Math.sqrt(d2) / maxDist) * EDGE_LEVELS));
            levels[level].push(a.x, a.y, b.x, b.y);
          }
        }
      }
      levels.forEach((segs, level) => {
        if (!segs.length) return;
        ctx.strokeStyle = `rgba(255,255,255,${((level + 0.5) / EDGE_LEVELS) * 0.38})`;
        ctx.beginPath();
        for (let k = 0; k < segs.length; k += 4) {
          ctx.moveTo(segs[k], segs[k + 1]);
          ctx.lineTo(segs[k + 2], segs[k + 3]);
        }
        ctx.stroke();
      });

      if (pointer.active) {
        for (const n of nodes) {
          const d = Math.hypot(pointer.x - n.x, pointer.y - n.y);
          if (d < reach) {
            ctx.strokeStyle = `rgba(${colors.orange},${(1 - d / reach) * 0.75})`;
            ctx.beginPath();
            ctx.moveTo(pointer.x, pointer.y);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();
          }
        }
        ctx.fillStyle = `rgba(${colors.orange},0.95)`;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 3.2, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const n of nodes) {
        ctx.fillStyle = `rgba(${colors[n.accent]},0.9)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.accent === "white" ? n.r : n.r + 1, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (reduceMotion) draw(false);
    };

    const tick = () => {
      if (!running) return;
      draw(true);
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (reduceMotion) {
        draw(false);
        return;
      }
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      pointer.active = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      pointer.x = x;
      pointer.y = y;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };

    resize();
    start();

    const ro = new ResizeObserver(() => resize());
    ro.observe(parent);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);

    const io = new IntersectionObserver(([entry]) =>
      entry.isIntersecting ? start() : stop(),
    );
    io.observe(parent);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [density]);

  return <canvas className={className} aria-hidden="true" ref={canvasRef} />;
}
