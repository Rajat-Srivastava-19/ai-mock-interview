

export default function ProfilePage() {
  return (
    <main className="ml-72 mr-6 mt-6 mb-6">
      <h1 className="text-3xl font-bold text-violet-800 mb-6">Your Profile</h1>

      <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition border-t-4 border-violet-500 p-6 max-w-xl">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Username</label>
            <input
              className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
              defaultValue="rajat"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
            <input
              className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
              defaultValue="you@example.com"
            />
          </div>

          <button className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-violet-600 to-violet-700 text-white hover:opacity-90 shadow-md transition">
            Save Changes
          </button>
        </div>
      </div>
    </main>
  );
}