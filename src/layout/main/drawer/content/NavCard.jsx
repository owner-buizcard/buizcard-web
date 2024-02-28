// material-ui
import { Button, CardMedia, Link, Stack, Typography } from '@mui/material';

// project import

// assets
import avatar from '../../../../assets/images/users/avatar-group.png';
import MainCard from '../../../../components/MainCard';
import AnimateButton from '../../../../components/@extended/AnimateButton';
import { useNavigate } from 'react-router-dom';

// ==============================|| DRAWER CONTENT - NAVIGATION CARD ||============================== //

const NavCard = ()=>{

  const navigate = useNavigate();

  return <MainCard sx={{ bgcolor: 'grey.50', m: 3 }}>
    <Stack alignItems="center" spacing={2.5}>
      {/* <CardMedia component="img" image={avatar} sx={{ width: 112 }} /> */}
      <Stack alignItems="center">
        <Typography variant="h5">Bizcard Pro</Typography>
        <Typography variant="h6" color="secondary">
          Checkout pro features
        </Typography>
      </Stack>
      <AnimateButton>
        <Button onClick={()=>navigate('/profile/pricing')} variant="contained" color="success" size="small">
          Pro
        </Button>
      </AnimateButton>
    </Stack>
  </MainCard>
};

export default NavCard;
