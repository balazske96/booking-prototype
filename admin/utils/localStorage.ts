export const menuOpenedLocalStorageKey = "menu_opened";

export function getIsMenuOpened() {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem(menuOpenedLocalStorageKey);
    if (value) return value === "true";
  }
  return false;
}

export function setMenuIsClosedProperty() {
  if (typeof window !== "undefined") {
    localStorage.setItem(menuOpenedLocalStorageKey, "false");
  }
}

export function setMenuIsOpenedProperty() {
  if (typeof window !== "undefined") {
    localStorage.setItem(menuOpenedLocalStorageKey, "true");
  }
}
