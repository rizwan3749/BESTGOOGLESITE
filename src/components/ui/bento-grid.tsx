import { cn } from "@/lib/utils";
import * as React from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-4",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [links, setLinks] = React.useState([]);
  const [hasFetchedLinks, setHasFetchedLinks] = React.useState(false);

  const toggleAccordion = async () => {
    setIsOpen(!isOpen);
    if (!hasFetchedLinks && !isOpen) {
      await fetchLinks();
      setHasFetchedLinks(true);
    }
  };

  const fetchLinks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "links"));
      const fetchedLinks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLinks(fetchedLinks);
    } catch (error) {
      console.error("Error fetching links: ", error);
      alert("Error fetching links.");
    }
  };

  return (
    <div
      className={cn(
        "relative rounded-lg shadow-lg bg-white dark:bg-gray-900 border dark:border-gray-700 p-3 flex flex-col space-y-4 transform transition-transform duration-300",
        className,
        {
          "hover:shadow-2xl hover:scale-105 hover:z-10": !isOpen,
        }
      )}
      style={{ zIndex: isOpen ? 999 : 'auto' }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {icon}
          <div className="flex flex-col">
            <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              {title}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {description}
            </div>
          </div>
        </div>
        <div
          onClick={toggleAccordion}
          className="text-gray-600 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          {isOpen ? "▼" : "▶"} {/* Arrow icon */}
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-gray-50 dark:bg-gray-800 z-10 rounded-lg p-4 shadow-inner">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Links</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              Close
            </button>
          </div>
          {links.length > 0 ? (
            <ul className="space-y-2">
              {links
                .filter((linkItem) => linkItem.category === title)
                .map((linkItem, index) => (
                  <li key={index} className="text-sm">
                    <strong>Link:</strong>{" "}
                    <a
                      href={linkItem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {linkItem.link}
                    </a>
                  </li>
                ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No bookmarks available.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
