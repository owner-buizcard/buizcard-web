import { Button, Dialog, FormHelperText, InputLabel, OutlinedInput, Stack, Switch, Typography } from "@mui/material";
import MainCard from "../MainCard";
import { Formik } from "formik";
import * as Yup from 'yup';
import { useSelector } from "react-redux";

const ConnectWhatsappDialog =({open, onCancel, onOk})=>{

    const user = useSelector((state)=>state.app.user);

    return ( 
        <Dialog open={open}>
            <MainCard
                title={
                    <Typography variant="h5">{`Update Whatsapp Number`}</Typography>
                }
                borderRadius={1}
                headerBorder
                sx={{minWidth: "600px" }}
            >
                <Formik
                    initialValues={{
                        whatsappNumber: user?.whatsappNumber??'',
                        enable: user?.enableWhatsapp
                    }}
                    validationSchema={Yup.object().shape({
                        whatsappNumber: Yup.string().test(
                            'is-phone',
                            'Whatsapp number is not a valid phone number',
                            function(value) {
                                const phoneRegex = /^\d{10}$/;
                                return phoneRegex.test(value);
                            }
                        )
                    })}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                        try {
                            
                            onOk({whatsappNumber: values.whatsappNumber??'', enableWhatsapp: values.enable});
                            setStatus({ success: true });
                            setSubmitting(false);
                          } catch (err) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                          }
                    }}
                >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
                    
                    <form noValidate onSubmit={handleSubmit}>
                    <Stack spacing={3} px={4}>

                        <Stack spacing={2}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="whatsappNumber">Whatsapp Number</InputLabel>
                                <OutlinedInput
                                    id="whatsappNumber"
                                    type="text"
                                    name="whatsappNumber"
                                    value={values.whatsappNumber}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(touched.whatsappNumber && errors.whatsappNumber)}
                                    placeholder={`Enter Whatsapp Number`}
                                    fullWidth
                                />
                                {touched.whatsappNumber && errors.whatsappNumber && (
                                    <FormHelperText error id="standard-weight-helper-text-whatsapp-number">
                                    {errors.whatsappNumber}
                                    </FormHelperText>
                                )}
                            </Stack>
                        </Stack>

                        <Stack direction={"row"} alignItems={"center"} spacing={2}>
                            <Typography variant="subtitle1" sx={{color: "#298"}}>Receive notifications</Typography>
                            <Switch
                                checked={values.enable}
                                onChange={(e) => {
                                    const { checked } = e.target;
                                    setFieldValue("enable", checked);
                                }}
                            />
                        </Stack>

                        <Stack display={"flex"} direction={"row"} spacing={2} justifyContent={"end"}>
                            <Button variant="text" size="medium" color="error" onClick={onCancel}>
                                Cancel
                            </Button>
                            <Button disabled={isSubmitting} type="submit" variant="contained" size="medium">
                                Save
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

export default ConnectWhatsappDialog;