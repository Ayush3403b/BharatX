import { useReducedMotion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type PointerEvent,
} from "react";
import { cn } from "../../utils/cn";

interface TiltCardProps extends HTMLAttributes<HTMLDivElement> {
  maxTilt?: number;
  glare?: boolean;
}

/**
 * Real 3D pointer-tilt card (Section 5A, item 3).
 * Perspective transform follows the cursor with a layered gloss sweep;
 * disabled for coarse pointers and reduced motion.
 */
export function TiltCard({
  maxTilt = 7,
  glare = true,
  children,
  className,
  style,
  onPointerMove,
  onPointerLeave,
  ...rest
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const rafRef = useRef(0);
  const [t, setT] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, active: false });

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (reduced || e.pointerType === "touch" || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setT({
          rx: (0.5 - py) * maxTilt * 2,
          ry: (px - 0.5) * maxTilt * 2,
          gx: px * 100,
          gy: py * 100,
          active: true,
        });
      });
      onPointerMove?.(e);
    },
    [maxTilt, reduced, onPointerMove],
  );

  const handleLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setT({ rx: 0, ry: 0, gx: 50, gy: 50, active: false });
    onPointerLeave?.(undefined as unknown as PointerEvent<HTMLDivElement>);
  }, [onPointerLeave]);

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={cn("group/tilt will-change-transform", className)}
      style={{
        transform: `perspective(1000px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)${
          t.active ? " scale3d(1.015,1.015,1)" : ""
        }`,
        transformStyle: "preserve-3d",
        transition: t.active
          ? "transform 90ms linear"
          : "transform 550ms cubic-bezier(0.22, 1, 0.36, 1)",
        ...style,
      }}
      {...rest}
    >
      {children}
      {glare && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: t.active ? 1 : 0,
            background: `radial-gradient(460px circle at ${t.gx}% ${t.gy}%, rgba(255,255,255,0.09), transparent 55%)`,
          }}
        />
      )}
    </div>
  );
}
