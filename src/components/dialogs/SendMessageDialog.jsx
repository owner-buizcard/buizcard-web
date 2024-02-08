import { Box, Button, Chip, Dialog, FormHelperText, InputLabel, OutlinedInput, Stack, Typography } from "@mui/material";
import MainCard from "../MainCard";
import { Formik } from "formik";
import * as Yup from 'yup';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { closeMail } from "../../store/reducers/app";
import { sendMessage } from "../../network/service/supportService";

const SendMessageDialog =()=>{

    const user = useSelector((state)=>state.app.user);
    const openMail = useSelector((state)=>state.app.openMail);
    const type = useSelector((state)=>state.app.mailType);
    const title = useSelector((state)=>state.app.mailTitle);

    const dispatch = useDispatch();

    return ( 
        <Dialog open={openMail}>
            <MainCard
                title={
                    <Typography variant="h5">{title}</Typography>
                }
                borderRadius={1}
                headerBorder
                sx={{minWidth: "600px" }}
            >
                <Formik
                    initialValues={{
                      message: null
                    }}
                    validationSchema={Yup.object().shape({
                        message: Yup.string().required('Message is required')
                    })}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                        try {
                            
                            await sendMessage(user.id, values.message, type);
                            setStatus({ success: true });
                            setSubmitting(false);

                            dispatch(closeMail());
                          } catch (err) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                          }
                    }}
                >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    
                    <form noValidate onSubmit={handleSubmit}>
                    <Stack spacing={2} px={4}>

                        <Stack spacing={2}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="subject">We will respond you with this email</InputLabel>
                                <Stack direction={"row"}>
                                    <Chip label={user.email}/>
                                </Stack>
                            </Stack>
                        </Stack>

                        <Stack spacing={2}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="message">Message</InputLabel>
                                <OutlinedInput
                                    id="message"
                                    type="text"
                                    name="message"
                                    multiline
                                    minRows={8}
                                    value={values.message}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(touched.message && errors.message)}
                                    placeholder={`Enter message`}
                                    fullWidth
                                />
                                {touched.message && errors.message && (
                                    <FormHelperText error id="standard-weight-helper-text-message">
                                    {errors.message}
                                    </FormHelperText>
                                )}
                            </Stack>
                        </Stack>

                        <Box sx={{height: 10}}/>

                        <Stack display={"flex"} direction={"row"} spacing={2} justifyContent={"end"}>
                            <Button disabled={isSubmitting} variant="text" size="medium" color="error" onClick={()=>dispatch(closeMail())}>
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

export default SendMessageDialog;