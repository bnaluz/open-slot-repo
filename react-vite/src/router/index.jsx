import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import BusinessTest from '../components/BusinessTest';
import BCreateForm from '../components/Business/BCreateForm';
import BusinessPage from '../pages/BusinessPage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <h1>Welcome!</h1>,
      },
      {
        path: '/business',
        children: [
          {
            path: 'all',
            element: <BusinessTest />,
          },
          {
            path: 'create',
            element: <BCreateForm />,
          },
          {
            path: ':id',
            element: <BusinessPage />,
          },
        ],
      },
      {
        path: 'login',
        element: <LoginFormPage />,
      },
      {
        path: 'signup',
        element: <SignupFormPage />,
      },
    ],
  },
]);
