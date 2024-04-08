import { Box, Grid, Stack, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import MainCard from '../../components/MainCard'
import Feature1 from '../../assets/images/feature1.png'
import { MdOutlineDoubleArrow } from "react-icons/md";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '@emotion/react';

function Features() {


  const theme = useTheme();

  const isMdScreen = useMediaQuery('(min-width:960px)');
  const isMobileScreen = useMediaQuery('(min-width:600px)');

  const features = [
    {
      title: "Lead Generation",
      sub1: "Transform Networking into Opportunities",
      sub2: "Our digital business cards are designed to maximize your lead generation efforts using:",
      items: [
        "Contact Form Integration",
        "WhatsApp and Messaging Integration",
        "Direct Call and Email Buttons",
        "Save contact as VCF card",
        "QR Code Feature",
        "Appointment Scheduling with Calendly",
        "and more..."
      ]
    },
    {
      title: "Exchange Contact",
      sub1: "Simplifying Professional Interactions",
      sub2: "People who see your digital business card can download it, send it to their email.",
      items: [
        "Easy Download in VCF Format",
        "Send Contact to their email",
        "Exchange Contact with you",
        "Exchange Details with you",
        "Centralized Contacts Management",
        "Location Management",
        "and more..."
      ]
    },
    {
      title: "Ways to share",
      sub1: "Elegantly Share Your Digital Identity",
      sub2: "The widest range of options for sharing your digital business card with the world.",
      items: [
        "QR Code",
        "Virtual Background for meetings",
        "Share via Email, Text, WhatsApp, etc",
        "Add Card Link to your social profiles",
        "Email signatures",
        "Download as document",
        "and more..."
      ]
    }
  ]

  return (
    <Box>
      <Stack alignItems={"center"} spacing={ !isMobileScreen ? 6: 12} sx={{py: 6}}>
        <Typography variant="h1" sx={{fontWeight: 600}}>Endless Features</Typography>

        <Stack alignItems={"center"} spacing={ !isMobileScreen ? 0: 8 } >
          {
            features.map((f, idx)=>{
              const { ref, inView } = useInView();
              return (

                <Stack key={f.title} direction={idx%2==0 ? "row": "row-reverse"} sx={{justifyContent: "center"}} spacing={4}>
                  <MainCard
                    sx={{
                      background: `${idx%2==0 ? "#FE6B8B22": "#FF8E5322"}`,
                      height: "430px",
                      width: "430px",
                      [theme.breakpoints.down('sm')]: {
                        width: "100%",
                        margin: "20px !important",
                        height: "fit-content"
                      }
                    }}
                  >
                    <Stack spacing={2} >
                      <Typography variant="h3">{f.title}</Typography>
                      <Typography variant="h5" sx={{fontStyle: "italic"}}>{f.sub1}</Typography>
                      <Typography variant="h5" sx={{fontWeight: 500}}>{f.sub2}</Typography>
                      <Stack spacing={1.2} sx={{color: "#666666"}}>
                        {
                          f.items.map((i, idx)=>{
                            return (
                              <Stack key={`${idx}`} direction={"row"} spacing={2} alignItems={"center"}>
                                <MdOutlineDoubleArrow style={{fontSize: "24px"}}/>
                                <Typography variant="h5" sx={{fontWeight: 500}}>{i}</Typography>
                              </Stack>
                            )
                          })
                        }
                      </Stack>
                    </Stack>
                  </MainCard>
                  {
                    isMdScreen && (
                      <motion.div
                        ref={ref}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : idx%2==0 ? 100 : -100 }}
                        transition={{ duration: 0.5 }}
                      >
                      <MainCard
                          sx={{
                            height: "430px",
                            width: "500px",
                            [theme.breakpoints.up('lg')]: {
                              width: "630px",
                            }
                          }}
                        >
                          <Box component={"img"} src={Feature1} width={"100%"} height={"400px"} sx={{objectFit: "contain"}}/>
                      </MainCard>
                      </motion.div>
                    )
                  }
                </Stack>
              )
            })
          }
        </Stack>
      </Stack>
    </Box>
  )
}

export default Features