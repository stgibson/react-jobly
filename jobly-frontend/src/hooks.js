import React, { useState } from "react";

const useLocalStorage = (key) => {
  const initVal = localStorage.getItem(key) || null;
  const [currItem, setCurrItem] = useState({ [key]: initVal });

  const getItem = () => currItem[key];

  const setItem = newVal => {
    localStorage.setItem(key, newVal);
    setCurrItem(currItem => currItem[key] = newVal);
  };

  const removeItem = () => {
    localStorage.removeItem(key);
    setCurrItem({ [key]: null });
  };
  
  return [getItem, setItem, removeItem];
};

export { useLocalStorage };