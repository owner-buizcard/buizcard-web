import { Grid, Typography } from '@mui/material';

// project import
import AuthWrapper from './AuthWrapper';
import AuthVerification from './auth-forms/AuthVerification';

const Verification =()=>(
    <AuthWrapper>
        <Grid container spacing={3}>
        <Grid item xs={12}>
        <Typography variant="h3">Enter Verification Code</Typography>
        </Grid>
        <Grid item xs={12}>
            <AuthVerification />
        </Grid>
        </Grid>
    </AuthWrapper>
)

export default Verification;