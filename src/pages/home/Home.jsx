import { AppBar, Box, Button, Grid, Stack, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import LogoImg from "../../components/Logo/LogoImg";
import AppBarStyled from "../../layout/main/header/AppBarStyled";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Home =()=>{

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const navigate = useNavigate();

  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <Box sx={{
            py: 16, 
            background: 'linear-gradient(180deg, #eee 30%, #fff 90%)',
            position: "relative"
          }}>
            <Toolbar
              sx={{position: "absolute", top: 0, width: "100%"}}
            >
                <Box sx={{width: "200px", height: "70px", display: "flex", alignItems: "center"}}>
                  <LogoImg size={ !isSmallScreen && "large"}/>
                </Box>
                <Box sx={{width: "100%"}}/>
                {
                  !isSmallScreen && <Stack direction={"row"} spacing={4}>
                    <Button sx={{color: "#000", fontFamily: "roboto", fontSize: "18px"}}>Home</Button>
                    <Button sx={{color: "#000", fontFamily: "roboto", fontSize: "18px"}}>Pricing</Button>
                    <Button sx={{color: "#000", fontFamily: "roboto", fontSize: "18px"}}>Blogs</Button>
                    <Button sx={{color: "#000", fontFamily: "roboto", fontSize: "18px"}}>Contact</Button>
                  </Stack>
                }
                <Box sx={{m: 4}}/>
                <Box>
                  <Button onClick={()=>navigate('/login')} sx={{width: "140px", fontSize: { xs: "14px", sm: "16px" }, fontWeight: { xs: 500, sm: 600 }}} variant="contained">Create Card</Button>
                </Box>
              </Toolbar>
            <Stack justifyContent={"center"} alignItems={"center"} sx={{textAlign: "center"}} spacing={3}>
              <Box
                sx={{
                  background: 'linear-gradient(45deg, #36D1DC 30%, #5B86E5 90%)', // Set your gradient colors here
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 900,
                  fontSize: "44px",
                  maxWidth: "1000px",
                  fontFamily: "roboto",
                }}
              >
              <Stack spacing={-1}>
                
                <Typography sx={{fontWeight: 900, fontSize: { xs: "34px", sm: "54px" }, maxWidth: "1000px", fontFamily: "roboto"}}>Elevate Networking With BizCard</Typography>
                
                <Typography sx={{fontWeight: 900, fontSize: { xs: "34px", sm: "54px" }, maxWidth: "1000px", fontFamily: "roboto"}}>Your Digital Bridge to Success.</Typography>
              </Stack>
              </Box>
              <Typography variant={isSmallScreen ? "h5": "h4"} sx={{fontWeight: 500, maxWidth: "600px"}}>Easily create digital business cards for yourself or your team. Use them to make connections that grow your business.</Typography>
              <Box/>
              <Button variant="contained" sx={{
                padding: '12px 64px', 
                fontSize: '1.2rem', 
                fontWeight: 500,
                borderRadius: '32px', 
                fontFamily: "roboto",
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)'
              }} onClick={()=>navigate('/login')}>
                Get started
                <ArrowRightOutlined style={{marginLeft: "12px"}}/>
              </Button>
            </Stack>
          </Box>
        </Grid>  
      </Grid>
    </Box>
  )
}

export default Home;