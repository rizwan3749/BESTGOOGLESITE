"use client";
import { useState, useEffect } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import {
  doc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from "@/firebase"; // Adjust import to your firebase setup
import { useAuthState } from "react-firebase-hooks/auth";

export function AnimatedModalDemo() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [user] = useAuthState(auth); // Get the authenticated user

  useEffect(() => {
    if (user) {
      const fetchNotes = async () => {
        const notesCollection = collection(db, "users", user.uid, "notes");
        const notesSnapshot = await getDocs(notesCollection);
        const notesList = notesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotes(notesList);
      };
      fetchNotes();
    }
  }, [user]);

  const addNote = async () => {
    if (newNote.trim() && user) {
      if (user.subscriptionStatus === "free" && notes.length >= 5) {
        alert("Free users can only add upto 5 notes.");
        return;
      }
      const notesCollection = collection(db, "users", user.uid, "notes");
      const docRef = await addDoc(notesCollection, {
        text: newNote,
        createdAt: new Date(),
      });
      setNotes([...notes, { id: docRef.id, text: newNote }]);
      setNewNote("");
    }
  };

  const deleteNote = async (id) => {
    if (user) {
      await deleteDoc(doc(db, "users", user.uid, "notes", id));
      setNotes(notes.filter((note) => note.id !== id));
    }
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditText(notes[index].text);
  };

  const saveEdit = async () => {
    if (editIndex !== null && user) {
      const noteToEdit = notes[editIndex];
      await updateDoc(doc(db, "users", user.uid, "notes", noteToEdit.id), {
        text: editText,
      });
      const updatedNotes = notes.map((note, i) =>
        i === editIndex ? { ...note, text: editText } : note
      );
      setNotes(updatedNotes);
      setEditIndex(null);
      setEditText("");
    }
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
          <ModalFooter className="h-16 text-transparent">
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center w-full mb-8">
              Store your{" "}
              <span className="px-1 py-0.5 rounded-md bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                Thoughts
              </span>{" "}
              here!💭
            </h4>
          </ModalFooter>
          <ModalContent>
            {/* The rest of your Modal content */}
            <div className="container mx-auto p-4">
              <h1 className="text-2xl font-bold mb-4">Notepad</h1>
              <div className="mb-4 ">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a new note..."
                  className="border p-2 w-full"
                />
                <button
                  onClick={addNote}
                  className="mt-2 bg-black text-white px-4 py-2 rounded"
                >
                  Add Note
                </button>
              </div>
              <ul className="list-disc">
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
                          className="bg-black text-white px-4 py-2 rounded"
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <div className="border flex rounded-sm justify-between border-black/10 hover:bg-black/10 transition duration-300 w-full">
                        <div className="px-4 py-2">{note.text}</div>
                        <div>
                          <button
                            onClick={() => startEdit(index)}
                            className=" text-black px-4 py-2 rounded mr-2"
                          >
                            <img
                              width="24"
                              height="24"
                              src="https://img.icons8.com/material-sharp/24/pencil--v2.png"
                              alt="pencil--v2"
                            />
                          </button>
                          <button
                            onClick={() => deleteNote(note.id)}
                            className=" text-black px-4 py-2 rounded"
                          >
                            <img
                              width="24"
                              height="24"
                              src="https://img.icons8.com/material-rounded/24/waste.png"
                              alt="waste"
                            />
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
}
