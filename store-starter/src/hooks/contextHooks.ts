// ContextHooks.ts
import { UserContext } from "@/contexts/UserContext";
import { useContext } from "react";
import { MediaContext } from "@/contexts/MediaContext";

// Current recommendation is to use custom hook instead of the context directly
// this way we don't have errors when UserContext is not defined or null (thats why we have the if statement)

const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within an UserProvider");
  }

  return context;
};

const useMediaContext = () => {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error("useMediaContext must be used within an MediaProvider");
  }

  return context;
};

export { useUserContext, useMediaContext };
