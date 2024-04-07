import { ArrowRightOutlined } from "@ant-design/icons";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import AnimateButton from "../../components/@extended/AnimateButton";
import { useNavigate } from "react-router-dom";

const Banner = ()=>{

  const navigate = useNavigate();

  return (
    <Grid container sx={{py: "200px"}}>
      <Grid item xs={2}/>
      <Grid item xs={8} >
        <Typography 
          sx={{
            background: `linear-gradient(45deg, #DE6262 30%, rgba(79, 75, 255, 0.9294) 90%)`,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            fontSize: "54px",
            lineHeight: 1.2,
            fontWeight: 800,
            textAlign: "center"
          }}  
        >{`Grow faster with Popl, the #1 Digital Business Card Platform`}</Typography>
      </Grid>  
      <Grid item xs={2}/>

      <Grid item xs={12}>
        <Box height={"24px"}/>
      </Grid>

      <Grid item xs={3}/>
      <Grid item xs={6}>
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: 500,
            fontSize: "18px"
          }}  
        >Easily create digital business cards for yourself or your team. Use them to make connections that grow your business.</Typography>
      </Grid>
      <Grid item xs={3}/>

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
              boxShadow: "0px 4px 14px 0px #DE6262"
            }}
          >
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <Typography variant="h4">Create Your Card</Typography>
              <ArrowRightOutlined style={{fontSize: "20px"}}/>
            </Stack>
          </Button>
        </AnimateButton>

      </Grid>
    </Grid>
  )
}

export default Banner;