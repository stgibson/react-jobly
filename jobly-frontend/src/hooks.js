import React, { useState } from "react";

/**
 * Custom hook that acts as an interface between the app and local storage
 * @param {string} key 
 * @returns 3 functions to access an item in local storage
 */
const useLocalStorage = (key) => {
  const initVal = localStorage.getItem(key) || null;
  const [currItem, setCurrItem] = useState({ [key]: initVal });

  /**
   * Gets currItem, which reflects the item in local storage
   * @returns item
   */
  const getItem = () => currItem[key];

  /**
   * Sets item to newVal in local storage, and keeps track of its new value in
   * state
   * @param {any} newVal 
   */
  const setItem = newVal => {
    localStorage.setItem(key, newVal);
    setCurrItem(currItem => currItem[key] = newVal);
  };

  /**
   * Removes item from local storage, and sets state to have value null
   */
  const removeItem = () => {
    localStorage.removeItem(key);
    setCurrItem({ [key]: null });
  };
  
  return [getItem, setItem, removeItem];
};

export { useLocalStorage };