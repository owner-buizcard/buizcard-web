import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CircularProgress, Stack, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { connectPipedrive } from "../../../network/service/integrationService";
import { showSnackbar } from "../../../utils/snackbar-utils";

const LoaderWrapper = styled('div')(({ _ }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100vh",
  }));

const PipedriveCallback =()=>{

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');

    const navigate = useNavigate();

    useEffect(()=>{
        const initApp=async()=>{

            const connected = await connectPipedrive(code);

            if(connected){
                showSnackbar('Pipedrive connected successfully!', { variant: 'success' });
            }

            navigate('/dashboard');
        }
        initApp();
    })
    
    return (
        <LoaderWrapper>
            <Stack spacing={2} alignItems={"center"}>
                <CircularProgress size={32}/>
                <Typography variant="subtitle1">Connecting Pipedrive CRM...</Typography>
            </Stack>
        </LoaderWrapper>
    )
}

export default PipedriveCallback;