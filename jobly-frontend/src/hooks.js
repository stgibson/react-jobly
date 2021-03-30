import React, { useState } from "react";

const useLocalStorage = (key) => {
  const initVal = localStorage.getItem(key);
  const [currItem, setCurrItem] = useState({ [key]: initVal });

  const getItem = () => currItem;

  const setItem = newVal => {
    console.log("setItem(newVal) called");
    localStorage.setItem(key, newVal);
    setCurrItem(currItem => currItem[key] = newVal);
  };

  return [getItem, setItem];
};

export { useLocalStorage };