"use client";
 
import React from "react";
import Image, { ImageProps } from "next/image";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
 
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
 
export function ImageWrapper({ className, imageClassName, alt, ...props }: { imageClassName?: string } & ImageProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image alt={alt || "Image"} className={cn("object-cover", imageClassName)} {...props} />
    </div>
  );
}
 
export function Reveal({
  delay = 0,
  duration = 0.5,
  direction = "up",
  className,
  children,
  ...props
}: {
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  const directions = {
    up: { y: 24, x: 0 },
    down: { y: -24, x: 0 },
    left: { x: 24, y: 0 },
    right: { x: -24, y: 0 },
  };
 
  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={cn(className)}
      {...(props as React.ComponentPropsWithoutRef<typeof motion.div>)}
    >
      {children}
    </motion.div>
  );
}
