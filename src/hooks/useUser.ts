import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { UserType } from "../types";
import { useSessionStorage } from "./useSessionStorage";

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);
  const { setItemSession } = useSessionStorage();

  const addUser = (user: UserType) => {
    setUser(user);
    if (sessionStorage.getItem("user")) {
      setItemSession("user", "");
    } else {
      setItemSession("user", JSON.stringify(user));
    }
  };

  const removeUser = () => {
    setUser(null);
    if (sessionStorage.getItem("user")) {
      setItemSession("user", "");
    }
  };

  return { user, addUser, removeUser };
};
