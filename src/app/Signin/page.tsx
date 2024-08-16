"use client"; // Ensure this is at the top of the file

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth, provider } from "../../firebase";

export default function SignInPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isClient, setIsClient] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // This ensures that the component is only rendered on the client side
    setIsClient(true);
  }, []);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      router.push("/"); // Redirect to homepage
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
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
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-neutral-50 dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome Back
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Sign in to access your account
      </p>

      {error && <p className="text-red-500">Error: {error}</p>}

      <form className="my-8" onSubmit={handleEmailSignIn}>
        <div className="mb-4">
          <label htmlFor="email" className="font-medium">
            Email Address
          </label>
          <input
            id="email"
            placeholder="example@domain.com"
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
          {loading ? "Signing In..." : "Sign In"}
        </button>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        <button
          className="text-neutral-700 border shadow-sm dark:text-neutral-300 text-sm text-center px-4 w-full rounded-md h-10 font-medium bg-white dark:bg-zinc-900"
          type="button"
          onClick={handleGoogleSignIn}
        >
          Sign in with Google
        </button>
      </form>
    </div>
  );
}
