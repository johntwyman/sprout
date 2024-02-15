import ThermostatIcon from '@mui/icons-material/Thermostat';
import { AppBar, Box, Container, CssBaseline, Toolbar, Typography } from '@mui/material';

import Link from '../../components/Link';

const NotFound = () => {
  return (
    <>
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
            404 not found
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default NotFound;
