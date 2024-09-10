"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "../firebase"; // Adjust the import path based on your structure
import { onAuthStateChanged, signOut } from "firebase/auth";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState<any>(null);
  const [panel, setPanel] = useState(false);
  const [weather, setWeather] = useState<any>(null); // State for weather data
  const pathname = usePathname();

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

    // Fetch weather data
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Delhi&units=metric&appid=5c1e60aa063c3af6cf7294c14c0894a0`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Weather API response:", data); // Log the entire response for debugging
        if (data && data.main && data.weather) {
          setWeather(data); // Store the entire weather data
        } else {
          console.error("Weather data is not valid", data);
        }
      })
      .catch((error) => console.error("Error fetching weather data", error));

    return () => unsubscribe();
  }, []);


  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  if (!mounted) return null;
  if (pathname.includes("Admin")) {
    return null;
  }
  const isDarkMode = theme === "dark";

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg flex justify-between items-center py-3 px-6 shadow-md">
      {/* Brand and Premium Button */}
      <div className="flex gap-10 items-center">
        <Link
          href="/"
          className="font-bold inline-flex items-center justify-center text-xl"
        >
          <span className="text-green-500 dark:text-green-300">Best</span>
          <span className="text-red-500 dark:text-red-300">Google</span>
          <span className="text-yellow-500 dark:text-yellow-300">Sites</span>
        </Link>

        <Link href="/premiumPage">
          <button className="relative px-4 py-2 text-sm font-semibold text-black/80 dark:text-white bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-lg hover:scale-105 transition-transform duration-300">
            Get Premium
          </button>
        </Link>
      </div>

      {/* Weather Information */}
      {weather && weather.main && weather.weather && (
        <div className="flex items-center text-sm font-medium text-black/80 dark:text-white">
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather Icon"
            className="h-9 w-9 mr-2"
          />
          <span>
            {weather.name}: {weather.main.temp}°C, {weather.weather[0].description}
          </span>
        </div>
      )}

      {/* Theme Toggle & User Section */}
      <div className="flex items-center gap-6">
        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(isDarkMode ? "light" : "dark")}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-300"
        >
          {isDarkMode ? (
            <IconSun className="h-6 w-6 text-yellow-400" />
          ) : (
            <IconMoon className="h-6 w-6 text-gray-600" />
          )}
        </button>

        {/* User Authentication */}
        {!user ? (
          <div className="flex gap-4">
            <Link href="/Signin/">
              <button className="text-sm font-semibold m-auto mt-2 text-black/80 dark:text-white hover:underline">
                Sign in
              </button>
            </Link>
            <Link href="/Signup/">
              <button className="px-4 py-2 text-sm font-semibold bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-300">
                Get Started
              </button>
            </Link>
          </div>
        ) : (
          <div className="relative">
            <div
              onClick={panelClicker}
              className="flex items-center cursor-pointer"
            >
              <img
                src={user.photoURL || "/default-avatar.png"}
                alt="User Avatar"
                className="h-10 w-10 rounded-full border border-gray-300"
              />
            </div>
            {panel && (
              <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-900 shadow-md rounded-lg text-sm">
                <div className="px-4 py-2 text-center">
                  <p className="font-bold text-black/80 dark:text-white">{user.displayName}</p>
                  <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
                </div>
                <hr className="my-2 border-gray-200 dark:border-gray-700" />
                <button
                  onClick={() => signOut(auth)}
                  className="w-full text-left  flex justify-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
