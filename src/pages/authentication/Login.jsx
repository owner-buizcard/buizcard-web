import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import AuthLogin from './auth-forms/AuthLogin';
import AuthWrapper from './AuthWrapper';

const Login =()=>(
    <AuthWrapper>
        <Grid container spacing={3}>
        <Grid item xs={12}>
            <Stack direction={"column"} justifyContent={'center'} alignItems={"center"}>
                <Typography variant="h3">Welcome</Typography>
                <Typography variant="h6" color={"grey"}>Create . Share . Connect</Typography>
            </Stack>
        </Grid>
        <Grid item xs={12}>
            <AuthLogin />
        </Grid>
        </Grid>
    </AuthWrapper>
)

export default Login;