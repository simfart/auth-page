import AuthForm from "../AuthForm";
const RegisterPage = () => {
  return (
    <div className="authContainer">
      <AuthForm
        mode="register"
        title="Create a new account"
        buttonText="Register"
        linkUrl="/sign-in"
        linkText="Sign in"
      />
    </div>
  );
};

export default RegisterPage;
