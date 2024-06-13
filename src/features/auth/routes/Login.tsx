import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apiSlice } from 'store/api/apiSlice';
import { LoginReturn } from '../api/types';
import AuthWrapper from '../components/AuthWrapper';
import LoginForm from '../components/LoginForm';
import { initUser, setAuth } from '../userSlice';

const Login: FC = () => {
  const redirectPath = useSelector((state) => state.app.redirectPath);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // initialize user data
    dispatch(setAuth(initUser));
  }, [dispatch]);

  const handleLogin = (data: LoginReturn) => {
    // clear cached api data
    dispatch(apiSlice.util.resetApiState());
    // set user data in store, also api url
    dispatch(
      setAuth({
        isAuth: true,
        token: data.token,
        id: data.user.id,
        username: data.user.username,
        role: data.user.role,
      })
    );
    // redirect to dashboard
    navigate(redirectPath || '/');
  };

  return (
    <AuthWrapper>
      <LoginForm handleLogin={handleLogin} />
    </AuthWrapper>
  );
};

export default Login;
