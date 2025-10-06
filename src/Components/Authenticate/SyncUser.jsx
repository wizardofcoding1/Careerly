import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";

export default function SyncUser() {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      // console.log("Syncing Clerk user → backend", user);

      fetch("/api/users/save-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkId: user.id,   // Clerk user id
          name: user.fullName,
          email: user.primaryEmailAddress?.emailAddress,
          number: user.primaryPhoneNumber?.phoneNumber || "",
          username: user.username || user.id, // fallback if no username
        }),
      })
        .then(res => res.json())
        // .then(data => console.log("User synced:", data))
        // .catch(err => console.error("Sync failed:", err));
    }
  }, [user]);

  return null; // this component renders nothing
}
