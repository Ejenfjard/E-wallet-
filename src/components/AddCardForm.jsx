/** @format */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCard } from "../features/card/cardSlice";
import { useNavigate } from "react-router-dom";

const AddCardForm = ({ onCardDataChange, resetCardData }) => {
  const dispatch = useDispatch();
  const cardList = useSelector((state) => state.card);
  const navigate = useNavigate();

  const [errorMessages, setErrorMessages] = useState({});
  const [localCardData, setLocalCardData] = useState({
    cardNumber: "",
    cardholderName: "",
    validThru: "",
    vendor: "",
  });

  const { cardNumber, cardholderName, validThru, vendor } = localCardData;

  useEffect(() => {
    console.log("Updated card list:", cardList);
  }, [cardList]);

  const validateFormData = () => {
    const errors = {};

    if (!cardNumber || cardNumber.length !== 16 || isNaN(cardNumber)) {
      errors.cardNumber = "Kortnummer måste vara 16 siffror";
    }

    if (!cardholderName || /\d/.test(cardholderName)) {
      errors.cardholderName = "Namnet får inte innehålla siffror";
    }

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

    if (!vendor) {
      errors.vendor = "Välj en leverantör";
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalCardData((prev) => ({ ...prev, [name]: value }));

    setErrorMessages((prev) => ({ ...prev, [name]: "" }));

    onCardDataChange({
      [name]: value || "",
    });
  };

  const handleFormData = (e) => {
    e.preventDefault();

    const validationErrors = validateFormData();

    if (Object.keys(validationErrors).length > 0) {
      setErrorMessages(validationErrors);
      return;
    }

    dispatch(addCard(localCardData));
    navigate("/");

    setLocalCardData({
      cardNumber: "",
      cardholderName: "",
      validThru: "",
      vendor: "",
    });

    if (resetCardData) resetCardData();
  };

  return (
    <div className="w-full p-4">
      <form onSubmit={handleFormData} className="">
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
            onChange={handleChange}
            required
            className="h-8"
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
            onChange={handleChange}
            required
            className="h-8"
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
              onChange={handleChange}
              required
              className="h-8"
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
              onChange={handleChange}
              required
              className="h-8"
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
            className="addCard-btn mt-6 w-1/2 lg:w-1/3  py-2 rounded-md md:col-span-2"
          >
            Add card
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCardForm;
