export const setLocalStorageItem = (itemName: string, itemData: any) => window.localStorage.setItem(itemName, JSON.stringify(itemData));

export const getLocalStorageItem = (itemName: string) => {
  const stringData = window.localStorage.getItem(itemName);

  return stringData ? JSON.parse(stringData) : null;
};

export const removeLocalStorageItem = (itemName: string) => window.localStorage.removeItem(itemName);
