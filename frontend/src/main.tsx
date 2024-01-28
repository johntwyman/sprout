import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ThemeProvider } from '@mui/material';

import theme from './helpers/theme';
import Admin from './pages/admin';
import CampaignDashboard from './pages/campaign';
import ScratchPledge from './pages/scratch/pledge';

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
    element: <CampaignDashboard />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
)
