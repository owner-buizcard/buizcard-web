import { useNavigate } from "react-router-dom";
import AuthWrapper from "./AuthWrapper";
import { Button, Grid, Stack, Typography } from "@mui/material";
import AnimateButton from "../../components/@extended/AnimateButton";

const CheckMail =()=>{

    const navigate = useNavigate();

    return (
        <AuthWrapper>
            <Grid container spacing={5}>
            <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                <Typography variant="h3">Hi, Check Your Mail</Typography>
                </Stack>
                <Typography variant="body1" color={"grey"}>We have sent a password recover instructions to your email.</Typography>
            </Grid>
            <Grid item xs={12}>
                <AnimateButton>
                    <Button onClick={()=>navigate('/login')} disableElevation fullWidth size="large" variant="contained" color="primary">
                    Sign In
                    </Button>
                </AnimateButton>
            </Grid>
            </Grid>
        </AuthWrapper>
    )
}

export default CheckMail;