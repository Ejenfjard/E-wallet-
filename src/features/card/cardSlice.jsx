/** @format */

import { createSlice } from "@reduxjs/toolkit";

import { createSelector } from "reselect";

// Initial state som ska användas
const initialState = {
  cards: [
    {
      id: 1,
      cardNumber: "1234 5678 9876 5432",
      cardholderName: "John Doe",
      validThru: "12/25",
      vendor: "Visa",
      isActive: false, 
    },
    {
      id: 2,
      cardNumber: "9876 5432 1234 5678",
      cardholderName: "Jane Smith",
      validThru: "11/24",
      vendor: "MasterCard",
      isActive: true, 
    },
  ],
  currentCard: null, 
};

export const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCard(state, action) {
      // Hitta det högsta befintliga ID:t i listan
      const highestId =
        state.cards.length > 0
          ? Math.max(...state.cards.map((card) => card.id))
          : 0;

      // Skapa det nya kortet med ett ID som är 1 högre än det högsta befintliga ID:t
      const newCard = {
        ...action.payload,
        id: highestId + 1, // Nytt ID är högsta befintliga + 1
        isActive: false,
      };

      // Lägg till det nya kortet i listan
      state.cards.push(newCard);
    },
    setCurrentCard(state, action) {
      state.currentCard = action.payload;
    },
    editCard(state, action) {
      const { id, updatedCard } = action.payload;
      const index = state.cards.findIndex((card) => card.id === id);
      if (index !== -1) {
        state.cards[index] = { ...state.cards[index], ...updatedCard };
      }
      console.log("Edited card:", state.cards[index]); // Loggar det redigerade kortet
    },
    deleteCard(state, action) {
      const { id } = action.payload; // Hämta id från payload
      state.cards = state.cards.filter((card) => card.id !== id); // Filtrera bort kortet med angivet id
    },
    removeInactiveCards(state) {
      // Filtrera bort alla inaktiva kort
      state.cards = state.cards.filter((card) => card.isActive);
    },

    activateCard(state, action) {
      const { id } = action.payload;
      // Sätt alla kort som inaktiva
      state.cards.forEach((card) => {
        card.isActive = false;
      });
      // Aktivera det kort som valdes
      const index = state.cards.findIndex((card) => card.id === id);
      if (index !== -1) {
        state.cards[index].isActive = true; // Aktiverar det valda kortet
        console.log("Activated card:", state.cards[index]); // Loggar det aktiverade kortet
      }
    },
  },
});

export const selectCurrentCard = (state) => state.card.currentCard;

export const {
  addCard,
  setCurrentCard,
  editCard,
  deleteCard,
  activateCard,
  removeInactiveCards,
} = cardSlice.actions;

export default cardSlice.reducer;
