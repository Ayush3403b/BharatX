import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import type { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";
import { cn } from "../../utils/cn";
import type { ButtonProps } from "./Button";

/**
 * MagneticButton — wraps any CTA with a subtle magnetic pull toward the
 * pointer (Section 40). Disabled for touch devices and reduced motion.
 */
export function MagneticButton({
  children,
  strength = 0.3,
  as: Component = "div",
  className,
  buttonProps,
}: {
  children?: ReactNode;
  strength?: number;
  as?: "div" | "a" | "button" | "Link";
  className?: string;
  buttonProps?: ButtonProps & Record<string, unknown>;
}) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  const onMove = (e: React.PointerEvent) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const MotionLink = motion.create(RouterLink);

  if (Component === "Link") {
    const bp = (buttonProps ?? {}) as { to?: string; className?: string } & Record<string, unknown>;
    const { to, className: inner, ...rest } = bp;
    return (
      <MotionLink
        to={to ?? "#"}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ x: sx, y: sy }}
        className={cn(className, inner)}
        {...rest}
      >
        {children}
      </MotionLink>
    );
  }
  if (Component === "a") {
    const bp = (buttonProps ?? {}) as Record<string, unknown>;
    return (
      <motion.a onPointerMove={onMove} onPointerLeave={onLeave} style={{ x: sx, y: sy }} className={className} {...bp}>
        {children}
      </motion.a>
    );
  }
  if (Component === "button") {
    const bp = (buttonProps ?? {}) as Record<string, unknown>;
    return (
      <motion.button onPointerMove={onMove} onPointerLeave={onLeave} style={{ x: sx, y: sy }} className={className} {...bp}>
        {children}
      </motion.button>
    );
  }
  return (
    <motion.div onPointerMove={onMove} onPointerLeave={onLeave} style={{ x: sx, y: sy }} className={className}>
      {children}
    </motion.div>
  );
}
