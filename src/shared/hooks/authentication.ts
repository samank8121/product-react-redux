import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/shared/redux/hooks';

export type Header = {
  Authorization: string;
};

export const useAuthentication = () => {
  const navigate = useNavigate();
  const { auth } = useAppSelector((state) => state.authSlice);
  const isAuthenticated = () => {
    if (auth && auth.token) {
      return true;
    } else {
      navigate('/login');
    }
  };
  const getHeader = (token?:string):Header=> {
    if (token) {
      return {
        Authorization: `Bearer ${token}`,
      };
    }
    return {
      Authorization: `Bearer ${auth?.token}`,
    };
  };

  return { isAuthenticated, getHeader };
};
