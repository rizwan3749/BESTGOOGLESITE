"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "../firebase"; // Adjust the import path based on your structure
import { onAuthStateChanged, signOut } from "firebase/auth";
import { IconSun, IconMoon } from "@tabler/icons-react";

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
    <div className="flex gap-4  justify-around py-2 px-4 border-b border-black/10 dark:border-white/10">
      <div>
        <Link
          href="/"
          className="font-bold inline-flex items-center justify-center mt-1 py-1"
        >
          <span className="text-green-500 dark:text-green-300">Best</span>
          <span className="text-red-500 dark:text-red-300">Google</span>
          <span className="text-yellow-500 dark:text-yellow-300">Sites</span>
        </Link>
      </div>

      <div className="flex gap-2">
        <Link href="/premiumPage">
          <div className=" flex justidfy-center mt-1 items-center">
            <div className="relative inline-flex group">
              <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-md group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
              <a
                href="#"
                title="Get quote now"
                className="relative inline-flex items-center justify-center px-4 py-2 text-md font-semibold text-black/80 dark:text-white transition-all duration-200 bg-white dark:bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                role="button"
              >
                Get Premium
              </a>
            </div>
          </div>
        </Link>
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
        {!user ? (
          <>
            <Link
              href="/Signup/"
              className="relative border-2 inline-flex items-center justify-center px-4 py-1 text-md font-semibold text-black/80 dark:text-white  font-pj rounded-xl"
            >
              Sign up
            </Link>
            <Link
              href="/Signin/"
              className="relative border-2 inline-flex items-center justify-center px-4 py-1 text-md font-semibold text-black/80 dark:text-white  font-pj rounded-xl"
            >
              Sign in
            </Link>
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
              <div className="bg-white dark:bg-gray-900 absolute top-14 w-32 items-center rounded-md h-fit  text-black shadow-lg dark:shadow-gray-700/50 p-3 z-999">
                <button
                  onClick={() => signOut(auth)}
                  className=" border-2 border-black/50 hover:bg-black/80 dark:hover:bg-white transition duration-300 dark:hover:text-black hover:text-white dark:border-white inline items-center w-24 justify-center px-2 py-2 text-md font-semibold text-black/80 dark:text-white  font-pj rounded-xl"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
