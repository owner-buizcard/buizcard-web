import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

// material-ui
import {
  Button,
  Divider,
  FormHelperText,
  Grid,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import FirebaseSocial from './FirebaseSocial';
import AnimateButton from '../../../components/@extended/AnimateButton';
import { requestOTP } from '../../../network/service/authService';


const AuthLogin = () => {

  const navigate = useNavigate();

  return (
    <>
      <Formik
        initialValues={{
          email: ''
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .test(
              'email-or-phone',
              'Must be a valid email or phone number',
              (value) => {
                if (!value) return false;
        
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const phoneRegex = /^[0-9]{10,15}$/; 
        
                return emailRegex.test(value) || phoneRegex.test(value);
              }
            )
            .required('Email or phone number is required'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            let data;

            if (emailRegex.test(values.email)) {
              data = {
                provider: 'email',
                email: values.email
              };
            } else {
              data = {
                provider: 'phone',
                phoneNumber: `91${values.email}`
              };
            }
            const result = await requestOTP(data);

            if(result){
              Cookies.set('contactInfo', values.email);
              navigate('/code-verification', { state: { contactInfo: values.email } });
            } 

          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography >Enter your phone number or email to login or create a new account.</Typography>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <OutlinedInput
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter email address or phone number"
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Login
                  </Button>
                </AnimateButton>
              </Grid>
              <Grid item xs={12}>
                <Divider>
                  <Typography variant="caption"> Login with</Typography>
                </Divider>
              </Grid>
              <Grid item xs={12}>
                <FirebaseSocial />
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;
