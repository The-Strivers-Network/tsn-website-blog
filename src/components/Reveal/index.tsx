"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

/**
 * Entrance motion for content sections.
 *
 * Blocks are server components, so all viewport-driven motion is isolated here
 * and composed around server-rendered children. Motion confirms structure on
 * first read only: `once` is set so scrolling back never replays it.
 *
 * With `prefers-reduced-motion`, transform is dropped and only opacity remains.
 */

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds of delay before this element animates. */
  delay?: number;
  /** Distance in px the element rises from. */
  distance?: number;
  as?: "div" | "section" | "article" | "aside" | "li" | "figure";
};

export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  delay = 0,
  distance = 16,
  as = "div",
}) => {
  const reduced = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: reduced ? 0.2 : 0.5, delay, ease: EASE_OUT }}
    >
      {children}
    </Component>
  );
};

type RevealGroupProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds between each child. Kept small so long lists do not crawl. */
  stagger?: number;
  as?: "div" | "ul" | "ol" | "section";
};

/**
 * Staggers direct children. Pair with `RevealItem` on each child.
 */
export const RevealGroup: React.FC<RevealGroupProps> = ({
  children,
  className,
  stagger = 0.06,
  as = "div",
}) => {
  const reduced = useReducedMotion();
  const Component = motion[as];

  const variants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduced ? 0 : stagger },
    },
  };

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-48px" }}
      variants={variants}
    >
      {children}
    </Component>
  );
};

type RevealItemProps = {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  as?: "div" | "li" | "article" | "figure";
};

export const RevealItem: React.FC<RevealItemProps> = ({
  children,
  className,
  distance = 12,
  as = "div",
}) => {
  const reduced = useReducedMotion();
  const Component = motion[as];

  const variants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0.2 : 0.5, ease: EASE_OUT },
    },
  };

  return (
    <Component className={className} variants={variants}>
      {children}
    </Component>
  );
};
