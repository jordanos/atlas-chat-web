import { setRedirect } from 'features/app/appSlice';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

interface Props {
  redirectPath: string;
}

const ProtectedRoutes: FC<Props> = ({ redirectPath }) => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();
  const location = useLocation();

  if (!isAuth) {
    dispatch(
      setRedirect({
        redirectPath: location.pathname + location.search,
      })
    );
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
