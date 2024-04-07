import { AppBar, Box, Button, Divider, Grid, Stack, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import AppBarStyled from "../../layout/main/header/AppBarStyled";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import Header from "./Header";
import Banner from "./Banner";
import Faq from "./Faq";
import App from "./App";
import Pricing from "./Pricing";
import Features from "./Features";

const Home =()=>{

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const navigate = useNavigate();

  return (
    <Box sx={{position: "relative"}}>
      <Header/>
      <Box sx={{display: "flex", flexDirection: "column"}}>
        <Banner/>
        <App/>
        <Features/>
        <Pricing/>
        <Faq/>
      </Box>
    </Box>
  )
}

export default Home;