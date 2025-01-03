// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import AuthWrapper from './AuthWrapper';
import BasicInfo from './auth-forms/BasicInfo';

const Initialize = () => (
  <AuthWrapper>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
          <Typography variant="h3">Welcome !</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <BasicInfo />
      </Grid>
    </Grid>
  </AuthWrapper>
);

export default Initialize;
