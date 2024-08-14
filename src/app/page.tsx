"use client";
import React, { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { IconClipboardCopy } from "@tabler/icons-react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

// Draggable component with transition
function DraggableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  // Apply transition to smooth the movement
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition: transform ? "transform 0.2s ease in" : "none",
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

// Droppable component with transition
function DroppableGrid({ id, children }) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  // Apply background color transition
  const style = {
    borderRadius:"1rem",
    padding:"0.2rem",
    backgroundColor: isOver ? "lightblue" : undefined,
    transition: "background-color padding borderRadius 0.2s ease",
  };

  return (
    <div ref={setNodeRef} style={style} className="h-28">
      {children}
    </div>
  );
}

export default function Home() {
  const [items, setItems] = useState([
    {
      id: "1",
      title: "GRAPHIC DESIGNING",
      description: "ALL 250+ GRAPHIC DESIGN LINKS.",
      icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    },
    {
      id: "2",
      title: "WEB DESIGNING",
      description: "ALL 250+ WEB DESIGN LINKS.",
      icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    },
    {
      id: "3",
      title: "INDIAN NEWS",
      description: "ALL 250+ INDIAN NEWS LINKS.",
      icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    },
    {
      id: "4",
      title: "SPORTS",
      description: "ALL 250+ SPORTS LINKS.",
      icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    },
    {
      id: "5",
      title: "AI TOOLS",
      description: "ALL 250+ AI TOOLS LINKS.",
      icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    },
  ]);

  return (
    <>
      <h2 className="text-center text-6xl mb-4 font-bold">Google</h2>
      <div className="mb-4">
        <PlaceholdersAndVanishInput
          onChange={(e) => {
            e.target.value;
          }}
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Submitted");
          }}
          placeholders={[
            "ASK GOOGLE ANYTHING",
            "TODAY's WEATHER?",
            "RESTAURANT NEAR ME?",
          ]}
        />
      </div>

      <DndContext
        onDragEnd={(event) => {
          const { active, over } = event;
          if (active.id !== over.id) {
            setItems((items) => {
              const oldIndex = items.findIndex((item) => item.id === active.id);
              const newIndex = items.findIndex((item) => item.id === over.id);

              const updatedItems = [...items];
              const [movedItem] = updatedItems.splice(oldIndex, 1);
              updatedItems.splice(newIndex, 0, movedItem);

              return updatedItems;
            });
          }
        }}
      >
        <BentoGrid className="max-w-4xl p-3 mx-auto">
          {items.map((item) => (
            <DroppableGrid id={item.id} key={item.id}>
              <DraggableItem id={item.id}>
                <BentoGridItem
                  className="dark:outline-1 h-28 cursor-pointer dark:outline-gray-300 border-gray-300 border"
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                />
              </DraggableItem>
            </DroppableGrid>
          ))}
        </BentoGrid>
      </DndContext>
    </>
  );
}
