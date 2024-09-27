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
import { CgMoreVertical } from "react-icons/cg";
import { Slider } from "@/components/ui/slider";
import { InfiniteMovingCardsDemo } from "@/components/InfiniteMovingCardsDemo";
import "./style.css";

export default function Home() {
  const [panel, setPanel] = useState(false);
  const panelClicker = () => {
    setPanel((panel) => !panel);
  };
  const { theme } = useTheme();
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [items, setItems] = useState([
    {
      id: "1",
      title: "GRAPHIC DESIGNING",
      description: "ALL 250+ GRAPHIC DESIGN",
    },
    {
      id: "2",
      title: "WEB DESIGNING",
      description: "ALL 250+ WEB DESIGN     .",
    },
    { id: "3", title: "INDIAN NEWS", description: "ALL 250+ INDIAN NEWS  .  " },
    { id: "4", title: "SPORTS", description: "ALL 250+ SPORTS HERE ." },
    { id: "5", title: "AI TOOLS", description: "ALL 250+ AI TOOLS  HERE  ." },
  ]);

  const [dragMode, setDragMode] = useState(false);
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

    // Load background image from local storage
    const storedBackgroundImage = localStorage.getItem("backgroundImage");
    if (storedBackgroundImage) {
      setBackgroundImage(storedBackgroundImage);
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
  useEffect(() => {
    const img: any = new Image();
    img.src = backgroundImage;
    img.onload = () => {
      document.body.style.backgroundImage = `url(${backgroundImage})`;
    };
  }, [backgroundImage]);

  const handleBackgroundImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageBase64 = reader.result;
        setBackgroundImage(imageBase64);
        localStorage.setItem("backgroundImage", imageBase64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveBackgroundImage = () => {
    setBackgroundImage(null);
    localStorage.removeItem("backgroundImage");
  };

  return (
    <div
      className="backdrop-blur-md min-h-[100vh]"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        minHeight: "120vh",
        paddingTop: "15vh",
        overflow: "hidden",
      }}
    >
      <Script
        id="google-cse"
        async
        defer
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
      <div className="mb-4 mt-4">
        <div className="w-[45vw] m-auto">
          <div className="gcse-searchbox-only"></div>
        </div>
      </div>
      <div className="mt-9 mb-[-2rem]">
        <AnimatedTooltipPreview />
      </div>
      <div className="flex justify-between  w-[44vw] m-auto">
        <div className="flex relative border-black-600 dark:border-white rounded-[50%] h-11 w-11 justify-center hover:border items-center gap-1">
          <button onClick={() => setDragMode(!dragMode)}>
            {dragMode ? <CiUnlock /> : <CiLock />}
          </button>
        </div>
        <div className="flex justify-center gap-8">
          <AnimatedModalDemo />
          <Calculator />
        </div>

        <div>
          <div className="flex relative border-black-600 dark:border-white rounded-[50%] h-11 w-11 justify-center hover:border items-center gap-1">
            <div onClick={panelClicker}>
              <CgMoreVertical />
            </div>
            {panel && (
              <div className="bg-white dark:bg-gray-900 absolute top-14 w-64 z-30 hover:rounded-xl h-auto shadow-md dark:shadow-gray-700/50 p-4 z-990 transform transition-transform duration-300 ease-in-out hover:scale-105">
                <div className="flex flex-col items-center space-y-5">
                  <div className="flex justify-between w-full px-4">
                    <button
                      // onClick={() => {
                      //   window.location.reload();
                      // }}
                      className="flex items-center space-x-2 w-full py-2 text-sm font-semibold text-black/80 dark:text-white bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                    >
                      <span className="material-icons text-black/60 dark:text-white mx-auto w-44">
                        <Slider />
                      </span>
                    </button>
                  </div>
                  <div className="flex justify-between w-full px-4">
                    <label
                      htmlFor="backgroundImageInput"
                      className="flex items-center space-x-2 w-full py-2 text-sm font-semibold text-black/80 dark:text-white bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                    >
                      <span className="material-icons text-black/60 ml-7 dark:text-white mx-auto w-44">
                        Change Background
                      </span>
                    </label>
                    <input
                      id="backgroundImageInput"
                      type="file"
                      accept="image/*"
                      onChange={handleBackgroundImageChange}
                      className="hidden"
                    />
                  </div>
                  <div className="flex justify-between w-full px-4">
                    <button
                      onClick={handleRemoveBackgroundImage}
                      className="flex items-center space-x-2 w-full py-2 text-sm font-semibold text-red-600 dark:text-red-400 bg-red-100 dark:bg-gray-800 rounded-full hover:bg-red-200 dark:hover:bg-red-500 transition-colors duration-300"
                    >
                      <span className="material-icons text-red-600 dark:text-red-400 mx-auto w-44">
                        Remove Background
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className=" mt-10 flex justify-center">
        <InfiniteMovingCardsDemo />
      </div>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((item) => item.id)}>
          <BentoGrid className="max-w-4xl p-3 min-h-48 mx-auto">
            {items.map((item) => (
              <DroppableGrid id={item.id} key={item.id}>
                {dragMode ? (
                  <DraggableItem id={item.id}>
                    <BentoGridItem
                      className="dark:outline-1 cursor-pointer dark:outline-gray-700 border-gray-700 border"
                      title={item.title}
                      description={item.description}
                      icon={item.icon}
                    />
                  </DraggableItem>
                ) : (
                  <BentoGridItem
                    className="dark:outline-1 h-[74px] cursor-pointer dark:outline-gray-300 border-gray-300 border"
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

// Draggable Item Component
function DraggableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useDraggable({ id: props.id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </div>
  );
}

// Droppable Grid Component
function DroppableGrid(props) {
  const { isOver, setNodeRef } = useDroppable({ id: props.id });

  const style = {
    backgroundColor: isOver ? "rgba(255, 255, 255, 0.1)" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}
