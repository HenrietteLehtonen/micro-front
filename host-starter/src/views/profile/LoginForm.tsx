import { Button } from "@/components/ui/button";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "@/hooks/formHooks";
import { Credentials } from "@sharedTypes/DBTypes";
// import useUserContext from mediastore mfe
import { useUserContext } from "mediastore/contextHooks";

const LoginForm = () => {
  const { handleLogin } = useUserContext();

  const initValues: Credentials = { username: "", password: "" };

  const doLogin = async () => {
    handleLogin(inputs as Credentials);
  };

  const { handleSubmit, handleInputChange, inputs } = useForm(
    doLogin,
    initValues
  );

  return (
    <form onSubmit={handleSubmit}>
      <CardHeader className="text-center">
        <h2 className="text-2xl font-bold">Login</h2>
      </CardHeader>
      <CardContent className="space-y-4 px-6 py-8">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="myUsername"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            onChange={handleInputChange}
          />
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6">
        <div className="w-full flex justify-center">
          <Button type="submit">Login</Button>
        </div>
      </CardFooter>
    </form>
  );
};

export default LoginForm;
