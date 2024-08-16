"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IconSun, IconMoon } from "@tabler/icons-react";
import axios from "axios";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("light");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }

    // Fetch weather data when the component is mounted
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=YOUR_API_KEY&units=metric` // Replace YOUR_API_KEY with your actual API key
        );
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  if (!mounted) return null;

  const isDarkMode = theme === "dark";

  return (
    <div className="flex gap-4 justify-end px-4 items-center">
      <button
        onClick={() => setTheme(isDarkMode ? "light" : "dark")}
        className="p-2"
      >
        {isDarkMode ? (
          <IconSun className="h-8 w-8 text-yellow-500" />
        ) : (
          <IconMoon className="h-8 w-8 text-gray-800" />
        )}
      </button>
      {weather && (
        <div className="weather-info flex justify-end text-white items-center gap-2">
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} // Use HTTPS
            alt={weather.weather[0].description}
            className="h-8 w-8"
          />
          <div className="text-gray-800">
            <p className="font-semibold">{weather.name}</p>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Condition: {weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
