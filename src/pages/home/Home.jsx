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
import Testimonials from "./Testimonials";
import { useEffect, useLayoutEffect, useRef } from "react";
import Footer from "./Footer";
import Contact from "./Contact";

const Home =()=>{

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const navigate = useNavigate();

  const sectionRefs = {
    home: useRef(null),
    app: useRef(null),
    features: useRef(null),
    pricing: useRef(null),
    testimonials: useRef(null),
    contact: useRef(null),
    faq: useRef(null)
  };

  const handleScrollToSection = (section) => {

    console.log(sectionRefs[section])
    if (sectionRefs[section].current) {
      sectionRefs[section].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Box sx={{position: "relative"}}>
      <Header 
        handleClick={(s)=>handleScrollToSection(s)}
      />
      <Box sx={{display: "flex", flexDirection: "column"}}>
        <div ref={sectionRefs.home}>
          <Banner/>
        </div>
        <div ref={sectionRefs.app}>
          <App/>
        </div>
        <div ref={sectionRefs.features} style={{paddingTop: "42px"}}>
          <Features/>
        </div>
        <div ref={sectionRefs.pricing} style={{paddingTop: "42px"}}>
          <Pricing/>
        </div>
        <div ref={sectionRefs.testimonials} style={{paddingTop: "42px"}}>
          <Testimonials/>
        </div>
        <div ref={sectionRefs.faq} style={{paddingTop: "42px"}}>
          <Faq/>
        </div>
        <div ref={sectionRefs.contact} style={{paddingTop: "42px"}}>
          <Contact/>
        </div>
        <Box
          sx={{
            margin: "54px 0px 54px 0px",
            borderTop: "1px solid rgba(191, 204, 217, 0.5)"
          }}
        />
        <Footer/>
      </Box>
    </Box>
  )
}

export default Home;