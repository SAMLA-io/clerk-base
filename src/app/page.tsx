import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <main className="max-w-2xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            SAMLA Clerk Auth Testing
          </h1>
          <p className="text-lg text-gray-600">
            A test application for Clerk SAML authentication
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
                  {user.firstName || "User"}
                </h2>
                <p className="text-gray-600">{user.emailAddresses[0].emailAddress}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500 mb-1">User ID</p>
                <p className="font-mono text-gray-900">{user.id}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500 mb-1">Created</p>
                <p className="text-gray-900">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500 mb-1">Last Updated</p>
                <p className="text-gray-900">
                  {new Date(user.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
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
