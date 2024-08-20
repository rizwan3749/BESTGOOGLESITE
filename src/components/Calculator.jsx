import { useState, useEffect } from 'react';
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalTrigger,
} from "@/components/ui/animated-modal";

export function Calculator() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = (value) => {
        setInput(input + value);
    };

    const handleClear = () => {
        setInput('');
        setResult('');
    };

    const handleEquals = () => {
        try {
            setResult(eval(input));
        } catch {
            setResult('Error');
        }
    };

    const handleToggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Modal>
            <ModalTrigger
                onClick={handleToggleModal}
                className="bg-white border-2 dark:bg-black mt-2 w-30 h-10 dark:text-white text-black flex justify-center group/modal-btn"
            >
                <span className=" text-center ">
                    Calculator
                </span>

            </ModalTrigger>
            <ModalBody>
                <h4 className="text-lg md:text-2xl mt-2 text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                    Write your {" "}
                    <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                        Number
                    </span>{" "}
                    here!📋
                </h4>
                <div className="bg-white dark:bg-gray-800 shadow-lg mx-auto my-4 rounded-lg p-6 w-72">
                    <div className="mb-4 text-right text-gray-700 dark:text-gray-300">
                        <div className="text-xl">{input || '0'}</div>
                        <div className="text-3xl font-bold">{result || '0'}</div>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {['7', '8', '9', '/'].map((val) => (
                            <button
                                key={val}
                                className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-lg p-4 rounded-md"
                                onClick={() => handleClick(val)}
                            >
                                {val}
                            </button>
                        ))}
                        {['4', '5', '6', '*'].map((val) => (
                            <button
                                key={val}
                                className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-lg p-4 rounded-md"
                                onClick={() => handleClick(val)}
                            >
                                {val}
                            </button>
                        ))}
                        {['1', '2', '3', '-'].map((val) => (
                            <button
                                key={val}
                                className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-lg p-4 rounded-md"
                                onClick={() => handleClick(val)}
                            >
                                {val}
                            </button>
                        ))}
                        <button
                            className="col-span-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-lg p-4 rounded-md"
                            onClick={() => handleClick('0')}
                        >
                            0
                        </button>
                        <button
                            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-lg p-4 rounded-md"
                            onClick={() => handleClick('.')}
                        >
                            .
                        </button>
                        <button
                            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-lg p-4 rounded-md"
                            onClick={() => handleClick('+')}
                        >
                            +
                        </button>
                        <button
                            className="col-span-2 bg-red-400 dark:bg-red-600 hover:bg-red-500 dark:hover:bg-red-700 text-white text-lg p-4 rounded-md"
                            onClick={handleClear}
                        >
                            C
                        </button>
                        <button
                            className="col-span-2 bg-blue-400 dark:bg-blue-600 hover:bg-blue-500 dark:hover:bg-blue-700 text-white text-lg p-4 rounded-md"
                            onClick={handleEquals}
                        >
                            =
                        </button>
                    </div>
                </div>


                <ModalFooter className="gap-4">
                    <button
                        className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28"
                    >
                        Cancel
                    </button>
                    <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
                        Save Now
                    </button>
                </ModalFooter>
            </ModalBody>
        </Modal>
    );
}
