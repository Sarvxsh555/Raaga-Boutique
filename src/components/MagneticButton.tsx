import { motion } from "framer-motion";
import { useRef, useState, type ReactNode, type ComponentProps } from "react";

type Props = {
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
} & Omit<ComponentProps<typeof motion.button>, "ref" | "children">;

export function MagneticButton({ children, variant = "primary", className = "", ...rest }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const handleMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.25 });
  };
  const base = "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[0.72rem] tracking-[0.25em] uppercase transition-colors";
  const styles =
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:bg-primary-dark"
      : "border border-primary text-primary hover:bg-primary hover:text-primary-foreground";
  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.3 }}
      className={`${base} ${styles} ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
