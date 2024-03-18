import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, Stack, Divider } from '@mui/material';
import AnalyticsImage from '../../assets/images/analytics.png'
import MainCard from '../MainCard';
import { useNavigate } from 'react-router-dom';

const UpgradeDialog = ({ open, onClose, title, content, onOk }) => {
  return (
    <Dialog
      open={open}
      onClose={()=> onClose()}
      slotProps={{ backdrop: { style: { backdropFilter: 'blur(2px)' } } }}
      sx={{padding: "20px"}}
    >
      <MainCard
                borderRadius={1}
                headerBorder
                sx={{maxWidth: "460px" }}
            >
      <Stack justifyContent={"center"} alignItems={"center"} spacing={2}>
        <Box component={"img"} src={AnalyticsImage} width={200}/>
        <Typography variant='h5'>Unlock Analytics with Buizcard Pro</Typography>
        <Typography sx={{textAlign: "center"}}>Track Card Views, Saved Connections, and Lifetime Analytics Of All Your Cards. Analyze Individual Card Performances.</Typography>
        <Divider sx={{width: "100%"}}/>
        <Stack display={"flex"} direction={"row"} spacing={2} justifyContent={"space-between"} sx={{width: "100%"}}>
            <Button variant="outlined" size="medium" color="error" onClick={()=> onClose()} sx={{width: "150px"}}>
                Cancel
            </Button>
            <Button type="submit" variant="contained" size="medium" sx={{width: "150px"}} onClick={()=>onOk()}>
                Upgrade Now
            </Button>
        </Stack>
        </Stack>
      </MainCard>
    </Dialog>
  );
};

export default UpgradeDialog;
