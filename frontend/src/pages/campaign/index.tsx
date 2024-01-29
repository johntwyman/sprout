import React from 'react';
import { useLoaderData } from 'react-router-dom';

import ThermostatIcon from '@mui/icons-material/Thermostat';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { getPledges } from '../../api/pledge';
import Chart from './Chart';
import PledgesProvider from './Context';
import Pledges from './Pledges';
import Summary from './Summary';

const CampaignDashboard: React.FC = () => {
  const [pledges, setPledges] = React.useState<IPledge[]>([]);

  const campaign = useLoaderData() as ICampaign;

  React.useEffect(() => {
    fetchPledges();
  }, [campaign]);

  const fetchPledges = (): void => {
    getPledges(campaign.name)
      .then(({ data: { pledges } }: IPledge[] | any) => setPledges(pledges))
      .catch((err: Error) => console.log(err));
  };

  return (
    <PledgesProvider>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <ThermostatIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Sprout
          </Typography>
        </Toolbar>
      </AppBar>
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
                <Chart />
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
                <Summary />
              </Paper>
            </Grid>
            {/* Pledges */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Pledges />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </PledgesProvider>
  );
};

export default CampaignDashboard;
