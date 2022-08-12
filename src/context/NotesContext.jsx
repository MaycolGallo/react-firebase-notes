import React, { useEffect, createContext, useState } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

export const NotesContext = createContext();

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sort, sortBy] = useState("timestamp");

  function fetchy() {
    onSnapshot(collection(db, "users"), (snap) => {
      let posty = [];
      snap.docs.map((doc) => {
        posty.push({ ...doc.data(), id: doc.id });
      });
      setNotes(posty);
      setLoading(false);
    });

  }

  useEffect(() => {
    fetchy();
  }, []);

  function addNote(data, e) {
    e.target.reset();

    addDoc(collection(db, "users"), {
      name: data.name,
      timestamp: serverTimestamp(),
    });
  }

  const filterNotes = notes.sort((a, b) => {
    let order = sort === "timestamp" ? 1 : -1;
    return a[sort] < b[sort] ? 1 * order : -1 * order;
  });

  async function deleteNote(doc_id) {
    return await deleteDoc(doc(db, "users", doc_id));
  }

  const values = {
    notes,
    loading,
    addNote,
    deleteNote,
    filterNotes,
    sortBy,
  };

  return (
    <NotesContext.Provider value={values}>
      {children}
    </NotesContext.Provider>
  );
}
