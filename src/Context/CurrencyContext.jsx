"use client";
import PropTypes from "prop-types";
import { createContext, useContext, useState, useEffect } from "react";

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("USD");

  // Exchange rates as a constant (no unused setter)
  const exchangeRates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.78,
  };

  // Load saved currency from localStorage
  useEffect(() => {
    const savedCurrency = localStorage.getItem("selectedCurrency");
    if (savedCurrency) setCurrency(savedCurrency);
  }, []);

  // Save currency to localStorage
  useEffect(() => {
    localStorage.setItem("selectedCurrency", currency);
  }, [currency]);

  // Convert price based on selected currency
  const convertPrice = (usdPrice) => {
    const rate = exchangeRates[currency] ?? 1;
    return (usdPrice * rate).toFixed(2);
  };

  const value = {
    currency,
    setCurrency,
    convertPrice,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

// PropTypes to satisfy ESLint about children prop validation
CurrencyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook for easier use
export const useCurrency = () => useContext(CurrencyContext);
