import { FC, useState } from "react";
import { UserType } from "./types";
import { AuthContext } from "./context/AuthContext";
import "./App.css";
import { QueryClientProvider } from "./providers/QueryClientProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/SingIn";
import Home from "./Home";
import RegisterPage from "./pages/RegisterPage";

export const App: FC = () => {
  const userFromStorage = sessionStorage.getItem("user");

  const [user, setUser] = useState<UserType | null>(
    userFromStorage ? JSON.parse(userFromStorage) : null
  );

  return (
    <BrowserRouter>
      <QueryClientProvider>
        <AuthContext.Provider value={{ user, setUser }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </AuthContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};
