import React, { useState } from "react";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AddSpot from "./components/AddSpot";
import Spots from "./components/Spot/Spots";
import SpotDetail from "./components/Spot/SpotDetail";
import Modal from "react-modal";
import Login from "../src/components/Login";
import SignUp from "./components/SignUp";
import UserContext from '../src/components/UserContext/UserContext';

Modal.setAppElement("#root");

function App() {
  const [user, setUser] = useState(null); // create a state to manage the logged-in user
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <React.Fragment>
        <header className="header">
          <Header />
        </header>

        <main>
          <Routes>
            <Route path="/" />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/add" element={<AddSpot />} />
            <Route path="/spots" element={<Spots />} />
            <Route path="/spots/:id" element={<SpotDetail />} />
            <Route path="/spot-list" element={<Navigate to="/Spot-List" />} />
          </Routes>
        </main>
        </React.Fragment>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;

