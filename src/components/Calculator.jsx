import { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal";

export function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (value) => {
    setInput(input + value);
  };

  const handleClear = () => {
    setInput("");
    setResult("");
  };
  const handleSingleClear = () => {
    setInput(input.slice(0, -1));
  };

  const handleEquals = () => {
    try {
      setResult(eval(input));
    } catch {
      setResult("Error");
    }
  };

  const handleToggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Modal>
      <ModalTrigger
        onClick={handleToggleModal}
        className="bg-white border-2 dark:bg-black mt-2 w-30 h-[44px] dark:text-white text-black flex justify-center group/modal-btn"
      >
        <span className=" text-center  hover:translate-x-0 transition duration-500 group-hover/modal-btn:translate-x-44">
          Calculator
        </span>
        <div className="-translate-x-44 group-hover/modal-btn:translate-x-0 dark:text-white text-black flex items-center justify-center absolute inset-0 transition duration-500 z-20">
          📋Open it
        </div>
      </ModalTrigger>
      <ModalBody>
        <ModalFooter className="h-16 text-transparent">
          <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center w-full mb-8">
            Calculate your{" "}
            <span className="px-1 py-0.5 rounded-md bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
              Numbers
            </span>{" "}
            here!📝
          </h4>
        </ModalFooter>
        <div className="bg-white dark:bg-gray-800 shadow-lg mx-auto my-4 rounded-lg p-6 w-full dark:text-white">
          <div className="mb-4 text-right text-gray-700 dark:text-gray-300">
            <div className="text-xl">{input || "0"}</div>
            <div className="text-3xl font-bold">{result || "0"}</div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {["7", "8", "9", "/"].map((val) => (
              <button
                key={val}
                className="bg-gray-200 dark:bg-gray-900 hover:bg-gray-300 dark:hover:bg-gray-600 text-lg p-4 rounded-md"
                onClick={() => handleClick(val)}
              >
                {val}
              </button>
            ))}
            {["4", "5", "6", "*"].map((val) => (
              <button
                key={val}
                className="bg-gray-200 dark:bg-gray-900 hover:bg-gray-300 dark:hover:bg-gray-600 text-lg p-4 rounded-md"
                onClick={() => handleClick(val)}
              >
                {val}
              </button>
            ))}
            {["1", "2", "3", "-"].map((val) => (
              <button
                key={val}
                className="bg-gray-200 dark:bg-gray-900 hover:bg-gray-300 dark:hover:bg-gray-600 text-lg p-4 rounded-md"
                onClick={() => handleClick(val)}
              >
                {val}
              </button>
            ))}
            <button
              className="col-span-1 bg-gray-200 dark:bg-gray-900 hover:bg-gray-300 dark:hover:bg-gray-600 text-lg p-4 rounded-md"
              onClick={() => handleClick("0")}
            >
              0
            </button>
            <button
              className="bg-gray-200 dark:bg-gray-900 hover:bg-gray-300 dark:hover:bg-gray-600 text-lg p-4 rounded-md"
              onClick={() => handleClick(".")}
            >
              .
            </button>
            <button
              className="bg-gray-200 dark:bg-gray-900 hover:bg-gray-300 dark:hover:bg-gray-600 text-lg p-4 rounded-md"
              onClick={() => handleClick("+")}
            >
              +
            </button>

            <button
              onClick={handleSingleClear}
              className="col-span-1 bg-blue-500 flex justify-center items-center dark:bg-blue-600 hover:bg-yellow-400 dark:hover:bg-yellow-700 rounded-md"
            >
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/ios-glyphs/30/ffffff/clear-symbol.png"
                alt="clear-symbol"
              />
            </button>
            <button
              className="col-span-2 bg-red-400 dark:bg-red-600 hover:bg-red-500 dark:hover:bg-red-700 text-white text-lg p-4 rounded-md"
              onClick={handleClear}
            >
              AC
            </button>
            <button
              className="col-span-2 bg-blue-400 dark:bg-blue-500 hover:bg-blue-500 dark:hover:bg-blue-700 text-white text-lg p-4 rounded-md"
              onClick={handleEquals}
            >
              =
            </button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
