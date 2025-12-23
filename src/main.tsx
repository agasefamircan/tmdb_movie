import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import AppProvider from './app/providers/AppProvider';
import router from './routes';

const Main = () => {
  return (
    <React.StrictMode>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<Main />);
