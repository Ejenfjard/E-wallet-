/** @format */

import "./index.css";
import { Routes, Route } from "react-router-dom";

import React from "react";
import { HomePage } from "./pages/HomePage";
import AddCardPage from "./pages/AddCardPage";
import { CardPage } from "./pages/CardPage";
import { SettingsPage } from "./pages/SettingsPage";
import Header from "./components/Header";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <>
      <ThemeProvider>
        <div className="">
          <Header />
          <div className="mainContent w-screen flex flex-col justify-center items-center ">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/addcard" element={<AddCardPage />} />
              <Route path="/card/:id" element={<CardPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
