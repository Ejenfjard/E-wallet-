/** @format */

import React from "react";
import Card from "../components/Card";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();

  const cards = useSelector((state) => state.card.cards);

  // Hämta det aktiva kortet
  const activeCard = cards.find((card) => card.isActive);
  // Filtrera inaktiva kort
  const inactiveCards = cards.filter((card) => !card.isActive);

  const handleCardClick = (id) => {
    navigate(`/card/${id}`);
  };

  console.log("Current cards in Redux:", cards);

  return (
    <>
      <main className="flex flex-col justify-start items-center m-2 h-screen">
        <div className="">
          <section className="" aria-labelledby="active-cards-heading">
            <h1
              className="flex justify-start my-4 text-xl text-neutral-700 lg:justify-center"
              id="active-cards-heading"
            >
              Active cards
            </h1>
            {activeCard ? (
              <div
                className="lg:flex justify-center"
                onClick={() => handleCardClick(activeCard.id)}
              >
                <Card card={activeCard} />
              </div>
            ) : (
              <p className="cardListMessage">Inga aktiva kort tillgängliga.</p>
            )}
          </section>

          <section aria-labelledby="inactive-cards-heading">
            <h2
              className="flex justify-start my-4 text-neutral-700 text-xl lg:justify-center"
              id="inactive-cards-heading"
            >
              Inactive cards
            </h2>
            <div className="card-list lg:flex flex-row">
              {inactiveCards.length > 0 ? (
                inactiveCards.map((card) => (
                  <div key={card.id} onClick={() => handleCardClick(card.id)}>
                    <Card card={card} />
                  </div>
                ))
              ) : (
                <div>
                  <p className="cardListMessage">
                    No cards available. Please add a card.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="">
          {cards.length < 4 && (
            <button
              className="addCard-btn m-4 p-4 rounded-md text-m "
              onClick={() => navigate("/addcard")}
            >
              Add new card
            </button>
          )}
        </div>
      </main>
    </>
  );
};
