import AuthForm from "../AuthForm";

const SignInPage = () => {
  return (
    <div className="authContainer">
      <AuthForm
        mode="signin"
        title="Sign in to your account"
        buttonText="Login"
        linkUrl="/register"
        linkText="Register"
      />
    </div>
  );
};

export default SignInPage;
