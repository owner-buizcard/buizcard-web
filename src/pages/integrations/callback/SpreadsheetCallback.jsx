import { useNavigate } from "react-router-dom";
import { checkCookies } from "../../../utils/utils";
import { fetchConfigData, fetchMainData } from "../../../network/service/appService";
import { useEffect } from "react";
import { dispatch } from "../../../store/store";
import { initialize } from "../../../store/reducers/app";
import { CircularProgress, Stack, Typography } from "@mui/material";
import styled from "@emotion/styled";

const LoaderWrapper = styled('div')(({ _ }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100vh",
  }));

const SpreadsheetCallback =()=>{
    
    const navigate = useNavigate();

    useEffect(()=>{
        const initApp=async()=>{
            const isLoggedIn = checkCookies();
            const data = isLoggedIn ? await fetchMainData() : await fetchConfigData();

            dispatch(initialize(data));

            if(isLoggedIn){
                navigate('/dashboard');
            }else{
                navigate('/login')
            }
        }
        initApp();
    })
    
    return (
        <LoaderWrapper>
            <Stack spacing={2} alignItems={"center"}>
                <CircularProgress size={32}/>
                <Typography variant="subtitle1">Connecting Spreadsheet...</Typography>
            </Stack>
        </LoaderWrapper>
    )
}

export default SpreadsheetCallback;