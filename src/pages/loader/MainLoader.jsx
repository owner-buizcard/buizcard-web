import styled from "@emotion/styled";
import {  CircularProgress, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { checkCookies } from "../../utils/utils";
import { fetchConfigData, fetchMainData } from "../../network/service/appService";
import { useNavigate } from "react-router-dom";
import { dispatch } from "../../store/store";
import { initialize } from "../../store/reducers/app";
import Cookies from "js-cookie";

const LoaderWrapper = styled('div')(({ _ }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100vh",
  }));


const MainLoader =()=>{

    const navigate = useNavigate();

    useEffect(()=>{
        const initApp=async()=>{
            const isLoggedIn = checkCookies();
            const data = isLoggedIn ? await fetchMainData() : await fetchConfigData();
            dispatch(initialize(data));
            const redirect = Cookies.get('redirect');
            Cookies.remove('redirect');
            navigate(redirect ?? '/dashboard');
        }
        initApp();
    })
    
    return (
        <LoaderWrapper>
            <Stack spacing={2} alignItems={"center"}>
                <CircularProgress size={32}/>
                <Typography variant="subtitle1">Initializing...</Typography>
            </Stack>
        </LoaderWrapper>
    )
}

export default MainLoader;