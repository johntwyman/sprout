import React from 'react';
import { useParams } from 'react-router-dom';

import ThermostatIcon from '@mui/icons-material/Thermostat';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Link from '../../components/Link';
import { PageLoader } from '../../components/PageLoader';
import { useCampaignContext } from '../../context/ContextCampaign';
import PledgesProvider from '../../context/ContextPledges';
import Chart from './Chart';
import Pledges from './Pledges';
import Summary from './Summary';

const Dashboard: React.FC = () => {
const { campaign } = useCampaignContext();

  return (
      <PledgesProvider>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <ThermostatIcon sx={{ mr: 2 }} />
            <Typography variant="h6" color="inherit" noWrap>
              <Link
                color="inherit"
                style={{ textDecoration: "none" }}
                href="/admin"
              >
                Sprout
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
        {!campaign ? (
          <PageLoader />
        ) : (
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
              pt: 2,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h4"
                align="center"
                color="text.primary"
                gutterBottom
              >
                {campaign.heading}
              </Typography>
            </Container>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                    }}
                  >
                    <Chart
                      initialTarget={campaign.initial_target}
                      stretchTarget={campaign.stretch_target}
                    />
                  </Paper>
                </Grid>
                {/* Summary */}
                <Grid item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                    }}
                  >
                    <Summary
                      campaignName={campaign.name}
                      initialTarget={campaign.initial_target}
                      stretchTarget={campaign.stretch_target}
                    />
                  </Paper>
                </Grid>
                {/* Pledges */}
                <Grid item xs={12}>
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    <Pledges />
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Box>
        )}
      </PledgesProvider>
  );
};

export default Dashboard;
