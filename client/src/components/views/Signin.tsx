import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../queries/auth";
import AuthForm from "./AuthForm";

const Signin = () => {
  const [signInError, setSignInError] = useState("");
  const navigate = useNavigate(); // React Router navigation

  const handleSignin = async (values: { email: string; password: string }) => {
    setSignInError("");

    try {
      const result = await signIn(values.email, values.password);

      if (!result.success) {
        throw new Error(result.error || "Sign-in failed");
      }

      console.log("Sign in successful, user:", result.user);

      // // Fetch user profile
      // if (result.todos) {
      //   const profileResult = await fetchUserProfile(result.user.id);
      //   if (profileResult.success) {
      //     console.log("User profile:", profileResult.profile);
      //   } else {
      //     console.error("Error fetching user profile:", profileResult.error);
      //   }
      // }

      // Redirect to Home Page
      navigate("/");
    } catch (error: any) {
      console.error(error);
      setSignInError(error.message || "An unexpected error occurred");
    }
  };

  return (
    <AuthForm
      onSubmit={handleSignin}
      buttonLabel="Sign In"
      title="Login Page"
      errorMessage={signInError}
    />
  );
};

export default Signin;
