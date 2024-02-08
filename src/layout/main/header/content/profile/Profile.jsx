import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  ButtonBase,
  ClickAwayListener,
  Grid,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography
} from '@mui/material';

import { CustomerServiceOutlined, LogoutOutlined, MessageOutlined, UserOutlined, WalletOutlined } from '@ant-design/icons';
import Transitions from '../../../../../components/@extended/Transitions';
import MainCard from '../../../../../components/MainCard';
import { useSelector } from 'react-redux';
import { clearCookies } from '../../../../../utils/utils';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openMail } from '../../../../../store/reducers/app';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`} {...other}>
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function Profile() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user);

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleLogout = async () => {
    clearCookies();
    setOpen(false);
    navigate('/login');
  };

  const handleViewProfile = async () => {
    setOpen(false);
    navigate('/dashboard/profile');
  };

  const iconBackColorOpen = 'grey.300';

  return (
    <Box sx={{ flexShrink: 0, ml: 1 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? iconBackColorOpen : 'transparent',
          borderRadius: 1,
          '&:hover': { bgcolor: 'secondary.lighter' }
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Stack direction="row" spacing={1} alignItems="center" sx={{ p: 0.5 }}>
          <Avatar alt="profile user" src={''} sx={{ width: 32, height: 32 }} />
          <Typography variant="subtitle1">{user?.firstName} {user?.lastName}</Typography>
        </Stack>
      </ButtonBase>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            {open && (
              <Paper
                sx={{
                  boxShadow: theme.customShadows.z1,
                  width: 240,
                  minWidth: 220,
                  maxWidth: 290,
                  [theme.breakpoints.down('md')]: {
                    maxWidth: 250
                  }
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MainCard elevation={0} border={false} content={false}>
                    <ListItemButton onClick={handleViewProfile}>
                      <ListItemIcon>
                        <UserOutlined />
                      </ListItemIcon>
                      <ListItemText primary="View Profile" />
                    </ListItemButton>
                    <ListItemButton onClick={()=>{
                      setOpen(false);
                      dispatch(openMail({title: "Contact Support", type: "support"}))
                    }}>
                      <ListItemIcon>
                        <CustomerServiceOutlined />
                      </ListItemIcon>
                      <ListItemText primary="Contact Support" />
                    </ListItemButton>
                    <ListItemButton onClick={()=>{
                      setOpen(false);
                      dispatch(openMail({title: "Send Feedback", type: "feedback"}))
                    }}>
                      <ListItemIcon>
                        <MessageOutlined />
                      </ListItemIcon>
                      <ListItemText primary="Send Feedback" />
                    </ListItemButton>
                    <ListItemButton onClick={handleLogout}>
                      <ListItemIcon>
                        <LogoutOutlined />
                      </ListItemIcon>
                      <ListItemText primary="Logout" />
                    </ListItemButton>
                  </MainCard>
                </ClickAwayListener>
              </Paper>
            )}
          </Transitions>
        )}
      </Popper>
    </Box>
  );
}

export default Profile;
