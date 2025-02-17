import { createBrowserRouter } from 'react-router-dom';
import Products from '@/pages/products';
import Login from '@/pages/login';
import Layout from '@/components/private/layout/layout';
import NotFound from '@/components/private/page-not-found/page-not-found';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Products />,
      },
      {
        path: "/login",
        element:  <Login />
      },      
    ]
  } 
]);
export default router;
