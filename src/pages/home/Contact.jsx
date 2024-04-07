import { Box, Button, FormLabel, Grid, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material'
import React from 'react'

function Contact() {
  return (
    <Grid container spacing={2} sx={{my: 6}} justifyContent={"center"}>
      <Grid item xs={12} sx={{mb: 3}}>
        <Stack alignItems={"center"} sx={{mb: "32px"}}>
          <Typography variant="h2">Get in touch with our sales team</Typography>
          <Typography>Have a general question about our product, plans, or something else?</Typography>
        </Stack>
      </Grid>
      <Grid item xs={8}>
        <Stack direction={"row"} spacing={4}>
          <Stack spacing={1} sx={{width: "100%"}}>
            <InputLabel htmlFor="email" >First Name</InputLabel>
            <OutlinedInput
                id="email"
                type="email"
                name="email"
                placeholder="Enter first name"
                sx={{
                  p: 0.5,
                  borderRadius: "16px",
                background: "#efefef11"
                }}
                fullWidth
            />
          </Stack>
          <Stack spacing={1} sx={{width: "100%"}}>
            <InputLabel htmlFor="email" >Last Name</InputLabel>
            <OutlinedInput
                id="email"
                type="email"
                name="email"
                placeholder="Enter last name"
                sx={{
                  p: 0.5,
                  borderRadius: "16px",
                background: "#efefef11"
                }}
                fullWidth
            />
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={8}>
        <Stack direction={"row"} spacing={4}>
          <Stack spacing={1} sx={{width: "100%"}}>
            <InputLabel htmlFor="email" >Email Address</InputLabel>
            <OutlinedInput
                id="email"
                type="email"
                name="email"
                placeholder="Enter email address"
                sx={{
                  p: 0.5,
                  borderRadius: "16px",
                background: "#efefef11"
                }}
                fullWidth
            />
          </Stack>
          <Stack spacing={1} sx={{width: "100%"}}>
            <InputLabel htmlFor="email" >Phone Number</InputLabel>
            <OutlinedInput
                id="email"
                type="email"
                name="email"
                placeholder="Enter phone number"
                sx={{
                  p: 0.5,
                  borderRadius: "16px",
                background: "#efefef11"
                }}
                fullWidth
            />
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={8}>
        <Stack spacing={1} sx={{width: "100%"}}>
          <InputLabel htmlFor="email" >Job Title</InputLabel>
          <OutlinedInput
              id="email"
              type="email"
              name="email"
              placeholder="Enter job title"
              sx={{
                p: 0.5,
                borderRadius: "16px",
                background: "#efefef11"
              }}
              fullWidth
          />
        </Stack>
      </Grid>
      <Grid item xs={8}>
        <Stack spacing={1} sx={{width: "100%"}}>
          <InputLabel htmlFor="email" >Website Url</InputLabel>
          <OutlinedInput
              id="email"
              type="email"
              name="email"
              placeholder="Enter website url"
              sx={{
                p: 0.5,
                borderRadius: "16px",
                background: "#efefef11"
              }}
              fullWidth
          />
        </Stack>
      </Grid>
      <Grid item xs={8}>
        <Stack spacing={1} sx={{width: "100%"}}>
          <InputLabel htmlFor="email" >Message</InputLabel>
          <OutlinedInput
              id="email"
              type="email"
              name="email"
              multiline
              rows={10}
              placeholder="Enter your message"
              sx={{
                p: 2.2,
                borderRadius: "16px",
                background: "#efefef11"
              }}
              fullWidth
          />
        </Stack>
      </Grid>
      <Grid item xs={8}>
        <Stack alignItems={"center"}>
          <Button
            variant="contained" 
            onClick={()=>{}}
            sx={{width: "200px", p: 1.5, m: 6, fontWeight: 600, fontSize: "18px", borderRadius: "30px", backgroundImage: 'linear-gradient(45deg, #6200ee 30%, #5b3fa9 90%)'}}>Send</Button>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default Contact