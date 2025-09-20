import { Link } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";
import { LuBell, LuSearch, LuUpload, LuUser } from "react-icons/lu";
// TODO: import useUserContext from mediastore mfe
import { useUserContext } from "mediastore/contextHooks";

const TopBar = () => {
  const { user } = useUserContext();
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.jpg" alt="logo" width="200" height="50" />
            <span className="sr-only">Acme Inc</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <form className="relative flex w-full max-w-sm items-center">
            <Input
              type="search"
              placeholder="Search..."
              className="h-9 w-full rounded-md border border-input bg-transparent pr-9 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 h-7 w-7 text-muted-foreground"
            >
              <LuSearch className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </form>
        </div>
        <div className="flex items-center gap-4">
          <TooltipProvider>
            {user && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/upload">
                    <Button variant="ghost" size="icon">
                      <LuUpload className="h-5 w-5" />
                      <span className="sr-only">Upload</span>
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Upload</TooltipContent>
              </Tooltip>
            )}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <LuBell className="h-5 w-5" />
                  <span className="sr-only">Notifications</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Notifications</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/profile">
                  <Button variant="ghost" size="icon">
                    <LuUser className="h-5 w-5" />
                    <span className="sr-only">Profile</span>
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>Profile</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
