import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const useAuthentication = () => {
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state.authSlice);
  const isAuthenticated = () => {
    if (auth && auth.token) {
      return true;
    } else {
      navigate('/login');
    }
  };
  const getHeader = (token) => {
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
