import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

import ThermostatIcon from '@mui/icons-material/Thermostat';
import { AppBar, Container, CssBaseline, Stack, Toolbar, Typography } from '@mui/material';

import Link from './Link';

export const PageLoader: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <ThermostatIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            <Link color="inherit" style={{ textDecoration: 'none' }} href="/admin">Sprout</Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          <ThreeDots
            visible={true}
            height="100"
            width="100"
            color="#007236"
            radius="18"
            ariaLabel="loading" />
          <Container maxWidth="sm">
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            ></Stack>
          </Container>
        </Container>
      </main>
    </>
  );
};
