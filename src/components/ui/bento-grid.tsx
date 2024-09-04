import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { IoIosArrowDropdown, IoIosArrowDropright } from "react-icons/io";

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
        "grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto px-4",
        "max-w-4xl w-full",
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
  const [isOpen, setIsOpen] = useState(false);
  const [links, setLinks] = useState<any[]>([]);
  const [hasFetchedLinks, setHasFetchedLinks] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
    if (!hasFetchedLinks && !isOpen) {
      setHasFetchedLinks(true);
      fetchLinks();
    }
  };

  const fetchLinks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "links"));
      const fetchedLinks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        logoUrl: `https://logo.clearbit.com/${new URL(doc.data().link).hostname}`,
      }));
      setLinks(fetchedLinks);
    } catch (error) {
      console.error("Error fetching links: ", error);
      alert("Error fetching links.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="py-2 w-full flex items-center justify-center">
      <div
        ref={modalRef}
        className={cn(
          "relative rounded-lg shadow-lg bg-white dark:bg-gray-900 border dark:border-gray-700 p-3 flex flex-col space-y-4 transform transition-transform duration-300",
          className,
          {
            "hover:shadow-2xl hover:scale-105 hover:z-10": !isOpen,
          }
        )}
        style={{ zIndex: isOpen ? 999 : "auto", width: '100%' }}
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
            className="bg-white border-2 dark:bg-gray-800 rounded-xl dark:text-white text-black flex justify-center text-gray-600 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            {isOpen ? <IoIosArrowDropdown /> : <IoIosArrowDropright />}
          </div>
        </div>

        {isOpen && (
          <div className="relative container mx-auto  p-4">
            <div className="absolute z-40 top-12 left-0 mt-2 w-64 bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-inner">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Links</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 px-4 py-2 rounded"
                >
                  Close
                </button>
              </div>
              {links.length > 0 ? (
                <ul className="space-y-2">
                  {links
                    .filter((linkItem) => linkItem.category === title)
                    .map((linkItem, index) => (
                      <li key={index} className="text-sm flex items-center">
                        <img
                          src={linkItem.logoUrl}
                          alt=""
                          className="w-6 rounded-xl h-6 mr-2"
                        />
                        <a
                          href={linkItem.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 uppercase dark:text-blue-500 hover:underline"
                        >
                          <strong className="uppercase">{linkItem.name}</strong>
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
          </div>
        )}
      </div>
    </div>
  );
};
