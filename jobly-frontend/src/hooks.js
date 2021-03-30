import React, { useState } from "react";

const useLocalStorage = (key) => {
  const initVal = localStorage.getItem(key);
  const [currItem, setCurrItem] = useState({ [key]: initVal });

  const getItem = () => currItem[key];

  const setItem = newVal => {
    localStorage.setItem(key, newVal);
    setCurrItem(currItem => currItem[key] = newVal);
  };

  return [getItem, setItem];
};

export { useLocalStorage };