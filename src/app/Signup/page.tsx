"use client"; // Ensure this is at the top of the file

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth, provider } from "../../firebase";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationCode, setVerificationCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // This ensures that the component is only rendered on the client side
    setIsClient(true);
  }, []);

  const handleEmailSignUp = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 1: Send OTP to the user's email
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Step 2: Send a verification email (acting as OTP)
      await sendEmailVerification(user);

      setIsOtpSent(true);
      setLoading(false);

      alert("Verification email sent. Please check your inbox.");
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleOtpVerification = async () => {
    setLoading(true);

    try {
      // Verify the email and sign the user in
      await signInWithEmailAndPassword(auth, email, password);
      const user: any = auth.currentUser;

      if (user.emailVerified) {
        router.push("/"); // Redirect to homepage
      } else {
        setError("Email not verified. Please check your inbox.");
      }
    } catch (error: any) {
      setError(error.message);
    }

    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      router.push("/"); // Redirect to homepage
    } catch (error: any) {
      setError(error.message);
    }
  };

  if (!isClient) {
    return null; // Prevents server-side rendering of the component
  }

  return (
    <div className="max-w-md w-full mx-auto mt-4 rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-neutral-50 dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to BESTGOOGLESITES
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Sign up to get additional features
      </p>

      {error && (
        <p className="text-red-500">Something went wrong. Please Try Again</p>
      )}

      {!isOtpSent ? (
        <form className="my-8" onSubmit={handleEmailSignUp}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <div className="flex flex-col space-y-2 w-[48.5%] ">
              <label htmlFor="firstname" className="font-medium">
                First name
              </label>
              <input
                id="firstname"
                placeholder="Tyler"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="border p-2 rounded"
              />
            </div>
            <div className="flex flex-col space-y-2 w-[48.5%] ">
              <label htmlFor="lastname" className="font-medium">
                Last name
              </label>
              <input
                id="lastname"
                placeholder="Durden"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="border p-2 rounded"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="font-medium">
              Email Address
            </label>
            <input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="font-medium">
              Password
            </label>
            <input
              id="password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>
          <button
            className="bg-gradient-to-br from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium"
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Sign Up"}
          </button>
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          <button
            className=" text-neutral-700 border shadow-sm dark:text-neutral-300 text-sm  text-center px-4 w-full  rounded-md h-10 font-medium bg-white dark:bg-zinc-900"
            type="button"
            onClick={handleGoogleSignIn}
          >
            <div className="text-center justify-center gap-2 flex p-3">
              <img src="/images/google.png" className="w-5 h-5" alt="" />
              Sign up with Google
            </div>
          </button>
        </form>
      ) : (
        <div>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Enter the OTP sent to your email.
          </p>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border p-2 rounded w-full mb-4"
          />
          <button
            className="bg-gradient-to-br from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium"
            type="button"
            onClick={handleOtpVerification}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      )}
    </div>
  );
}
