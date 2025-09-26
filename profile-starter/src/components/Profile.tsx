import React from "react";
import { useUserContext } from "mediastore/contextHooks";

const Profile: React.FC = () => {
  const { user } = useUserContext();

  if (!user) {
    return (
      <main className="p-4">
        <div className="w-full max-w-3xl mx-auto">
          <h1 className="text-xl font-semibold">Profile</h1>
          <p>Please sign in to view your profile.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="p-4">
      <div className="w-full max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="mt-2">Name: {user.name}</p>
        <p>Email: {user.email}</p>
        {/* Add edit forms etc. here */}
      </div>
    </main>
  );
};

export default Profile;