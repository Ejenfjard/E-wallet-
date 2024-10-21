/** @format */

import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import EditCardForm from "../components/EditCardForm.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  editCard,
  setCurrentCard,
  activateCard,
  deleteCard,
} from "../features/card/cardSlice.jsx";

export const CardPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cards = useSelector((state) => state.card.cards);
  const currentCard = cards.find((card) => card.id === Number(id));

  const [previewCardData, setPreviewCardData] = useState(currentCard);

  const [isCardActivated, setIsCardActivated] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});

  const handleActivateCard = (id) => {
    dispatch(activateCard({ id }));
    setIsCardActivated(true);
  };

  const handleDeleteCard = () => {
    console.log("Deleting card with ID:", currentCard.id);
    dispatch(deleteCard({ id: currentCard.id }));
    navigate("/");
  };

  const handleCardDataChange = (newCardData) => {
    setEditCardForm((prevData) => ({
      ...prevData,
      ...newCardData,
    }));
    setPreviewCardData((prevData) => ({
      ...prevData,
      ...newCardData,
    }));
  };

  const [editCardForm, setEditCardForm] = useState({
    cardNumber: "",
    cardholderName: "",
    validThru: "",
    vendor: "",
  });

  const validateFormData = () => {
    const errors = {};
    const { cardNumber, cardholderName, validThru, vendor } = editCardForm;

    // RegEx för att matcha kortnummer som har exakt 16 siffror, med eller utan mellanrum
    const cardNumberPattern = /^(\d\s?){16}$/;

    if (!cardNumber || !cardNumberPattern.test(cardNumber)) {
      errors.cardNumber =
        "Kortnummer måste vara 16 siffror (med eller utan mellanrum)";
    }

    if (!cardholderName || /\d/.test(cardholderName)) {
      errors.cardholderName = "Namnet får inte innehålla siffror";
    }

    if (typeof validThru === "string") {
      const [month, year] = validThru.split("/").map(Number);

      if (
        isNaN(month) ||
        month < 1 ||
        month > 12 ||
        isNaN(year) ||
        year < 0 ||
        year > 99
      ) {
        errors.validThru = "Ogiltigt utgångsdatum. Ange som MM/YY.";
      }

      const expiryDate = new Date(2000 + year, month - 1);
      if (expiryDate < new Date()) {
        errors.validThru =
          "Utgångsdatum får inte vara ett datum som redan passerat";
      }
    }

    if (!vendor) {
      errors.vendor = "Välj en leverantör";
    }

    return errors;
  };

  useEffect(() => {
    if (currentCard) {
      setEditCardForm(currentCard); // Sätt initiala värden för formuläret
      setPreviewCardData(currentCard); // Sätt initiala värden för previewCardData
      dispatch(setCurrentCard(currentCard)); // Sätt aktuellt kort
      console.log("Current card:", currentCard);
    } else {
      navigate("/");
    }
  }, [currentCard, dispatch, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateFormData();

    if (Object.keys(validationErrors).length > 0) {
      setErrorMessages(validationErrors); // Sätt felmeddelanden
      return; // Avbryt om det finns fel
    }

    // Om ingen fel finns, fortsätt
    dispatch(editCard({ id: currentCard.id, updatedCard: editCardForm }));
    navigate("/");
  };

  return (
    <>
      <div className="flex flex-col items-center lg:flex-row w-screen h-screen lg:flex justify-evenly lg:items-start">
        <div className="flex flex-col justify-between items-center">
          <div className="flex flex-col ">
            {!currentCard?.isActive && (
              <button
                onClick={() => handleActivateCard(currentCard.id)}
                className="activateCard-btn mt-8 text-xl flex-1 py-2 rounded-md "
              >
                Activate card
              </button>
            )}
            {!currentCard?.isActive && (
              <button
                onClick={handleDeleteCard}
                className=" deleteCard-btn p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 my-4 flex-shrink-0 "
              >
                <span className="mx-2 text-xl">Delete card</span>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            )}
          </div>

          <div className="">
            {currentCard ? (
              <Card card={previewCardData} />
            ) : (
              <p>No cards available</p>
            )}
            {isCardActivated && (
              <div className="text-black-500 font-bold m-4 bg-white text-center">
                Card has been activated!
              </div>
            )}
          </div>
        </div>

        <section
          aria-labelledby="edit-card-heading"
          className="edit-card-section  px-4 lg:w-2/4 w-full"
        >
          <h2
            id="edit-cards-heading"
            className="text-xl mx-4 mt-4 border-b-2 border-neutral-400"
          >
            Edit Card
          </h2>
          <EditCardForm
            handleInputChange={handleCardDataChange}
            handleSubmit={handleSubmit}
            localCardData={editCardForm}
            onCardDataChange={handleCardDataChange}
            errorMessages={errorMessages}
            currentCard={currentCard}
          />
        </section>
      </div>
    </>
  );
};

export default CardPage;
