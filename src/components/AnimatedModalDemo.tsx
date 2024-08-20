"use client";
import { useState, useEffect } from 'react';
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalTrigger,
} from "@/components/ui/animated-modal";
import { motion } from "framer-motion";

export function AnimatedModalDemo() {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [editText, setEditText] = useState('');

    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        setNotes(savedNotes);
    }, []);
    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);
    const addNote = () => {
        if (newNote.trim()) {
            setNotes([...notes, newNote]);
            setNewNote('');
        }
    };

    const deleteNote = (index) => {
        setNotes(notes.filter((_, i) => i !== index));
    };

    const startEdit = (index) => {
        setEditIndex(index);
        setEditText(notes[index]);
    };

    const saveEdit = () => {
        const updatedNotes = notes.map((note, i) => (i === editIndex ? editText : note));
        setNotes(updatedNotes);
        setEditIndex(null);
        setEditText('');
    };



    return (
        <div className="py-2 flex items-center justify-center">
            <Modal>
                <ModalTrigger className="bg-white border-2 dark:bg-black dark:text-white text-black flex justify-center group/modal-btn">
                    <span className="group-hover/modal-btn:translate-x-48 text-center transition duration-500">
                        Add Notes
                    </span>
                    <div className="-translate-x-44 group-hover/modal-btn:translate-x-0 dark:text-white text-black flex items-center justify-center absolute inset-0 transition duration-500 z-20">
                        📋Open it
                    </div>
                </ModalTrigger>
                <ModalBody>
                    <ModalContent>
                        <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                            Write your {" "}
                            <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                                text
                            </span>{" "}
                            here!📋
                        </h4>
                        <div className="container mx-auto p-4">
                            <h1 className="text-2xl font-bold mb-4">Notepad</h1>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    value={newNote}
                                    onChange={(e) => setNewNote(e.target.value)}
                                    placeholder="Add a new note..."
                                    className="border p-2 w-full"
                                />
                                <button
                                    onClick={addNote}
                                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Add Note
                                </button>
                            </div>
                            <ul className="list-disc pl-5">
                                {notes.map((note, index) => (
                                    <li key={index} className="mb-2 flex items-center">
                                        {editIndex === index ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={editText}
                                                    onChange={(e) => setEditText(e.target.value)}
                                                    className="border p-2 w-full mr-2"
                                                />
                                                <button
                                                    onClick={saveEdit}
                                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                                >
                                                    Save
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <span className="flex-1">{note}</span>
                                                <button
                                                    onClick={() => startEdit(index)}
                                                    className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => deleteNote(index)}
                                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="py-10 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm mx-auto">
                            <div className="flex  items-center justify-center">
                                <PlaneIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                                    Free users have only write 5 notes!
                                </span>
                            </div>
                            <div className="flex items-center justify-center">
                                <ElevatorIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                                    Check Premium!
                                </span>
                            </div>

                            <div className="flex  items-center justify-center">
                                <FoodIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                                    Write good notes everyday!
                                </span>
                            </div>
                            <div className="flex items-center justify-center">
                                <MicIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                                    Open Mic
                                </span>
                            </div>
                            <div className="flex items-center justify-center">
                                <ParachuteIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                                    you can update notes
                                </span>
                            </div>
                        </div>
                    </ModalContent>
                    <ModalFooter className="gap-4">
                        <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
                            Cancel
                        </button>
                        <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
                            Save Now
                        </button>
                    </ModalFooter>
                </ModalBody>
            </Modal>
        </div>
    );
}

const PlaneIcon = ({ className }: { className?: string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M16 10h4a2 2 0 0 1 0 4h-4l-4 7h-3l2 -7h-4l-2 2h-3l2 -4l-2 -4h3l2 2h4l-2 -7h3z" />
        </svg>
    );
};

const VacationIcon = ({ className }: { className?: string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M17.553 16.75a7.5 7.5 0 0 0 -10.606 0" />
            <path d="M18 3.804a6 6 0 0 0 -8.196 2.196l10.392 6a6 6 0 0 0 -2.196 -8.196z" />
            <path d="M16.732 10c1.658 -2.87 2.225 -5.644 1.268 -6.196c-.957 -.552 -3.075 1.326 -4.732 4.196" />
            <path d="M15 9l-3 5.196" />
            <path d="M3 19.25a2.4 2.4 0 0 1 1 -.25a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 1 .25" />
        </svg>
    );
};

const ElevatorIcon = ({ className }: { className?: string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 4m0 1a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1z" />
            <path d="M10 10l2 -2l2 2" />
            <path d="M10 14l2 2l2 -2" />
        </svg>
    );
};

const FoodIcon = ({ className }: { className?: string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M20 20c0 -3.952 -.966 -16 -4.038 -16s-3.962 9.087 -3.962 14.756c0 -5.669 -.896 -14.756 -3.962 -14.756c-3.065 0 -4.038 12.048 -4.038 16" />
        </svg>
    );
};

const MicIcon = ({ className }: { className?: string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M15 12.9a5 5 0 1 0 -3.902 -3.9" />
            <path d="M15 12.9l-3.902 -3.899l-7.513 8.584a2 2 0 1 0 2.827 2.83l8.588 -7.515z" />
        </svg>
    );
};

const ParachuteIcon = ({ className }: { className?: string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M22 12a10 10 0 1 0 -20 0" />
            <path d="M22 12c0 -1.66 -1.46 -3 -3.25 -3c-1.8 0 -3.25 1.34 -3.25 3c0 -1.66 -1.57 -3 -3.5 -3s-3.5 1.34 -3.5 3c0 -1.66 -1.46 -3 -3.25 -3c-1.8 0 -3.25 1.34 -3.25 3" />
            <path d="M2 12l10 10l-3.5 -10" />
            <path d="M15.5 12l-3.5 10l10 -10" />
        </svg>
    );
};
