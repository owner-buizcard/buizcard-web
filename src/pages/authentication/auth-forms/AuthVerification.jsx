import React from 'react';
import PinInput from 'react-pin-input'; // Import PinInput
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// material-ui
import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  Stack,
  Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

import AnimateButton from '../../../components/@extended/AnimateButton';
import { verifyOTP } from '../../../network/service/authService';


const AuthVerification = () => {

  const navigate = useNavigate();

  const contactInfo = Cookies.get('contactInfo') || '';

  const provider = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo)
    ? "email" : "phone";

  return (
    <>
      <Formik
        initialValues={{
          code: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {

            const data = {
              "otp": values.code,
              "provider": provider
            }
            if (provider=="phone") {
              data.phoneNumber = `91${contactInfo}`;
            }else{
              data.email = contactInfo;
            }

            const result =  await verifyOTP(data);

            Cookies.set('accessToken', result.accessToken);

            setStatus({ success: true });
            setSubmitting(false);

            navigate('/loading');

          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="pin-input">{`We've send you code on ${contactInfo}`}</InputLabel>
                    <PinInput
                      id="pin-input"
                      length={6}
                      focus
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: '10px',
                        width: '100%',
                      }}
                      type="numeric"
                      onComplete={(v)=>setFieldValue("code", v)}
                      inputStyle={{
                        borderColor: 'lightgray',
                        borderRadius: '4px',
                        flex: 1,
                        height: '40px',
                        fontSize: '1.2rem'
                      }}
                      inputFocusStyle={{ borderColor: '#3f51b5' }}
                    />
                    {touched.code && errors.code && (
                      <FormHelperText error id="standard-weight-helper-text-email-login">
                        {errors.code}
                      </FormHelperText>
                    )}
                  </Stack>
              </Grid>

              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Continue
                  </Button>
                </AnimateButton>
              </Grid>
              <Grid item xs={12}>
                <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} spacing={1}>
                  <Typography>Did not receive the code?</Typography>
                  <Button>Resend Code</Button>
                </Stack>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthVerification;
