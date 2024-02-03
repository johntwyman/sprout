import * as React from 'react';

import Grid from '@mui/material/Grid';

function Campaign() {
  return (
    <Grid container style={{ background: "#007239", height: "100vh" }}>
      <Grid item xs={12} md={9}>
        <Grid
          container
          direction="column"
          justifyContent="space-evenly"
          alignItems="flex-start"
        >
          <Grid item xs={12} style={{ background: "#000000" }}>
            <div>Don't be a dick</div>
          </Grid>
          <Grid item xs={12} style={{ background: "#444444" }}>
          <div>Don't be a dick</div>
          </Grid>
          <Grid item xs={12} style={{ background: "#f8f8f8" }}>
          <div>Don't be a dick</div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={3} style={{ background: "#c2c2c2" }}>
      <div>Don't be a dick</div>
      </Grid>
    </Grid>
  );
}

export default Campaign;
