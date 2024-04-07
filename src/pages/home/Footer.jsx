import { Box, Divider, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import LogoImage from '../../assets/images/logo.png'
import QrImage from '../../assets/images/qr.png'
import MainCard from '../../components/MainCard'
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";


function Footer() {
  return (
    <Grid container px={6} py={3}>
      <Grid item xs={6}>
        <Stack spacing={2}>
          <Box component={"img"} src={LogoImage} width={"180px"}/>
          <Stack spacing={1}>
            <Typography>Scan To Get Buizcard</Typography>
            <Box display={"flex"}>
              <MainCard>
                <Box component={"img"} src={QrImage} width={"100px"}/>
              </MainCard>
            </Box>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={2}>
        <Stack spacing={3} sx={{pt: 1}}>
          <Typography variant='h5'>Product</Typography>
          <Stack spacing={1}>
            <Typography>Features</Typography>
            <Typography>Pricing</Typography>
            <Typography>Testimonials</Typography>
            <Typography>Faq</Typography>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={2}>
        <Stack spacing={3} sx={{pt: 1}}>
          <Typography variant='h5'>Company</Typography>
          <Stack spacing={1}>
            <Typography>About Us</Typography>
            <Typography>Help Center</Typography>
            <Typography>Careers</Typography>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={2}>
        <Stack spacing={3} sx={{pt: 1}}>
          <Typography variant='h5'>Legal</Typography>
          <Stack spacing={1}>
            <Typography>Terms</Typography>
            <Typography>Privacy</Typography>
            <Typography>Contact</Typography>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            margin: "54px 0px 54px 0px",
            borderTop: "1px solid rgba(191, 204, 217, 0.5)"
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
          <Stack spacing={0.5}>
            <Typography variant="h5" sx={{fontWeight: 500}}>Privacy Policy • Terms of Service</Typography>
            <Typography sx={{color: "#6f6f6f"}}>Copyright © Buizcard 2024</Typography>
          </Stack>

          <Stack direction={"row"} spacing={3} >
            <FaSquareInstagram style={{fontSize: "28px", color: "#6f6f6f"}}/>
            <FaLinkedin style={{fontSize: "28px", color: "#6f6f6f"}}/>
            <FaXTwitter style={{fontSize: "28px", color: "#6f6f6f"}}/>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12} sx={{pt: 6}}>
        <Stack alignItems={"center"}>
          <Typography variant="body2" color={"#6f6f6f"}>Powered By</Typography>
          <Typography variant="body1" fontWeight={700} color={"#5b3fa9"}>SPIDERLINGZ</Typography>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default Footer