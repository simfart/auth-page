import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles/authForm.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import {
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
} from "./utils/firebase";

interface AuthFormProps {
  mode: "signin" | "register";
  title: string;
  buttonText: string;
  linkUrl: string;
  linkText: string;
}

const initialFormState = {
  email: "",
  password: "",
  name: "",
};

const AuthForm = ({
  mode,
  title,
  buttonText,
  linkUrl,
  linkText,
}: AuthFormProps) => {
  const [formState, setFormState] = useState(initialFormState);
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // handle user logIn / register
    try {
      let user = null;
      setIsSubmitting(true);
      if (mode === "signin") {
        user = await logInWithEmailAndPassword(
          formState.email,
          formState.password
        );
      } else {
        user = await registerWithEmailAndPassword(
          formState.name,
          formState.email,
          formState.password
        );
      }
      if (user !== null) {
        const userData = {
          userId: user.uid || "",
          name: user.displayName || "",
          email: user.email || "",
        };

        login(userData);
        navigate("/");
      }
      setIsSubmitting(false);
    } catch (err) {
      if (err instanceof Error) {
        // Handle authentication-specific errors gracefully
        console.error(err.message);
        alert(err.message);
      } else {
        console.error("Unexpected error", err);
      }
      return null; // Return null in case of error
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h1 className={styles.authTitle}>{title}</h1>
      <input
        type="email"
        placeholder="Email"
        value={formState.email}
        onChange={(event) =>
          setFormState((prevState) => ({
            ...prevState,
            email: event.target.value,
          }))
        }
      />
      <input
        type="password"
        placeholder="Password"
        value={formState.password}
        onChange={(event) =>
          setFormState((prevState) => ({
            ...prevState,
            password: event.target.value,
          }))
        }
      />
      {mode === "register" && (
        <>
          <input
            type="text"
            placeholder="Name"
            value={formState.name}
            onChange={(event) =>
              setFormState((prevState) => ({
                ...prevState,
                name: event.target.value,
              }))
            }
          />
        </>
      )}
      <button type="submit" className="ctaLink">
        {buttonText}
      </button>

      <Link to={linkUrl} className={styles.iconLink}>
        {linkText}
      </Link>
    </form>
  );
};

export default AuthForm;
