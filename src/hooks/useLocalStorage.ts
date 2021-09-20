import { useState } from 'react';


export function useLocalStorage(key: string, defaultValue: any) {
  const getInitialValue = () => localStorage.getItem(key) ?? defaultValue;
  const [value, setValue] = useState(getInitialValue);

  const setAndStoreValue = (newValue: any) => {
    setValue(newValue);
    localStorage.setItem(key, newValue);
  };
  return [value, setAndStoreValue];
}