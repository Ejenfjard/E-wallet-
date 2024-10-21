/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeInactiveCards } from "../features/card/cardSlice";

export const SettingsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "lightmode"; // Hämta temat från localStorage
  });

  // Effekt för att uppdatera body klass när temat ändras
  useEffect(() => {
    document.body.className = theme; // Sätt body klass till valt tema
    localStorage.setItem("theme", theme); // Spara det valda temat i localStorage
  }, [theme]);

  const handleRemoveInactiveCards = () => {
    dispatch(removeInactiveCards());
    navigate("/");
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value); // Uppdatera temat baserat på dropdown
  };

  return (
    <>
      <main className="w-full h-screen">
        <section className="flex flex-col justify-start items-center gap-4">
          <h1 id="theme-heading" className="text-xl">
            Theme
          </h1>
          <div className="flex flex-col items-center p-4">
            <select
              id="options"
              value={theme}
              onChange={handleThemeChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="darkmode">Darkmode</option>
              <option value="lightmode">Lightmode</option>
              <option value="bluemode">Blue</option>
            </select>
          </div>

          <button
            onClick={handleRemoveInactiveCards}
            className="deleteCard-btn  rounded-md transition duration-300 p-2"
          >
            Delete all inactive cards
          </button>
        </section>
      </main>
    </>
  );
};
