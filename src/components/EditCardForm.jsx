/** @format */

import React from "react";

const EditCardForm = ({
  handleInputChange,
  localCardData,
  handleSubmit,
  errorMessages,
  currentCard,
}) => {
  const { cardNumber, cardholderName, validThru, vendor } = localCardData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    handleInputChange({ [name]: value });
  };

  const isCardActive = currentCard?.isActive;

  return (
    <>
      <form onSubmit={handleSubmit} className="p-4 w-full">
        {/* Card Number Field */}
        <div className="flex flex-col">
          <label htmlFor="cardNumber" className="mb-2">
            Card Number
          </label>
          <input
            id="cardNumber"
            name="cardNumber"
            type="text"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            required
            onChange={handleChange}
            className="h-8"
            disabled={isCardActive}
          />
          {errorMessages.cardNumber && (
            <p className="bg-red-500 text-white p-2  mb-4">
              {errorMessages.cardNumber}
            </p>
          )}
        </div>

        {/* Cardholder Name Field */}
        <div className="flex flex-col">
          <label htmlFor="cardholderName" className="mb-2">
            Cardholder Name
          </label>
          <input
            id="cardholderName"
            name="cardholderName"
            type="text"
            placeholder="John Doe"
            value={cardholderName}
            required
            onChange={handleChange} // Lägg till onChange
            className="h-8"
            disabled={isCardActive}
          />
          {errorMessages.cardholderName && (
            <p className="bg-red-500 text-white p-2 mb-4">
              {errorMessages.cardholderName}
            </p>
          )}
        </div>

        {/* Valid Thru Field & Vendor field */}
        <div className="flex flex-col lg:flex-row lg:gap-4">
          <div className="flex flex-col lg:w-1/3">
            <label htmlFor="validThru" className="mb-2">
              Valid Thru
            </label>
            <input
              id="validThru"
              name="validThru"
              type="text"
              placeholder="12/25"
              value={validThru}
              required
              onChange={handleChange}
              className="h-8"
              disabled={isCardActive}
            />
            {errorMessages.validThru && (
              <p className="bg-red-500 text-white p-2 mb-4">
                {errorMessages.validThru}
              </p>
            )}
          </div>
          <div className="flex flex-col md:col-span-2 lg:w-2/3">
            <label htmlFor="vendor" className="mb-2">
              Vendor
            </label>
            <select
              id="vendor"
              name="vendor"
              value={vendor}
              required
              onChange={handleChange}
              className="h-8"
              disabled={isCardActive}
            >
              <option value="">Select a vendor</option>
              <option value="Visa">Visa</option>
              <option value="MasterCard">MasterCard</option>
              <option value="American Express">American Express</option>
            </select>
            {errorMessages.vendor && (
              <p className="bg-red-500 text-white p-2  mb-4">
                {errorMessages.vendor}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="w-full flex justify-center">
          <button
            type="submit"
            className="editCard-btn mt-6 w-1/2 lg:w-1/3 py-2 rounded-md  md:col-span-2"
          >
            {isCardActive ? "Go Back" : "Save Changes"}
          </button>
        </div>
      </form>
    </>
  );
};

export default EditCardForm;
