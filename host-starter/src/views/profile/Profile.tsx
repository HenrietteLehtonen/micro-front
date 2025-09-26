import React, { Suspense } from "react";
import FormSwitch from "./FormSwitch";
// use user context from mediastore mfe
import { useUserContext } from "mediastore/contextHooks";

const RemoteProfile = React.lazy(() => import("profile/Profile"));

const ProfileRoute = () => {
  const { user } = useUserContext();

  // If you want host to render local edit forms when not authenticated,
  // keep that logic and otherwise render the remote profile when user exists.
  if (!user) {
    return (
      <main className="p-4">
        <div className="w-full max-w-3xl mx-auto">
          <FormSwitch />
        </div>
      </main>
    );
  }

  return (
    <main className="p-4">
      <div className="w-full max-w-3xl mx-auto">
        <Suspense fallback={<div>Loading profile...</div>}>
          <RemoteProfile />
        </Suspense>
      </div>
    </main>
  );
};

export default ProfileRoute;
