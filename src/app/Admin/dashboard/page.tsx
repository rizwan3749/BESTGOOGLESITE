"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconSunHigh,
  IconSun,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function SidebarDemo() {
  const router = useRouter();
  const auth = getAuth();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("login");
      }
    });
    return () => unsubscribe;
  }, [auth, router]);
  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "../Admin/profile/",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Theme",
      href: "#",
      icon: (
        <IconSunHigh className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-[100vw] flex-1 max-w-full mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-[100vh]" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Afzal Khan",
                href: "#",
                icon: (
                  <Image
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Best Google Sites
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

// Dummy dashboard component with content
const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <div className="flex gap-2">
          <div className="h-20 w-full rounded-lg text-6xl p-2 text-center  bg-gray-100 dark:bg-neutral-800">Best Google Sites</div>
        </div>
        <div className="flex flex-col gap-4 p-4">
          {/* Card 1 */}
          <div className="flex gap-2 flex-1">
            <div className="h-full w-[30%] rounded-lg bg-gray-100 dark:bg-neutral-800 p-4 shadow-lg">
              <div className="mb-4">
                <div className="mb-4">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Select Category
                  </label>
                  <select
                    id="category"
                    className="mt-1 block w-full rounded-md p-3 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-neutral-700 dark:text-gray-100 dark:border-neutral-600"
                  >
                    <option value="">Graphic Design</option>
                    <option value="">Web Design</option>
                    <option value="">AI Tools</option>
                    <option value="">Indians News</option>
                    <option value="">Sports</option>
                  </select>
                </div>
                <label htmlFor="link1" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Add Links
                </label>
                <input
                  type="text"
                  id="link1"
                  className="mt-1 block w-full rounded-md p-3 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-neutral-700 dark:text-gray-100 dark:border-neutral-600"
                  placeholder="Enter your link here"
                />
              </div>
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Link
              </button>
            </div>
          </div>

        </div>


      </div>
    </div>
  );
};
