import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Heading({ level = 2, variant, className, children, ...props }: { level?: 1 | 2 | 3 | 4 | 5 | 6, variant?: "display" | "heading", className?: string, children: React.ReactNode } & React.HTMLAttributes<HTMLHeadingElement>) {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  const classes = variant === "display" ? "text-4xl md:text-6xl font-bold" : "text-2xl md:text-4xl font-semibold";
  return <Tag className={cn(classes, className)} {...props}>{children}</Tag>;
}

export function Text({ size = "base", className, children, ...props }: { size?: "small" | "base" | "large", className?: string, children: React.ReactNode } & React.HTMLAttributes<HTMLParagraphElement>) {
  const sizeClasses = {
    small: "text-sm",
    base: "text-base",
    large: "text-lg md:text-xl"
  };
  return <p className={cn(sizeClasses[size], className)} {...props}>{children}</p>;
}

export function Eyebrow({ className, children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("text-sm uppercase tracking-wider font-semibold", className)} {...props}>{children}</span>;
}
