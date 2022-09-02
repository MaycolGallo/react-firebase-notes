import React, { useState, useContext, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { NotesContext } from "../context/NotesContext";
import CheckIcon from "./CheckIcon";

const Filters = memo(({ toggle }) => {
  const toggles = {
    open: { opacity: 1, y: "auto", display: "block" },
    close: {
      opacity: 0,
      y: 0,
      display: "none",
      transition: { duration: 0.22 },
    },
  };
  const { sort, order, sortBy, orderBy } = useContext(NotesContext);

  return (
    <AnimatePresence>
      <motion.div
        initial="close"
        animate={toggle ? "open" : "close"}
        variants={toggles}
        className="mt-2 right-0 z-10 top-12 absolute w-56 rounded-lg bg-white border
       "
      >
        <div className="py-1 divide-y divide-gray-400">
          <button
            onClick={() => sortBy("name")}
            className="target:bg-red-500 px-4 py-2 w-full flex justify-between"
          >
            Ordenar por Nombres
            {sort === "name" && <CheckIcon />}
          </button>
          <button
            onClick={() => sortBy("timestamp")}
            className="px-4 py-2 w-full flex justify-between"
          >
            Ordenar por Fecha
            {sort === "timestamp" && <CheckIcon />}
          </button>
          <button
            onClick={() => orderBy("asc")}
            className="px-4 py-2 w-full flex justify-between"
          >
            Asc
            {order === "asc" && <CheckIcon />}
          </button>
          <button
            onClick={() => orderBy("desc")}
            className="px-4 py-2 w-full flex justify-between"
          >
            Desc
            {order === "desc" && <CheckIcon />}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
});

const Header = ({ children }) => {
  const [show, setShow] = useState(false);
  const { handleSubmit, register } = useForm();
  const { addNote } = useContext(NotesContext);

  return (
    <section className="max-w-2xl px-4 sm:px-0 py-5 mx-auto">
      <h1 className="font-semibold text-4xl text-white">Firebase Notes</h1>
      <div className="flex gap-2 relative justify-between my-3">
        <form onSubmit={handleSubmit(addNote)} className="inline-flex">
          <input
            {...register("name")}
            className="p-2.5 rounded-l-md sm:w-full w-1/2 focus:outline-none rounded-r-none"
            placeholder="Escribe Algo"
            required
            type="text"
          />
          <button
            type="submit"
            className="bg-green-500 inline-flex font-medium rounded-r-md rounded-l-none text-white p-2.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Add
          </button>
        </form>
        <button
          onClick={() => setShow(!show)}
          className="bg-white/60 flex items-center transition active:scale-105 text-black rounded-md shadow px-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 rotate-90"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
          </svg>
          <span className="capitalize hidden sm:ml-2 sm:inline-flex">
            filtrar
          </span>
        </button>
        {<Filters toggle={show} />}
      </div>
      {children}
    </section>
  );
};

export default Header;
