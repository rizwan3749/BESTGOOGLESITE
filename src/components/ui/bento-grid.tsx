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
        "grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
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
        "row-span-1 rounded-xl  group/bento hover:shadow-xl bg-white transition duration-200 dark:hover:shadow-gray-800 dark:shadow-xl  p-4 dark:bg-gray-900 dark:border-white/[0.2]  border border-transparent justify-between flex flex-col space-y-4",
        className
      )}
    >
      <div className="group-hover/bento:translate-x-2 min-h-28 bg-white dark:bg-gray-700 transition duration-200">
        {icon}
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
          {description}
        </div>
        <div className="flex justify-between items-center mt-2">
          {header}
          <div onClick={toggleAccordion} className="cursor-pointer">
            {isOpen ? "▼" : "▶"} {/* Arrow icon indicating open/close state */}
          </div>
        </div>
        {isOpen && (
          <div>
            {links.length > 0 ? (
              <ul>
                {links
                  .filter((linkItem) => linkItem.category === title) // Compare link category with title
                  .map((linkItem, index) => (
                    <li key={index} className="mb-2">
                      <strong>Link:</strong>{" "}
                      <a
                        href={linkItem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {linkItem.link}
                      </a>
                    </li>
                  ))}
              </ul>
            ) : (
              <p>No bookmarks available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
