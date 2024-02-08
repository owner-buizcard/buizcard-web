import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, CircularProgress, Toolbar, useMediaQuery } from '@mui/material';

// project import
import Header from './header/Header';
import navigation from '../../menu-items/index';
import Breadcrumbs from '../../components/@extended/Breadcrumbs';

// types
import { openDrawer } from '../../store/reducers/menu';
import MainDrawer from './drawer/MainDrawer';
import WindowLoader from '../../components/WindowLoader';
import FeatureRequestDialog from '../../components/dialogs/FeatureRequestDialog';
import SendMessageDialog from '../../components/dialogs/SendMessageDialog';


const MainLayout = () => {
  const theme = useTheme();
  const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));
  const dispatch = useDispatch();

  const { drawerOpen } = useSelector((state) => state.menu);


  const isLoading = useSelector((state)=>state.app.isLoading);

  // drawer toggler
  const [open, setOpen] = useState(drawerOpen);
  const handleDrawerToggle = () => {
    setOpen(!open);
    dispatch(openDrawer({ drawerOpen: !open }));
  };

  // set media wise responsive drawer
  useEffect(() => {
    setOpen(!matchDownLG);
    dispatch(openDrawer({ drawerOpen: !matchDownLG }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownLG]);

  useEffect(() => {
    if (open !== drawerOpen) setOpen(drawerOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerOpen]);

  return (
    <Box sx={{ display: 'flex', width: '100%', position: 'relative' }}>

      { isLoading && <WindowLoader/>}
      <Header open={open} handleDrawerToggle={handleDrawerToggle} />
      <MainDrawer open={open} handleDrawerToggle={handleDrawerToggle} />
      <FeatureRequestDialog />
      <SendMessageDialog />
      <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Toolbar />
        <Breadcrumbs navigation={navigation} title />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
