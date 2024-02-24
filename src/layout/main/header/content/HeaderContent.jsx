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
import { useNavigate } from 'react-router-dom';

const HeaderContent = ()=>{
    const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const navigate = useNavigate();

    return (
        <>
            {/* {!matchesXs && <Search />} */}
            {/* {matchesXs &&  */}
            
            <Box sx={{ width: '100%', ml: 1 }} />
            {/* } */}

            <FullScreen/>

            {/* <Box sx={{ flexShrink: 0, ml: 1 }}>
                <IconButton
                    disableRipple
                    color="secondary"
                    sx={{ color: 'text.primary', }}
                >
                    <TranslationOutlined />
                </IconButton>
            </Box> */}

            <Box sx={{ flexShrink: 0, ml: 1 }}>
                    <IconButton
                        disableRipple
                        color="secondary"
                        onClick={
                          ()=>navigate('/dashboard/settings')
                        }
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

            {/* <Notification /> */}
            {!matchesXs && <Profile />}
            {matchesXs && <MobileSection />}
        </>
    );
}

export default HeaderContent;