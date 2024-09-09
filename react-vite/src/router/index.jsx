import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import BCreateForm from '../components/Business/BCreateForm';
import BusinessPage from '../pages/BusinessPage';
import BusinessGrid from '../pages/BusinessGrid';
import Home from '../components/Home/Home';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/business',
        children: [
          {
            path: 'all',
            element: <BusinessGrid />,
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
