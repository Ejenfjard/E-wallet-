/** @format */
import React from "react";
import Card from "../components/Card";
import AddCardForm from "../components/AddCardForm";
import { useState } from "react";

const AddCardPage = () => {
  const defaultCardData = {
    cardNumber: "1234 5678 9012 3456",
    cardholderName: "John Doe",
    validThru: "12/25",
    vendor: "Default",
  };

  const [previewCardData, setPreviewCardData] = useState(defaultCardData);

  // Funktion som tar emot uppdaterad kortdata från CardForm
  const handleCardDataChange = (newCardData) => {
    setPreviewCardData((prevData) => ({
      ...prevData,
      ...newCardData, // Merge existing data with the new data
    }));
  };

  const resetCardData = () => {
    setPreviewCardData(defaultCardData);
  };

  return (
    <>
      <div className="flex flex-col items-center h-auto lg:flex-row lg:justify-evenly">
        <div className="my-4">
          <Card card={previewCardData} />
        </div>

        <div className="my-4 w-full">
          <AddCardForm
            onCardDataChange={handleCardDataChange}
            resetCardData={resetCardData}
          />
        </div>
      </div>
    </>
  );
};

export default AddCardPage;
