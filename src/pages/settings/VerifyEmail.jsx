import { Box, CircularProgress, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { verifyEmail } from "../../network/service/authService";
import { useTheme } from "@emotion/react";

const VerifyEmail =()=>{

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const theme = useTheme();

    const { replace } = useNavigate();

    useEffect(async()=>{
      const verify=async()=>{
          Cookies.set('accessToken', token);

          await verifyEmail();
          replace('/login');
      }
      verify();
    })

    return ( 
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
          <Typography variant="body1" color={"grey"}>Verifying Email...</Typography>
      </Box>
    )
}

export default VerifyEmail;