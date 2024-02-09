import React from 'react';

import { internalAgSystemsTheme } from '@australiangreens/ag-internal-components';
import { createTheme } from '@mui/material/styles';

// Define your new typography variants
const newTypography = {
  pledgeName: {
    fontSize: '2rem',
    fontFamily: 'Roboto',
    color: '#004d25',
  },
  pledgeAmount: {
    fontSize: '1.5rem',
    fontFamily: 'Roboto',
    color: '#004d25',
  }
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    pledgeName: React.CSSProperties;
    pledgeAmount: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    pledgeName?: React.CSSProperties;
    pledgeAmount?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    pledgeName: true;
    pledgeAmount: true;
  }
}

// Create a new theme by merging with existing theme and your custom typography
const theme = createTheme({
  ...internalAgSystemsTheme,
  typography: { ...internalAgSystemsTheme.typography, ...newTypography },
});

export default theme;
