import { Button } from '@mui/material';
import { SnackbarProvider, useSnackbar } from 'notistack';

let snackbarRef;

export const initSnackbarRef = (ref) => {
  snackbarRef = ref;
};

export const showSnackbar = (message, options) => {
  if (snackbarRef) {
    snackbarRef.enqueueSnackbar(message, options);
  } else {
    console.error("SnackbarProvider reference not initialized.");
  }
};

export const showUpgradeInfo = (navigate, message) => {
  const defaultOptions = {
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center',
    },
    variant: 'success',
    autoHideDuration: 5000,
    action: (
      <Button color="primary" variant="contained" size="small" onClick={()=>{
        navigate('/profile/pricing')
      }}>
        Upgrade
      </Button>
    ),
  };
  if (snackbarRef) {
    snackbarRef.enqueueSnackbar(message, defaultOptions);
  } else {
    console.error("SnackbarProvider reference not initialized.");
  }
};

export const SnackbarContainer = () => {
  return <SnackbarProvider ref={initSnackbarRef}/>;
};

export const useSnackbarUtils = () => {
  return useSnackbar();
};
