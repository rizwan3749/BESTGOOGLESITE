// app/components/ThemeSwitcher.tsx
"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex gap-4 justify-end px-4">
      <div className="flex gap-4 justify-end px-4">
        <Link href="\src\app\Signup\page.tsx">Sign up</Link>
        <a href=""></a>
      </div>
      <button onClick={() => setTheme('light')}></button>
      <button onClick={() => setTheme('dark')}></button>
    </div>
  )
};