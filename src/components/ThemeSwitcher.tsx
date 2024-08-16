"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "../firebase"; // Adjust the import path based on your structure
import { onAuthStateChanged, signOut } from "firebase/auth";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { divMode } from "@tsparticles/engine";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState<any>(null);
  const [panel, setPanel] = useState(false);

  const panelClicker = () => {
    setPanel((panel) => !panel);
  };

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  if (!mounted) return null;

  const isDarkMode = theme === "dark";

  return (
    <div className="flex gap-4 justify-around py-3 px-4">
      <Link href="/" className="font-bold">
        <span className="text-green-500 dark:text-green-300">Best</span>
        <span className="text-red-500 dark:text-red-300">Google</span>
        <span className="text-yellow-500 dark:text-yellow-300">Sites</span>
      </Link>

      <div className="flex gap-2">
        {!user ? (
          <>
            <Link href="/Signup/">Sign up</Link>
            <Link href="/Signin/">Sign in</Link>
          </>
        ) : (
          <div className="flex relative  border-gray-600 dark:border-white rounded-[50%] h-11 w-11 justify-center border items-center gap-2">
            <div
              onClick={panelClicker}
              className="bg-red-400 h-10 rounded-full w-10 overflow-hidden"
            >
              <img
                src={user.photoURL || "/default-avatar.png"} // Fallback image if no photoURL
                alt="User Image"
                className="object-cover h-full w-full"
              />
            </div>
            {panel && (
              <div className="bg-white absolute top-14 w-24 rounded-md h-32 text-black shadow-lg dark:shadow-gray-700 p-3 z-999">
                <button onClick={() => signOut(auth)} className="text-sm">
                  Sign out
                </button>
              </div>
            )}
          </div>
        )}
        <div className="flex gap-4 justify-end px-4">
          <button
            onClick={() => setTheme(isDarkMode ? "light" : "dark")}
            className="p-2"
          >
            {isDarkMode ? (
              <IconMoon className="h-8 w-8 text-white/80" />
            ) : (
              <IconSun className="h-8 w-8 text-yellow-500" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
