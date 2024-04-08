import { Box, Button, Chip, Divider, Grid, List, ListItem, ListItemText, Stack, Typography, useMediaQuery } from "@mui/material";
import MainCard from "../../components/MainCard";
import { useSelector } from "react-redux";
import { CheckOutlined } from "@ant-design/icons";
import { useTheme } from "@emotion/react";
import { useEffect, useState } from "react";
import AnimateButton from "../../components/@extended/AnimateButton";
import PaymentButton from "../../components/PaymentButton";
import { useNavigate } from "react-router-dom";

const Pricing =()=>{
  const theme = useTheme();
  const navigate = useNavigate();

  const isMdScreen = useMediaQuery('(min-width:960px)');
  const isMobileScreen = useMediaQuery('(min-width:600px)');

  const plans = [
    {
      name: "Basic",
      features: [
        "1 user access",
        "Create up to 4 digital cards",
        "Mobile app tracking",
        "Customizable profile theme",
        "Collect up to 5 leads",
        "Lock screen feature",
        "Email signature & virtual background",
        "Transcriptions for up to 5 cards",
        "24/7 customer support"
      ],
      price: {
        m: "169",
        y: "1599"
      }
    },
    {
      name: "Pro",
      features: [
        "3 user access",
        "Create up to 10 digital cards",
        "Export & group leads",
        "Brandable QR code",
        "Insights & analytics",
        "Sync with Zoho & Hubspot CRM",
        "Remove branding",
        "Transcriptions for up to 25 cards",
        "Notes & Tags for contacts"
      ],
      price: {
        m: "249",
        y: "2399"
      }
    },
    {
      name: "Pro+",
      features: [
        "5 user access",
        "Create up to 25 digital cards",
        "Personalized link",
        "Custom lead capture form",
        "Lifetime insights & analytics",
        "Embedded videos",
        "Custom card designs",
        "Badge feature",
        "Follow-up & Auto intro email"
      ],
      price: {
        m: "349",
        y: "3349"
      }
    }
  ];

  const [monthly, isMonthly] = useState(true);

  const [backgroundPosition, setBackgroundPosition] = useState(0);

  useEffect(() => {
    const index = !monthly ? 0 : 1;
    setBackgroundPosition(`${index * 100}%`);
  }, [monthly]);

  return (
    <>
      <Grid container spacing={2} justifyContent={"center"} sx={{background: "linear-gradient(45deg, #FE6B8B11 30%, rgba(79, 75, 255, 0.1) 90%)", py: 6, px: !isMobileScreen ? "16px": !isMdScreen ? 6: 12}}>
          <Grid item xs={12} sx={{ mb: 0.5 }}>
            <Stack alignItems={"center"} sx={{mb: "32px"}}>
              <Typography variant="h2">Pricing Plans</Typography>
              <Typography>Choose the best plan for you or your business.</Typography>
            </Stack>
            <Box sx={{display: "flex", justifyContent: "center"}}>
              <Stack
                direction={"row"}
                onClick={()=>{isMonthly(!monthly)}}
                sx={{ border: '2px solid #29aef8', borderRadius: '100px', overflow: 'hidden', position: "relative", cursor: "pointer", background: "#eeeeee" }}
              >
                <Stack value="y" aria-label="list" sx={{zIndex: 3, px: 2, py: 1.6}} direction={"row"}>
                  <Typography variant="h6" sx={{fontWeight: 800, mr: 1}}>Yearly </Typography>
                  <Chip
                    label={"Save 20%"}
                    size="small"
                    style={{fontSize: "12px", background: "#D5ECF5", color: "#056D96", fontWeight: 800}}
                  />
                </Stack>
                <Box value="m" aria-label="module" sx={{zIndex: 3, px: 2, py: 1.6}}>
                  <Typography variant="h6" sx={{fontWeight: 800}}>Monthly</Typography>
                </Box>
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: monthly ? "62%": "65%",
                    height: '100%',
                    backgroundColor: 'white',
                    borderRadius: '100px',
                    boxShadow: '0px 2px 30px #3336',
                    transform: `translateX(${backgroundPosition})`,
                    transition: 'transform 0.3s ease',
                  }}
                />
              </Stack>
            </Box>
          </Grid>
          {
            plans.map((plan, index)=>{
              return (
                <Grid item xs={12} md={6} lg={4}  key={plan._id}>
                  <MainCard
                    sx={{
                      background: index==1 ? "#eff8ff": null
                    }}
                  >
                    <Stack
                      sx={{
                        alignItems: "center"
                      }}
                      spacing={2}
                    >
                      {
                        <Chip label={'Most Popular'} sx={{visibility: index==1 ? "visible" : "hidden", background: "#29aef8", color: "#fff"}}/>
                      }
                      <Typography variant="h4" textAlign={"center"}>{plan.name}</Typography>
                      <Stack
                        sx={{
                          alignItems: "center"
                        }}
                      >
                        <Typography variant="h2" textAlign={"center"}>{`${monthly ? plan.price.m: plan.price.y}`}</Typography>
                        <Typography>{`per ${monthly ? 'month' : 'year'}`}</Typography>
                      </Stack>
                      <AnimateButton>
                        <Button 
                          variant={index==1 ? "contained": "outlined"} onClick={()=>navigate("/register")} 
                          sx={{fontWeight: 600}}>Get Started</Button>
                      </AnimateButton>
                      <Box sx={{p: 2, width: "100%"}}>
                        <Divider
                          sx={{
                            height: "2px",
                            borderRadius: "30px",
                            background: `${theme.palette.primary.main}`,
                            width: "100%"
                          }}
                        />
                      </Box>
                    </Stack>
                    <List>
                      <ListItem>
                        <ListItemText><Typography variant="subtitle1" fontSize={13}>{index==0 ? 'Includes :': index==1 ? 'Everything in Basic plus :': 'Everything in Pro plus :'}</Typography></ListItemText>
                      </ListItem>
                      {plan.features.map((value, index) => (
                        <ListItem key={index}>
                          <CheckOutlined style={{color: "green"}}/>
                          <Box m={1}/>
                          <ListItemText primary={`${value}`} />
                        </ListItem>
                      ))}
                    </List>
                  </MainCard>
                </Grid>
              );
            })
          }
      </Grid>
    </>
  )
}

export default Pricing;