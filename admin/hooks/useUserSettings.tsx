import React from "react";
import {
  getIsMenuOpened,
  setMenuIsClosedProperty,
  setMenuIsOpenedProperty,
} from "../utils/localStorage";

export interface UserSettingsProviderProps {
  children: React.ReactNode;
}

export interface UserSerttings {
  isMenuOpened: boolean;
  closeMenu: () => void;
  openMenu: () => void;
}

const defaultState: UserSerttings = {
  isMenuOpened: getIsMenuOpened(),
  closeMenu: () => {},
  openMenu: () => {},
};

const UserSettingsContext = React.createContext<UserSerttings>(defaultState);

export function UserSettingsProvider({ children }: UserSettingsProviderProps) {
  const [isMenuOpened, setIsMenuOpened] = React.useState<boolean>(() => {
    return getIsMenuOpened();
  });

  const closeMenu = () => {
    setIsMenuOpened(false);
    setMenuIsClosedProperty();
  };

  const openMenu = () => {
    setIsMenuOpened(true);
    setMenuIsOpenedProperty();
  };

  return (
    <UserSettingsContext.Provider
      value={{
        isMenuOpened,
        closeMenu,
        openMenu,
      }}
    >
      {children}
    </UserSettingsContext.Provider>
  );
}

export default function useUserSetting() {
  return React.useContext(UserSettingsContext);
}
