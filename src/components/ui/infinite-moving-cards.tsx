"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils"; // Assuming you have a utility function for className

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
    image: string; // assuming the image is either a URL or base64 string
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl",
        className,
        "bg-transparent text-black" // Default theme styles
      )}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, white 20%, white 80%, transparent)",
      }}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className={cn(
              "w-[350px] max-w-full relative rounded-2xl border px-8 py-6 md:w-[450px]",
              "bg-transparent text-black dark:text-white border-gray-300" // Default item styles
            )}
            key={item.name}
          >
            <blockquote>
              <span className="relative z-20 text-sm leading-[1.6]">
                {item.quote}
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-full mr-4 bg-transparent"
                />
                <span className="flex flex-col gap-1">
                  <span className="text-sm leading-[1.6] font-normal">
                    {item.name}
                  </span>
                  <span className="text-sm leading-[1.6] font-normal">
                    {item.title}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
