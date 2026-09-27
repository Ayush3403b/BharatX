import { useEffect, useRef } from "react";
import { useTheme } from "../../hooks/useTheme";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  color: string;
}

/**
 * ExecutiveAtmosphereCanvas
 * Implements the 6-layer background system requested in Sections 7, 8 & 9:
 * - Light Mode: Option 1 — The Sovereign Conglomerate Horizon
 *   Architectural CAD linework, concentric radar rings, blueprint coordinates,
 *   crisp precision crosshairs, and rich ambient warmth.
 * - Dark Mode: Deep-Tech Topological Wireframe & Laser Grid
 */
export function ExecutiveAtmosphereCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const isMobile = width < 768;

    // Mouse coordinates with smooth interpolation
    let targetMouseX = width * 0.5;
    let targetMouseY = height * 0.45;
    let mouseX = targetMouseX;
    let mouseY = targetMouseY;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    // Reduced motion check
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Particle pool: 18 on mobile, 42 on desktop for rich network visuals with high GPU efficiency
    const particleCount = isMobile ? 18 : 42;
    const colors = ["#0284c7", "#d97706", "#7c3aed", "#059669"];

    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.4,
      vy: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.35,
      size: 1.8 + Math.random() * 2.2,
      baseAlpha: 0.65 + Math.random() * 0.35,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    let time = 0;

    const render = () => {
      if (!prefersReducedMotion) time += 0.012;

      // Mouse lerping for smooth parallax
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      ctx.clearRect(0, 0, width, height);

      const isDark = theme === "dark" || document.documentElement.classList.contains("dark");

      /* ═══════════════════════════════════════════════════════════════
         LAYER 3: Animated Perspective Technical Grid (Section 8)
         - Vanishing horizon perspective
         - Smooth transverse line scrolling
         - Concentric radar range arcs & CAD crosshair nodes
         - Blueprint coordinates & compass markings
         ═══════════════════════════════════════════════════════════════ */
      const horizonY = height * 0.34;
      const perspectiveOriginX = width * 0.62 + (mouseX - width * 0.5) * 0.08;

      ctx.save();

      // Transverse perspective rails (moving forward)
      const transverseLines = isMobile ? 12 : 20;
      const lineSpeed = (time * 20) % 44;

      const transverseYValues: number[] = [];

      for (let i = 1; i <= transverseLines; i++) {
        const depth = Math.pow(i / transverseLines, 2.0);
        const y = horizonY + depth * (height - horizonY) + lineSpeed * depth * 0.35;
        if (y > height || y < horizonY) continue;

        transverseYValues.push(y);

        const isMajor = i % 4 === 0;
        const alpha = isDark
          ? (depth * 0.16 + 0.04).toFixed(3)
          : (depth * 0.22 + 0.07).toFixed(3);

        ctx.strokeStyle = isDark
          ? isMajor
            ? "rgba(0, 240, 255, 0.35)"
            : `rgba(0, 240, 255, ${alpha})`
          : isMajor
            ? "rgba(2, 132, 199, 0.32)"
            : `rgba(30, 41, 59, ${alpha})`;

        ctx.lineWidth = isMajor ? 1.4 : 1.0;

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Radial perspective rails (lines converging to horizon)
      const radialRays = isMobile ? 14 : 26;
      const radialXAtBottom: number[] = [];

      for (let i = 0; i <= radialRays; i++) {
        const bottomX = (i / radialRays) * (width * 1.6) - width * 0.3;
        radialXAtBottom.push(bottomX);

        const isMajorRay = i % 5 === 0;
        const alpha = isDark ? (isMajorRay ? 0.22 : 0.09) : (isMajorRay ? 0.24 : 0.12);

        ctx.strokeStyle = isDark
          ? `rgba(0, 240, 255, ${alpha})`
          : `rgba(30, 41, 59, ${alpha})`;
        ctx.lineWidth = isMajorRay ? 1.2 : 0.85;

        ctx.beginPath();
        ctx.moveTo(perspectiveOriginX, horizonY);
        ctx.lineTo(bottomX, height);
        ctx.stroke();
      }

      // CAD Crosshairs (+) at key ray/rail intersections
      const arm = 3.5;
      ctx.strokeStyle = isDark ? "rgba(0, 240, 255, 0.45)" : "rgba(2, 132, 199, 0.45)";
      ctx.lineWidth = 1;

      for (let r = 0; r < radialXAtBottom.length; r += 3) {
        const bottomX = radialXAtBottom[r];
        for (let t = 0; t < transverseYValues.length; t += 3) {
          const y = transverseYValues[t];
          const progress = (y - horizonY) / (height - horizonY);
          const x = perspectiveOriginX + (bottomX - perspectiveOriginX) * progress;

          if (x > 20 && x < width - 20) {
            ctx.beginPath();
            ctx.moveTo(x - arm, y);
            ctx.lineTo(x + arm, y);
            ctx.moveTo(x, y - arm);
            ctx.lineTo(x, y + arm);
            ctx.stroke();
          }
        }
      }

      // Concentric Radar Range Rings radiating from perspective horizon
      const radarRadii = isMobile ? [180, 360, 540] : [160, 320, 500, 720];
      ctx.setLineDash([4, 7]);
      radarRadii.forEach((r, idx) => {
        ctx.strokeStyle = isDark
          ? `rgba(0, 240, 255, ${0.18 - idx * 0.03})`
          : `rgba(2, 132, 199, ${0.24 - idx * 0.04})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(perspectiveOriginX, horizonY, r, 0, Math.PI);
        ctx.stroke();

        // Technical range tag
        if (!isMobile) {
          ctx.font = "9px 'JetBrains Mono', monospace";
          ctx.fillStyle = isDark ? "rgba(0, 240, 255, 0.4)" : "rgba(14, 116, 144, 0.55)";
          ctx.fillText(`R-${r}M`, perspectiveOriginX + r + 6, horizonY + 3);
        }
      });
      ctx.setLineDash([]);

      // Horizon line with subtle datum ticks
      ctx.strokeStyle = isDark ? "rgba(255, 184, 0, 0.35)" : "rgba(217, 119, 6, 0.38)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(0, horizonY);
      ctx.lineTo(width, horizonY);
      ctx.stroke();

      // Technical blueprint legend
      if (!isMobile) {
        ctx.font = "9.5px 'JetBrains Mono', monospace";
        ctx.fillStyle = isDark ? "rgba(0, 240, 255, 0.4)" : "rgba(14, 116, 144, 0.65)";
        ctx.fillText("GRID // 28.5355° N 77.2289° E // ARCHITECTURAL SCALE", width * 0.04, horizonY - 10);
        ctx.fillText("BHARATX SOVEREIGN HORIZON // SYS.06", width * 0.68, horizonY - 10);
      }

      ctx.restore();

      /* ═══════════════════════════════════════════════════════════════
         LAYER 4: Interactive Particle Constellation (Section 9)
         - Visible corporate node dots
         - Luminous pulse halos
         - Connected network laser threads
         - Smooth cursor repulsion
         ═══════════════════════════════════════════════════════════════ */
      const maxConnectDist = isMobile ? 100 : 150;

      // Update and draw particles
      particles.forEach((p, idx) => {
        // Cursor proximity reaction
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const distToMouse = Math.hypot(dx, dy);
        if (distToMouse < 150 && distToMouse > 0) {
          const force = (150 - distToMouse) / 150;
          p.x += (dx / distToMouse) * force * 1.0;
          p.y += (dy / distToMouse) * force * 1.0;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Outer glow halo around node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.4, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? p.color : p.color;
        ctx.globalAlpha = isDark ? 0.18 : 0.22;
        ctx.fill();

        // Inner solid core node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? p.color
          : p.color === "#d97706"
            ? "#d97706"
            : p.color === "#0284c7"
              ? "#0284c7"
              : p.color;
        ctx.globalAlpha = isDark ? p.baseAlpha : Math.min(1, p.baseAlpha * 1.1);
        ctx.fill();
        ctx.globalAlpha = 1;

        // Connect nearby particles with distinct network threads
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < maxConnectDist) {
            const lineAlpha = (1 - dist / maxConnectDist) * (isDark ? 0.18 : 0.28);
            ctx.strokeStyle = isDark
              ? "#00f0ff"
              : idx % 2 === 0
                ? "#0284c7"
                : "#d97706";
            ctx.globalAlpha = lineAlpha;
            ctx.lineWidth = isDark ? 0.9 : 1.1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}
