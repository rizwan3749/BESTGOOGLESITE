import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
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
        "grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto px-4",
        "max-w-5xl w-full",
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
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  icon?: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [links, setLinks] = useState<any[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  const toggleModal = async () => {
    if (!isOpen) {
      await fetchLinks();
    }
    setIsOpen(!isOpen);
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
    <div className="py-4 w-full flex items-center justify-center">
      <div
        className={cn(
          "relative rounded-lg shadow-lg dark:bg-gray-900 bg-white  text-black dark:text-white p-4 cursor-pointer",

          className
        )}
        onClick={toggleModal}
      >
        <div className="flex items-center space-x-4">
          {/* <div className="bg-white p-2 rounded-full text-black">
            {icon}
          </div> */}
          <div className="flex flex-col">
            <div className="text-xl font-bold">{title}</div>
            <div className="text-sm opacity-80">{description}</div>
          </div>
        </div>

        {isOpen && (
          <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-40 z-40  flex items-center justify-center">
              {/* Modal */}
              <div
                ref={modalRef}
                className="relative bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg p-6 transform transition-transform duration-300 scale-90"
                style={{ zIndex: isOpen ? 999 : "auto", width: "50rem" }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Related Links</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white px-3 py-1 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                  >
                    Close
                  </button>
                </div>
                {links.length > 0 ? (
                  <ul className="space-y-3">
                    {links
                      .filter((linkItem) => linkItem.category === title)
                      .map((linkItem, index) => (
                        <li
                          key={index}
                          className="inline-flex m-2 w-[234px] items-center space-x-3 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg p-3 shadow-md"
                        >
                          <img
                            src={linkItem.logoUrl}
                            alt="logo"
                            className="w-6 h-6 rounded-full"
                            onError={(e) => { e.target.src = '/images/pngegg.png'; }}
                          />
                          <a
                            href={linkItem.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 font-semibold dark:text-blue-400 hover:underline"
                          >
                            {linkItem.name}
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
          </>
        )}
      </div>
    </div>
  );
};
