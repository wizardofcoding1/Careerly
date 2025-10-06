import { SignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

export default function SignInPage() {
  return (
    <>
      <SignedIn>
        {/* Redirect to Home if already signed in */}
        <Navigate to="/" replace />
      </SignedIn>

      <SignedOut>
        {/* Show Clerk SignIn form */}
        <SignIn path="/sign-in" routing="path" />
      </SignedOut>
    </>
  );
}
