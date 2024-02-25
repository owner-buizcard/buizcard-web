import { Button, Dialog, FormHelperText, InputLabel, OutlinedInput, Stack, Switch, Typography } from "@mui/material";
import MainCard from "../MainCard";
import { Formik } from "formik";
import * as Yup from 'yup';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { closeFeatureRequest } from "../../store/reducers/app";
import { sendFeatureRequest } from "../../network/service/supportService";

const FeatureRequestDialog =()=>{

    const dispatch = useDispatch();

    const open = useSelector((state)=>state.app.open);
    const user = useSelector((state)=>state.app.user);

    return ( 
        <Dialog open={open} fullWidth
        maxWidth="sm">
            <MainCard
                title={
                    <Typography variant="h5">{`Feature Request`}</Typography>
                }
                borderRadius={1}
                headerBorder
            >
                <Formik
                    initialValues={{
                        request: null
                    }}
                    validationSchema={Yup.object().shape({
                        request: Yup.string().required('Type your request...')
                    })}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                        try {
                            await sendFeatureRequest(user.id, values.request);
                            dispatch(closeFeatureRequest());
                            setStatus({ success: true });
                            setSubmitting(false);
                          } catch (err) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                          }
                    }}
                >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    
                    <form noValidate onSubmit={handleSubmit}>
                    <Stack spacing={3} px={{xs: 0, sm: 4}}>

                        <Stack spacing={1} sx={{py: 2}}>
                            <OutlinedInput
                                id="link"
                                type="text"
                                name="request"
                                value={values.request}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                multiline
                                minRows={6}
                                error={Boolean(touched.request && errors.request)}
                                placeholder={`Enter your requested feature`}
                                fullWidth
                            />
                            {touched.request && errors.request && (
                                <FormHelperText error id="standard-weight-helper-text-request">
                                {errors.request}
                                </FormHelperText>
                            )}
                        </Stack>

                        <Stack display={"flex"} direction={"row"} spacing={2} justifyContent={"end"}>
                            <Button disabled={isSubmitting} variant="text" size="medium" color="error" onClick={()=>dispatch(closeFeatureRequest())}>
                                Cancel
                            </Button>
                            <Button disabled={isSubmitting} type="submit" variant="contained" size="medium">
                                Send
                            </Button>
                        </Stack>

                    </Stack>
                    </form>
                )}
                </Formik>
            </MainCard>
        </Dialog>
    )
}

export default FeatureRequestDialog;