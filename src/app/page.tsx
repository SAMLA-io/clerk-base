"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";

export default function Home() {
  const { isSignedIn, user, isLoaded } = useUser();
  const { userId, sessionId, getToken } = useAuth();
  const [token, setToken] = useState<string>("");
  const [claims, setClaims] = useState<any>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getToken();
        setToken(token || "");
      } catch (error) {
        console.error("Error fetching token:", error);
        setToken("");
      }
    };

    if (isSignedIn) {
      fetchToken();
    }
  }, [getToken, isSignedIn]);

  const verifyUserToken = async () => {
    try {
      const response = await fetch('/api/verify-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();
      if (response.ok) {
        setClaims(data.claims);
      } else {
        console.error('Verification failed:', data.error);
      }
    } catch (error) {
      console.error('Error verifying token:', error);
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <div>Not signed in</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <main className="max-w-2xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            SAMLA Clerk Auth Testing
          </h1>
          <p className="text-lg text-gray-600">
            A test application for Clerk SAMLA authentication
          </p>
        </div>

        {user ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
            <div className="flex items-center space-x-4 mb-6">
              {user.imageUrl && (
                <img
                  src={user.imageUrl}
                  alt={user.firstName || "User"}
                  className="w-16 h-16 rounded-full"
                />
              )}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {user.firstName + " " + user.lastName || "User"}
                </h2>
                <p className="text-gray-600">{user.emailAddresses[0].emailAddress}</p>
              </div>
            </div>

            {/* Session Information */}
            <div className="border-t border-gray-200 my-6"></div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Session Information</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500 mb-1">Session ID</p>
                <p className="font-mono text-gray-900">{userId}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500 mb-1">Session Token</p>
                <p className="font-mono text-gray-900 break-all">{token}</p>
              </div>
            </div>

            {/* Token Verification */}
            <div className="border-t border-gray-200 my-6"></div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Token Verification</h3>

            <button
              onClick={verifyUserToken}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Verify Token
            </button>

            {claims && (
              <div className="mt-4 bg-gray-50 p-4 rounded-lg text-gray-900">
                <p className="mb-2">Token Claims:</p>
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(claims, null, 2)}
                </pre>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-gray-600">
            No user information available
          </div>
        )}
      </main>
    </div>
  );
}
