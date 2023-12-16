// material-ui
import { Box, IconButton, useMediaQuery } from '@mui/material';
import Profile from './profile/Profile';
import Search from './Search';
import Notification from './Notification';
import MobileSection from './MobileSection';
import { SettingOutlined, TranslationOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useState } from 'react';
import FullScreen from './screen-mode/FullScreen';

const HeaderContent = ()=>{
    const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

    const [isFullScreen, setFullScreen] = useState(false);

    const handleFullScreenToggle = () => {
        if (!isFullScreen) {
          // Enter full screen
          const element = document.documentElement;
          if (element.requestFullscreen) {
            element.requestFullscreen();
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
          } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
          } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
          }
        } else {
          // Exit full screen
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        }
    
        // Update state
        setFullScreen(!isFullScreen);
      };

    return (
        <>
            {!matchesXs && <Search />}
            {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}

            <FullScreen/>

            <Box sx={{ flexShrink: 0, ml: 1 }}>
                <IconButton
                    disableRipple
                    color="secondary"
                    title="Download Free Version"
                    sx={{ color: 'text.primary', }}
                >
                    <TranslationOutlined />
                </IconButton>
            </Box>

            <Box sx={{ flexShrink: 0, ml: 1 }}>
                    <IconButton
                        disableRipple
                        color="secondary"
                        title="Download Free Version"
                        sx={{ color: 'text.primary' }}
                    >
                        <motion.div
                        animate={{ scale: [1, 1], rotate: 360 }}
                        transition={{ ease: 'easeInOut', repeat: Infinity, duration: 3 }}
                        >
                                    <SettingOutlined />
                        </motion.div>
                    </IconButton>
            </Box>

            <Notification />
            {!matchesXs && <Profile />}
            {matchesXs && <MobileSection />}
        </>
    );
}

export default HeaderContent;