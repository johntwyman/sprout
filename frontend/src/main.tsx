import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import {
    AuthGuard, getAuth0Expiry, internalAgSystemsTheme, SessionExpiryDialog
} from '@australiangreens/ag-internal-components';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { ThemeProvider } from '@mui/material';

import { getCampaign } from './api/campaign';
import NotFound from './pages/404';
import Admin from './pages/admin';
import CampaignDashboard from './pages/campaigndashboard';
import ScratchPledge from './pages/scratch/pledge';

// Constants used for session timeout, etc.
const DAY_LENGTH = 1000 * 60 * 60 * 24; // In milliseconds.
const MINUTE_LENGTH = 60000; // In milliseconds.
const TIMEOUT_SHOW_DIALOG = 5 * 60 * 1000; // 5 minutes, in milliseconds.
const defaultExpiryTime = new Date().getTime() + DAY_LENGTH;

// Set up routing
const router = createBrowserRouter([
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/scratch/pledge",
    element: <ScratchPledge />,
  },
  {
    path: "/admin/campaign/:campaignId",
    element: <CampaignDashboard />,
    loader: async ({ request, params }) => {
      const campaignId = params.campaignId;
      const campaign = await getCampaign(campaignId as string);
      return campaign.data.campaign; // Object will be available via useLoaderData() in the CampaignDashboard component.
    },
    errorElement: <NotFound />, // Display the NotFound component if an error occurs while loading the campaign data. This will be displayed instead of the CampaignDashboard component.
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

// Set up Auth0 wrapper component to simplify token handling, etc.

const AppInsideAuth = () => {
  const [auth0ExpiryTime, setAuth0ExpiryTime] = useState(defaultExpiryTime);
  const [showSessionExpiry, setShowSessionExpiry] = useState(false);
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getTokenClaims = async () => {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently();
        const tokenExpiry = getAuth0Expiry(token) * 1000;
        setAuth0ExpiryTime(tokenExpiry);
      }
    };
    getTokenClaims();
  }, [getAccessTokenSilently, isAuthenticated, setAuth0ExpiryTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date().getTime();
      const leftOver = auth0ExpiryTime - currentDate;
      if (leftOver < TIMEOUT_SHOW_DIALOG) {
        setShowSessionExpiry(true);
      }
      /*  Check timeout. */
    }, MINUTE_LENGTH);
    return () => clearInterval(interval);
  }, [auth0ExpiryTime, setShowSessionExpiry]);

  return (
    <>
      <ThemeProvider theme={internalAgSystemsTheme}>
        <RouterProvider router={router} />
        <SessionExpiryDialog
          open={showSessionExpiry}
          setAuth0ExpiryTime={setAuth0ExpiryTime}
          closeHandler={() => {
            setShowSessionExpiry(false);
          }}
        />
      </ThemeProvider>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
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
      <AuthGuard appName="Sprout">
        <AppInsideAuth />
      </AuthGuard>
    </Auth0Provider>
  </React.StrictMode>
);
