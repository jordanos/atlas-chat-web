import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { publicPages } from 'routes/menu';
import AuthWrapper from '../components/AuthWrapper';
import RegisterForm from '../components/RegisterForm';

const Register: FC = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    // redirect to login page
    navigate(publicPages.login.path);
  };

  return (
    <AuthWrapper>
      <RegisterForm handleRegister={handleRegister} />
    </AuthWrapper>
  );
};

export default Register;
