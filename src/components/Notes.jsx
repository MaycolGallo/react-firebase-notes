import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import ReactTooltip from "react-tooltip";
import { NotesContext } from "../context/NotesContext";

const Notes = () => {
  const { filterNotes, deleteNote } = useContext(NotesContext);

  return (
    <motion.section
      animate={{ y: 15 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="grid sm:grid-cols-2 my-5  gap-4 "
    >
      <AnimatePresence initial={false}>
        {filterNotes.map((n) => (
          <motion.div
            layout="position"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0 }}
            key={n.id}
            className="bg-white px-3 py-2 rounded-md shadow-md"
          >
            <ReactTooltip data-effect="solid" />
            <code className="text-xs">{n.id}</code>
            <h1 className="text-xl font-medium mr-2">{n.name}</h1>
            <div className="flex items-center mt-3 justify-between">
              <p className="block">
                {n.timestamp && (
                  <span
                    data-tip={new Date(n.timestamp.seconds * 1000)}
                    data-class="rounded-md text-xs bg-opacity-50"
                    data-place="bottom"
                    className="align-text-bottom text-gray-600 text-sm hover:underline first-letter:uppercase"
                  >
                    Hace&nbsp;
                    {formatDistanceToNow(new Date(n.timestamp.seconds * 1000), {
                      locale: es,
                    })}
                  </span>
                )}
              </p>

              <button
                onClick={() => deleteNote(n.id)}
                className="bg-orange-600/80 flex items-center gap-x-1 rounded-md px-2.5 py-1 text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                delete
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.section>
  );
};

export default Notes;
