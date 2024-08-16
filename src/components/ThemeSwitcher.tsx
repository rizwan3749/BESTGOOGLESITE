// app/components/ThemeSwitcher.tsx
"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex gap-4 justify-around px-4">
      <Link href="/">Home</Link>

      <div className="flex gap-2">
        <div className="flex gap-4 justify-end px-4">
          <Link href="/Signup/">Sign up</Link>
        </div>
        <button onClick={() => setTheme("light")}>Light</button>
        <button onClick={() => setTheme("dark")}>Dark</button>
      </div>
    </div>
  );
}
