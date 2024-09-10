"use client";
import { CardSpotlight } from "@/components/ui/card-spotlight";

export default function CardSpotlightDemo() {
  return (
    <div className="flex flex-col lg:flex-row gap-10 w-full items-center justify-center min-h-screen py-10 bg-white dark:bg-gray-900">
      <div className="relative group">
        <CardSpotlight className="h-[443px] w-[23rem] flex flex-col justify-between shadow-2xl rounded-2xl bg-white dark:bg-gray-800 overflow-hidden transform transition duration-500 group-hover:scale-105">
          <div className="p-5">
            <p className="font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 dark:from-pink-400 dark:to-yellow-300">
              FREE
            </p>
            <div className="mt-4">
              <p className="font-medium text-gray-600 dark:text-gray-300">Benefits include:</p>
              <ul className="mt-2 space-y-2">
                <Feature title="50 Links" />
                <Feature title="Customizable Themes" />
                <Feature title="Basic Analytics" />
                <Feature title="Community Support" />
              </ul>
            </div>
          </div>
          <div className="p-5">
            <button
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300"
            >
              Choose Free
            </button>
          </div>
        </CardSpotlight>
      </div>

      <div className="relative group">
        <CardSpotlight className="h-[443px] w-[23rem] flex flex-col justify-between shadow-2xl rounded-2xl bg-white dark:bg-gray-800 overflow-hidden transform transition duration-500 group-hover:scale-105">
          <div className="p-5">
            <p className="font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500 dark:from-yellow-300 dark:to-red-400">
              PREMIUM
            </p>
            <div className="mt-4">
              <p className="font-medium text-gray-600 dark:text-gray-300">Unlock these features:</p>
              <ul className="mt-2 space-y-2">
                <Feature title="Unlimited Links" />
                <Feature title="Advanced Analytics" />
                <Feature title="Priority Support" />
                <Feature title="Access to New Themes" />
              </ul>
            </div>
          </div>
          <div className="p-5">
            <button
              className="w-full bg-gradient-to-r from-yellow-400 to-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition duration-300"
            >
              Get Premium
            </button>
          </div>
        </CardSpotlight>
      </div>
    </div>
  );
}

const Feature = ({ title }) => {
  return (
    <li className="flex items-center gap-3">
      <Checkmark />
      <span className="text-gray-800 dark:text-gray-100">{title}</span>
    </li>
  );
};

const Checkmark = () => {
  return (
    <svg
      className="w-5 h-5 text-green-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  );
};
