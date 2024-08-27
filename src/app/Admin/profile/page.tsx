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
  IconMoon,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useTheme } from "next-themes";

export default function SidebarDemo() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const auth = getAuth();
  const db = getFirestore();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [link, setLink] = useState(`/default-avatar.png`);
  const [dispName, setDispName] = useState(`Admin`);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          if (userData.role === "admin") {
            setIsAdmin(true);
            setLink(userData.photoURL || "/default-avatar.png");
            setDispName(userData.displayName);
            setLoading(false);
          } else {
            router.push("../Admin/login");
          }
        }
      }
    });

    return () => unsubscribe();
  }, [auth, db, router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("../Admin/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const links = [
    {
      label: "Dashboard",
      href: "../Admin/dashboard",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "../Admin/profile/", // Admin profile or regular profile
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Theme",
      href: "#",
      icon:
        theme === "dark" ? (
          <IconSunHigh className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ) : (
          <IconMoon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
      action: () => {
        setTheme(theme === "dark" ? "light" : "dark");
      },
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
      action: handleLogout,
    },
  ];

  const [open, setOpen] = useState(false);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner, etc.
  }

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-[100vw] flex-1 max-w-full mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-[100vh]"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  onClick={link.action} // Call the action on click if it exists
                />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: dispName,
                href: "#",
                icon: (
                  <Image
                    src={link}
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

const ProfileForm = () => {
  return (
    <div className="max-w-2xl w-[50%] mx-auto mt-10 p-8 bg-white dark:bg-neutral-900 rounded-lg shadow-lg">
      {" "}
      <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>{" "}
      {/* Profile Details Form */}{" "}
      <form className="space-y-4 w-full">
        {" "}
        <div>
          {" "}
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {" "}
            Full Name{" "}
          </label>{" "}
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Admin Name"
          />{" "}
        </div>{" "}
        <div>
          {" "}
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {" "}
            Email Address{" "}
          </label>{" "}
          <input
            type="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="admin@example.com"
          />{" "}
        </div>{" "}
        <div>
          {" "}
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {" "}
            Phone Number{" "}
          </label>{" "}
          <input
            type="tel"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="+123 456 7890"
          />{" "}
        </div>{" "}
        <div className="flex justify-end">
          {" "}
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {" "}
            Save Changes{" "}
          </button>{" "}
        </div>{" "}
      </form>{" "}
      {/* Password Change Section */}{" "}
      <div className="mt-10">
        {" "}
        <h3 className="text-xl font-bold mb-4">Change Password</h3>{" "}
        <form className="space-y-4">
          {" "}
          <div>
            {" "}
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {" "}
              Current Password{" "}
            </label>{" "}
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter current password"
            />{" "}
          </div>{" "}
          <div>
            {" "}
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {" "}
              New Password{" "}
            </label>{" "}
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter new password"
            />{" "}
          </div>{" "}
          <div>
            {" "}
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {" "}
              Confirm New Password{" "}
            </label>{" "}
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Confirm new password"
            />{" "}
          </div>{" "}
          <div className="flex justify-end">
            {" "}
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              {" "}
              Change Password{" "}
            </button>{" "}
          </div>{" "}
        </form>{" "}
      </div>{" "}
    </div>
  );
}; // Dashboard with embedded ProfileForm
const Dashboard = () => {
  return (
    <div className="flex flex-1">
      {" "}
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        {" "}
        <ProfileForm />{" "}
      </div>{" "}
    </div>
  );
};
