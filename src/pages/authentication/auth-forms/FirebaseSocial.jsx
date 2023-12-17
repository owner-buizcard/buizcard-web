// material-ui
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Button, Stack } from '@mui/material';

// assets
import Google from '../../../assets/images/icons/google.svg';
import Twitter from '../../../assets/images/icons/twitter.svg';
import Facebook from '../../../assets/images/icons/facebook.svg';
import Github from '../../../assets/images/icons/github.svg';
import Linkedin from '../../../assets/images/icons/linkedin.svg';
import { loginWithGithub, loginWithGoogle, loginWithLinkedin } from '../../../network/service/authService';

// ==============================|| FIREBASE - SOCIAL BUTTON ||============================== //

const FirebaseSocial = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const googleHandler = async () => await loginWithGoogle();

  const githubHandler = async () => await loginWithGithub();

  const linkedinHandler = async () => await loginWithLinkedin()

  return (
    <Stack
      direction="row"
      spacing={matchDownSM ? 1 : 2}
      justifyContent={matchDownSM ? 'space-around' : 'space-between'}
      sx={{ '& .MuiButton-startIcon': { mr: matchDownSM ? 0 : 1, ml: matchDownSM ? 0 : -0.5 } }}
    >
      <Button
        variant="outlined"
        color="secondary"
        fullWidth={!matchDownSM}
        startIcon={<img src={Google} alt="Google" />}
        onClick={googleHandler}
      >
        {!matchDownSM && 'Google'}
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth={!matchDownSM}
        startIcon={<img src={Github} alt="Github" />}
        onClick={githubHandler}
      >
        {!matchDownSM && 'Github'}
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth={!matchDownSM}
        startIcon={<img src={Linkedin} alt="Linkedin" />}
        onClick={linkedinHandler}
      >
        {!matchDownSM && 'Linkedin'}
      </Button>
    </Stack>
  );
};

export default FirebaseSocial;
