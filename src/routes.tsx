import { useRoutes } from 'react-router-dom';
import Products from '@/pages/products';
import Login from '@/pages/login';
import Layout from '@/components/private/layout/layout';

export default function Routes() {
  let element = useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Products /> },
        { path: '/login', element: <Login /> },
      ],
    },
  ]);
  return element;
}
