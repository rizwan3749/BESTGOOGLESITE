"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  DndContext,
  closestCenter,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import AnimatedTooltipPreview from "@/components/AnimatedTooltip";
import { AnimatedModalDemo } from "@/components/AnimatedModalDemo";
import { Calculator } from "@/components/Calculator";
import Script from "next/script";
import { CiUnlock, CiLock } from "react-icons/ci";

export default function Home() {
  const { theme } = useTheme();
  const [items, setItems] = useState([
    {
      id: "1",
      title: "GRAPHIC DESIGNING",
      description: "ALL 250+ GRAPHIC DESIGN",
    },
    {
      id: "2",
      title: "WEB DESIGNING",
      description: "ALL 250+ WEB DESIGN .",
    },
    {
      id: "3",
      title: "INDIAN NEWS",
      description: "ALL 250+ INDIAN NEWS .",
    },
    {
      id: "4",
      title: "SPORTS",
      description: "ALL 250+ SPORTS .",
    },
    {
      id: "5",
      title: "AI TOOLS",
      description: "ALL 250+ AI TOOLS .",
    },
  ]);

  const [dragMode, setDragMode] = useState(false); // State to toggle drag-and-drop mode
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const fetchWidgets = async () => {
        const docRef = doc(db, "Widgets", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const savedItems = docSnap.data().items;
          setItems((currentItems) =>
            savedItems.map((savedItem: any) => {
              const existingItem = currentItems.find(
                (item) => item.id === savedItem.id
              );
              return existingItem
                ? { ...existingItem, ...savedItem }
                : existingItem;
            })
          );
        }
      };
      fetchWidgets();
    }
  }, [user]);

  const saveItems = async (newItems: any) => {
    setItems(newItems);
    if (user) {
      const positions = newItems.map(({ id }) => ({ id }));
      const docRef = doc(db, "Widgets", user.uid);
      await setDoc(docRef, { items: positions });
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        saveItems(newItems);
        return newItems;
      });
    }
  };

  return (
    <div className="mt-24">
      <Script
        id="google-cse"
        async
        src="https://cse.google.com/cse.js?cx=80904074a37154829"
      />
      <img
        src={
          theme === "dark"
            ? "/images/GoogleBlack.png"
            : "/images/GoogleWhite.png"
        }
        alt="Google Logo"
        className="m-auto"
      />
      <div className="mb-4">
        <div className="w-[45vw] p-4 dark:bg-gray-800 dark:text-black rounded-lg border border-black/15 dark:border-white/80 m-auto">
          <div className="gcse-search"></div>
        </div>
      </div>
      <div className="mt-9 mb-[-2rem]">
        <AnimatedTooltipPreview />
      </div>
      <div className="flex justify-between w-[44vw] m-auto">
        <div>
          <button onClick={() => setDragMode(!dragMode)}>
            {dragMode ? <CiUnlock /> : <CiLock />}
          </button>
        </div>
        <div className="flex justify-center gap-8">
          <AnimatedModalDemo />
          <Calculator />
        </div>

        <div>⁝</div>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((item) => item.id)}>
          <BentoGrid className="max-w-4xl p-3  min-h-48 mx-auto">
            {items.map((item) => (
              <DroppableGrid id={item.id} key={item.id}>
                {dragMode ? (
                  <DraggableItem id={item.id}>
                    <BentoGridItem
                      className="dark:outline-1 cursor-pointer dark:outline-gray-300 border-gray-300 border"
                      title={item.title}
                      description={item.description}
                      icon={item.icon}
                    />
                  </DraggableItem>
                ) : (
                  <BentoGridItem
                    className="dark:outline-1 h-28 cursor-pointer dark:outline-gray-300 border-gray-300 border"
                    title={item.title}
                    description={item.description}
                    icon={item.icon}
                  />
                )}
              </DroppableGrid>
            ))}
          </BentoGrid>
        </SortableContext>
      </DndContext>
    </div>
  );
}

// Draggable component
function DraggableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="cursor-grab"
    >
      {children}
    </div>
  );
}

// Droppable component
function DroppableGrid({ id, children }) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  const style = {
    borderRadius: "1rem",
    padding: "0.2rem",
    backgroundColor: isOver ? "lightblue" : undefined,
    transition: "background-color padding borderRadius 0.2s",
  };

  return (
    <div ref={setNodeRef} style={style} className="min-h-28">
      {children}
    </div>
  );
}
