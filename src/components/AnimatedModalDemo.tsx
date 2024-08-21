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
          <ModalContent>
            {/* The rest of your Modal content */}
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
                        <span className="flex-1">{note.text}</span>
                        <button
                          onClick={() => startEdit(index)}
                          className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteNote(note.id)}
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
