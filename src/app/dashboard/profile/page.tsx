// app/dashboard/profile/page.tsx
export default function ProfilePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-4">Your Profile</h1>

      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-white">Username</label>
          <input className="p-2 bg-white/10 text-white rounded-lg w-full" defaultValue="rajat" />
        </div>

        <div>
          <label className="block mb-1 text-white">Email</label>
          <input className="p-2 bg-white/10 text-white rounded-lg w-full" defaultValue="you@example.com" />
        </div>

        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600">
          Save Changes
        </button>
      </div>
    </div>
  );
}
