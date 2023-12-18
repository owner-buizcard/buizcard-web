import { Grid, Stack, Typography } from "@mui/material";
import AuthWrapper from "./AuthWrapper";
import PasswordReset from "./auth-forms/PasswordReset";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const ResetPassword =()=>{

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    Cookies.set('accessToken', token);

    return ( 
        <AuthWrapper>
            <Grid container spacing={3}>
            <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                <Typography variant="h3">Reset Password</Typography>
                </Stack>
                <Typography variant="body1" color={"grey"}>Please choose your new password</Typography>
            </Grid>
            <Grid item xs={12}>
                <PasswordReset />
            </Grid>
            </Grid>
        </AuthWrapper>
    )
}

export default ResetPassword;