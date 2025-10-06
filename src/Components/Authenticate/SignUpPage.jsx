import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

import { UserRound } from "lucide-react";
import { useEffect } from "react";

export default function SignUpPage() {
  const { user } = useUser(); // 👈 get Clerk user object

  useEffect(() => {
    if (user) {
      // send user info to backend
      fetch("/api/users/save-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkId: user.id, // Clerk's unique ID
          name: user.fullName,
          email: user.primaryEmailAddress?.emailAddress,
          number: user.phoneNumbers[0]?.phoneNumber || "",
          username: user.username || user.id, // fallback to ID if no username
        }),
      })
        .then((res) => res.json())
        // .then((data) => console.log("User synced with DB:", data))
        // .catch((err) => console.error("Sync error:", err));
    }
  }, [user]); // runs when user changes (login/logout/update)

  return (
    <>
      <SignedOut className="w-48">
        <SignInButton>
          <UserRound />
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
}
