import React from "react";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AddSpot from "./components/AddSpot";
import Spots from "./components/Spot/Spots";
import SpotDetail from "./components/Spot/SpotDetail";
import Login from "./components/Login";
import Registration from "./components/Registration";

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <header className="header">
          <Header />
        </header>

        <main>
          <Routes>
            <Route path="/" />
            <Route path="/add" element={<AddSpot />} />
            <Route path="/spots" element={<Spots />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/spots/:id" element={<SpotDetail />} />
            <Route path="/spot-list" element={<Navigate to="/Spot-List" />} />
          </Routes>
        </main>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
