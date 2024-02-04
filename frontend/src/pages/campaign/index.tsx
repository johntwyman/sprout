import * as React from 'react';

import Grid from '@mui/material/Grid';

function Campaign() {
  return (
<Grid container direction="row" xs={12} style={{ height: '100vh', backgroundColor: '#007239' }}> {/* Full viewport height */}
  <Grid item xs={12} md={9} style={{ height: '100%' }}> {/* Full height within parent grid */}
    <Grid container direction="column" spacing={2}> {/* Spacing between grid items */}
      <Grid item xs={12} md={4} style={{ height: '33%', backgroundColor: 'blue'}}> {/* Equal thirds on medium screens and up */}
        1
      </Grid>
      <Grid item xs={12} md={4}>
        2
      </Grid>
      <Grid item xs={12} md={4}>
        3
      </Grid>
    </Grid>
  </Grid>
  <Grid item xs={12} md={3}>
    <ul>
      <li>item 1</li>
      <li>item 2</li>
      <li>item 3</li>
    </ul>
  </Grid>
</Grid>

  );
}

export default Campaign;
