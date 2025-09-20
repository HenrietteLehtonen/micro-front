import { Button } from '@/components/ui/button';
import { CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const RegisterForm = () => {
  return (
    <>
      <CardHeader className="text-center">
        <h2 className="text-2xl font-bold">Register</h2>
      </CardHeader>
      <CardContent className="space-y-4 px-6 py-8">
        <div className="space-y-2">
          <Label htmlFor="username">Full Name</Label>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" name="confirm" type="password" required />
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6">
        <div className="w-full flex justify-center">
          <Button>Register</Button>
        </div>
      </CardFooter>
    </>
  );
};

export default RegisterForm;
