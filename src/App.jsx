import React, { useContext } from "react";
import Notes from "./components/Notes";
import Header from "./components/Header";
import { NotesContext } from "../src/context/NotesContext";

function App() {
  const { loading } = useContext(NotesContext);
  
  return (
      <div className="bg-gradient-to-r from-violet-500 to-blue-500 min-h-screen">
        <Header>
          {loading ? <div>Loading....</div> : <Notes />}
        </Header>
      </div>
  );
}

export default App;
