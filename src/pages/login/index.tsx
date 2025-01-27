import React, { useState } from 'react';
import styles from './page.module.scss';
import Input from '@/components/public/input/input';
import Button from '@/components/public/button/button';
import request from 'graphql-request';
import { LOGIN_MUTATION } from '@/shared/graphql/authentication';
import { useNavigate } from 'react-router-dom';
import { setUser } from '@/shared/redux/slices/auth-slice';
import { useAuthentication } from '@/shared/hooks/authentication';
import { fetchCart  } from '@/shared/redux/slices/cart-slice';
import { useAppDispatch } from '@/shared/redux/hooks';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState(false);
  const { getHeader } = useAuthentication();
  const dispatch = useAppDispatch();
  const navigate  = useNavigate();
  const onLogin = async () => {
    const variables = { username, password };
    try {
      const data =
        await request(process.env.REACT_APP_API_ADDRESS, LOGIN_MUTATION, variables);
      if (data) {
        dispatch(setUser(data)); 
        const headers = getHeader(data.login.token);       
        dispatch(fetchCart(headers));       
        navigate('/');
      }
    } catch (error) {
      setHasError(true);
      console.error(error);
    }
  };
  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <Input
          label='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          label='password'
          value={password}
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        {hasError && <span className={styles.error}>error</span>}
        <a href='./signup'>signUp</a>
        <Button className={styles.loginBtn} onClick={onLogin}>
          login
        </Button>
      </div>
    </div>
  );
}
