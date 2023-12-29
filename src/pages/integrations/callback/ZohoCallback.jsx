import { useLocation, useNavigate } from "react-router-dom";
import { checkCookies } from "../../../utils/utils";
import { fetchConfigData, fetchMainData } from "../../../network/service/appService";
import { useEffect } from "react";
import { dispatch } from "../../../store/store";
import { initialize } from "../../../store/reducers/app";
import { CircularProgress, Stack, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { connectZohoCRM } from "../../../network/service/integrationService";
import { showSnackbar } from "../../../utils/snackbar-utils";

const LoaderWrapper = styled('div')(({ _ }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100vh",
  }));

const ZohoCallback =()=>{


    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    const server = queryParams.get('accounts-server');

    const navigate = useNavigate();

    useEffect(()=>{
        const initApp=async()=>{

            const connected = await connectZohoCRM(code, server);

            if(connected){
                showSnackbar('Zoho crm connected successfully!', { variant: 'success' });
            }

            navigate('/dashboard');
        }
        initApp();
    })
    
    return (
        <LoaderWrapper>
            <Stack spacing={2} alignItems={"center"}>
                <CircularProgress size={32}/>
                <Typography variant="subtitle1">Connecting Zoho CRM...</Typography>
            </Stack>
        </LoaderWrapper>
    )
}

export default ZohoCallback;