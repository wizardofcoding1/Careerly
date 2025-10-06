import { useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

export default function CareerlyUpdate() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, isSignedIn } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);

    // Require sign-in
    if (!isSignedIn) {
      setStatus("❌ Please sign in to subscribe.");
      setLoading(false);
      return;
    }

    // Clerk primary email
    const userEmail = user?.primaryEmailAddress?.emailAddress || "";

    // Entered email must match authenticated email
    if (email !== userEmail) {
      setStatus("❌ The email must match your authenticated email address.");
      setLoading(false);
      return;
    }

    const message = `Subject: Welcome to Careerly! Let's build your future.

Hello ${user.firstName ?? ""} ${user.lastName ?? ""},

Welcome to Careerly! We're thrilled to have you join our community.

At Careerly, our mission is to provide you with the resources and insights you need to take control of your career journey. Whether you're looking for your next big opportunity, seeking to upgrade your skills, or simply exploring new career paths, we're here to support you every step of the way.

Your journey is unique, and we're excited to be a part of it. We look forward to seeing all that you achieve.

Best regards,

The Careerly Team`;

    try {
      console.log("📩 Sending payload:", { to: email, message });
      const res = await axios.post("/api/email/send", {
        to: email,
        message,
      });
      if (res?.status >= 200 && res?.status < 300) {
        setStatus("✅ Message sent successfully!");
        setEmail("");
      } else {
        setStatus("❌ Failed to send email!");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to send email!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <label htmlFor="Email" className="text-white text-lg font-semibold">
          Subscribe for Updates
        </label>

        <div
          className="
            flex sm:flex-row gap-2 items-center md:items-center
            bg-blue-600 px-3 py-3 rounded-md shadow-md
            w-full lg:w-fit
          "
        >
          <input
            id="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            className="
              bg-white rounded-md shadow-md
              text-black text-sm px-3 py-2
              focus:outline-none focus:ring-2 focus:ring-black
              w-full lg:w-fit text-left
            "
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading || !isSignedIn}
            className={`
              flex items-center justify-center gap-2
              bg-black text-white px-4 py-2 rounded-md shadow-md
              hover:bg-gray-800 transition-all duration-200
              ${loading || !isSignedIn ? "opacity-70 cursor-not-allowed" : ""}
            `}
          >
            {loading ? <span className="animate-bounce">🚀</span> : "Subscribe"}
          </button>
        </div>

        {status && (
          <p
            className={`text-sm mt-2 ${
              status.includes("✅") ? "text-green-300" : "text-red-300"
            }`}
          >
            {status}
          </p>
        )}
      </form>
    </div>
  );
}
