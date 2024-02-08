import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { internalAgSystemsTheme } from '@australiangreens/ag-internal-components';
import { Auth0Provider } from '@auth0/auth0-react';
import { ThemeProvider } from '@mui/material';

import { AuthGuard } from './components/AuthGuard';
import NotFound from './pages/404';
import Admin from './pages/admin';
import Campaign from './pages/campaign/Campaign';
import CampaignDashboard from './pages/campaigndashboard';

// Set up routing
const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AuthGuard component={Admin} />,
  },
  {
    path: "/campaign/:campaignName",
    element: <Campaign />,
  },
  {
    path: "/admin/campaign/:campaignName",
    element: <AuthGuard component={CampaignDashboard} />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
      <ThemeProvider theme={internalAgSystemsTheme}>
        <Auth0Provider
          domain={import.meta.env.VITE_AUTH0_DOMAIN}
          clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
          authorizationParams={{
            redirect_uri: window.location.origin,
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
          }}
          useRefreshTokens={true}
          useRefreshTokensFallback={true}
        >
          <RouterProvider router={router} />
        </Auth0Provider>
      </ThemeProvider>
  </React.StrictMode>
);
