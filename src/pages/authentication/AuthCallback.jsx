import { useTheme } from "@emotion/react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchMainData } from "../../network/service/appService";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { dispatch } from "../../store/store";
import { initialize } from "../../store/reducers/app";

const AuthCallback =()=>{

    const theme = useTheme();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const navigate = useNavigate();

    useEffect(()=>{
        const initApp=async()=>{
            Cookies.set('accessToken', token);

            const data = await fetchMainData();
            dispatch(initialize(data));

            navigate('/dashboard');
        }
        initApp();
    })


    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh",
                    flexDirection: "column",
                    background: theme.palette.background
                }}
            >
                <CircularProgress sx={{m: 1}}/>
                <Typography variant="body1" color={"grey"}>Authenticating...</Typography>
            </Box>
        </>
    )
}

export default AuthCallback;