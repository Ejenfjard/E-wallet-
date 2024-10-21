/** @format */
import React from "react";

const Card = ({ card }) => {
  const {
    vendor = "Visa",
    cardNumber = "1234 1234 1234 1234",
    cardholderName = "John Doe",
    validThru = "11/25",
  } = card || {};

  const cardStyles = {
    Visa: {
      backgroundColor: "#0056B1",
      color: "#FFFFFF",
      logo: "/visa.svg",
    },
    MasterCard: {
      backgroundColor: "#B3061A",
      color: "#fff",
      logo: "/mastercard.svg",
    },
    "American Express": {
      backgroundColor: "#F0EBEB",
      color: "#000000",
      logo: "/american-express.svg",
    },
    Default: {
      backgroundColor: "#D3D3D3",
      color: "#000000",
      logo: "/default-logo.svg",
    },
  };

  const selectedStyle = cardStyles[vendor] || cardStyles.Default;

  return (
    <article
      className="shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg rounded-md flex flex-col p-4 m-2 w-60 font-Rajdhani mt-4"
      style={{
        backgroundColor: selectedStyle.backgroundColor,
        color: selectedStyle.color,
      }}
    >
      <div className="w-full flex justify-end">
        {selectedStyle.logo && (
          <img
            src={selectedStyle.logo}
            alt={`${vendor} logo`}
            className="w-10 items-end"
          />
        )}
      </div>
      <div className="text-xl">
        <span>{cardNumber}</span>
      </div>
      <div className="flex flex-row my-2">
        <div className="w-2/3">
          <h1 className="text-sm">Cardholder name</h1>
          <p className="text-l">{cardholderName}</p>
        </div>
        <div className="">
          <h2 className="text-sm">Valid Thru</h2>
          <p className="text-l">{validThru}</p>
        </div>
      </div>
    </article>
  );
};

export default Card;
