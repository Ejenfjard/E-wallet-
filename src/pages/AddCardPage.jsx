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
      <div className="flex flex-col items-center h-screen lg:flex-row lg:flex justify-evenly lg:items-start w-full">
        <div className="my-4 lg:my-16">
          <Card card={previewCardData} />
        </div>

        <div className="my-4 w-full p-4 lg:w-1/2">
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
