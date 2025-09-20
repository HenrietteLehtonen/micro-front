import { useState } from 'react';
import { Button } from '@/components/ui/button';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Card } from '@/components/ui/card';

const FormSwitch = () => {
  const [isLogin, setIsLogin] = useState(true);
  const switchForm = () => setIsLogin(!isLogin);
  return (
    <>
      <Card>{isLogin ? <LoginForm /> : <RegisterForm />}</Card>
      <div className="w-full flex justify-center">
        {isLogin ? 'Dont have an account?' : 'Already have an account?'}
      </div>
      <div className="w-full flex justify-center">
        <Button variant="outline" onClick={switchForm}>
          {isLogin ? 'Register' : 'Login'}
        </Button>
      </div>
    </>
  );
};

export default FormSwitch;
