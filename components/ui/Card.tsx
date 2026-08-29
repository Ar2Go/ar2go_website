import type { ReactNode } from "react";

type CardProps = {
  className?: string;
  children: ReactNode;
};

export function Card({ className = "", children }: CardProps) {
  return (
    <div
      className={`rounded-ar2go border border-tinta/10 bg-papel p-6 ${className}`.trim()}
    >
      {children}
    </div>
  );
}
