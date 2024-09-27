"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number;
    name: string;
    designation: string;
    image: string; // Ensure this is a string URL
    Link: string;
  }[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );
  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  return (
    <>
      {items.map((item, idx) => (
        <a href={item.Link} key={idx} target="_blank" rel="noopener noreferrer">
          <div
            className="border-2 bg-indigo-50/90 h-16 w-16 m-2 justify-items-center dark:bg-gray-800 backdrop-blur-md whitespace-nowrap rounded-[50%] relative group"
            key={item.name}
            onMouseEnter={() => setHoveredIndex(item.id)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence mode="popLayout">
              {hoveredIndex === item.id && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.6 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 260,
                      damping: 10,
                    },
                  }}
                  exit={{ opacity: 0, y: 20, scale: 0.6 }}
                  style={{
                    translateX: translateX,
                    rotate: rotate,
                    whiteSpace: "nowrap",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    WebkitBackdropFilter: "blur(5px)",
                    backdropFilter: "blur(5px)",
                    padding: "0.5rem 0.8rem",
                    transition: "all 100ms",
                    border: "1px solid gray",
                    borderRadius: "5rem",
                  }}
                  className="absolute -top-16 translate-x-1/2 flex text-xs flex-col items-center justify-center z-50 "
                >
                  <div className="absolute inset-x-5 z-30 w-[10%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px " />
                  <div className="absolute left-6 w-[20%] z-30 bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px " />
                  <div className="font-bold dark:text-white text-black relative z-30 text-base">
                    {item.name}
                  </div>
                  <div className="text-black dark:text-white text-xs">
                    {item.designation}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <Image
              onMouseMove={handleMouseMove}
              height={100}
              width={100}
              src={item.image}
              alt={item.name}
              className="ml-[7px] mb-[20px] mt-[6px] p-2 h-12 w-12 group-hover:scale-105 group-hover:z-30 dark:border-white bg-none relative transition duration-500"
            />
          </div>
        </a>
      ))}
    </>
  );
};
