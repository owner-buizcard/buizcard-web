import { Box, Button, Chip, Divider, Grid, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import MainCard from "../../components/MainCard";
import { useSelector } from "react-redux";
import { CheckOutlined } from "@ant-design/icons";
import { useTheme } from "@emotion/react";
import { useEffect, useState } from "react";
import AnimateButton from "../../components/@extended/AnimateButton";
import PaymentButton from "../../components/PaymentButton";

const Pricing =()=>{
  const theme = useTheme();
  const plans = useSelector((state)=>state.app.plans);

  const [monthly, isMonthly] = useState(true);

  const [backgroundPosition, setBackgroundPosition] = useState(0);

  useEffect(() => {
    const index = !monthly ? 0 : 1;
    setBackgroundPosition(`${index * 100}%`);
  }, [monthly]);

  return (
    <>
      <Grid container spacing={2}>
          <Grid item xs={12} sx={{ mb: 0.5 }}>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Stack>
                  <Typography variant="h3">Pricing Plans</Typography>
                  <Typography>Choose the best plan for you or your business.</Typography>
                </Stack>
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
              </Stack>
          </Grid>
          {
            plans.map((plan, index)=>{
              return (
                <Grid item xs={4} key={plan._id}>
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
                        <Typography variant="h2" textAlign={"center"}>{`${monthly ? plan.price.m.amount_string: plan.price.y.amount_string}`}</Typography>
                        <Typography>{`per ${monthly ? 'month' : 'year'}`}</Typography>
                      </Stack>
                      <AnimateButton>
                        <PaymentButton plan={plan} type={monthly ? "m": "y"}/>
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