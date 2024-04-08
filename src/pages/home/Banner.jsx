import { ArrowRightOutlined } from "@ant-design/icons";
import { Box, Button, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import AnimateButton from "../../components/@extended/AnimateButton";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

const Banner = ()=>{

  const navigate = useNavigate();
  const theme = useTheme();

  const isMdScreen = useMediaQuery('(min-width:960px)');
  const isMobileScreen = useMediaQuery('(min-width:600px)');

  return (
    <Grid container sx={{py: "200px"}}>
      <Grid item xs={12} sx={{justifyContent: "center", display: "flex"}}>
        <Typography 
          sx={{
            background: `linear-gradient(45deg, #DE6262 30%, rgba(79, 75, 255, 0.9294) 90%)`,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            fontSize: "32px",
            lineHeight: 1.2,
            margin: "0 16px 0 16px",
            fontWeight: 800,
            maxWidth: "1000px",
            textAlign: "center",
            [theme.breakpoints.up('md')]: {
              fontSize: "54px",
            },
            [theme.breakpoints.up('sm')]: {
              fontSize: "44px",
            }
          }}  
        >{`Elevate Networking With Ai-Powered Business Cards`}</Typography>
      </Grid>  

      <Grid item xs={12}>
        <Box height={"24px"}/>
      </Grid>

      <Grid item xs={12} sx={{justifyContent: "center", display: "flex"}}>
        <Typography 
          sx={{
            textAlign: "center",
            fontWeight: 500,
            fontSize: "18px",
            margin: "0 36px 0 36px",
            maxWidth: "700px",
            [theme.breakpoints.up('md')]: {
              fontSize: "18px",
            },
            [theme.breakpoints.up('sm')]: {
              fontSize: "18px",
            }
          }}  
        >{`Easily create digital business cards for yourself or your team. Use them to make connections that grow your business.`}</Typography>
      </Grid> 

      <Grid item xs={12}>
        <Box height={"44px"}/>
      </Grid>

      <Grid item xs={12} sx={{justifyContent: "center", display: "flex"}}>

        <AnimateButton>
          <Button
            onClick={()=>navigate('/register')}
            sx={{
              color: "white",
              background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
              borderRadius: "30px",
              padding: "16px 64px",
              cursor: "pointer",
              boxShadow: "0px 4px 14px 0px #DE6262",
              [theme.breakpoints.down('sm')]: {
                padding: "14px 24px",
              }
            }}
          >
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <Typography variant="h4"
                sx={{
                  fontSize: "18px",
                  [theme.breakpoints.down('sm')]: {
                    fontSize: "16px",
                  },
                }}
              >Create Your Card</Typography>
              <ArrowRightOutlined style={{fontSize: !isMobileScreen ? "16px" :"20px"}}/>
            </Stack>
          </Button>
        </AnimateButton>

      </Grid>
    </Grid>
  )
}

export default Banner;