import { Button } from '@/components/ui/button';
import { CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useForm } from '@/hooks/formHooks';
import { useNavigate } from 'react-router-dom';
// import mediastore user context
import { useUserContext } from 'mediastore/contextHooks';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { handleRegister } = useUserContext();

  const initValues = { username: '', email: '', password: '', confirm: '' };

  const doRegister = async () => {
    if (inputs.password !== inputs.confirm) {
      alert('Passwords do not match');
      return;
    }

    try {
      await handleRegister({ username: inputs.username, email: inputs.email, password: inputs.password });
      navigate('/profile');
    } catch (e) {
      alert((e as Error).message);
    }
  };

  const { handleSubmit, handleInputChange, inputs } = useForm(doRegister, initValues);

  return (
    <form onSubmit={handleSubmit}>
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required onChange={handleInputChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" name="confirm" type="password" required onChange={handleInputChange} />
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6">
        <div className="w-full flex justify-center">
          <Button type="submit">Register</Button>
        </div>
      </CardFooter>
    </form>
  );
};

export default RegisterForm;
