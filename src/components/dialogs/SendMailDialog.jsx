import { Box, Button, Chip, Dialog, FormHelperText, InputLabel, OutlinedInput, Stack, Switch, Typography } from "@mui/material";
import MainCard from "../MainCard";
import { Formik } from "formik";
import * as Yup from 'yup';
import { showSnackbar } from "../../utils/snackbar-utils";
import { sendMailToContacts } from "../../network/service/contactService";

const SendMailDialog =({open, onClose, selectedMails})=>{

    return ( 
        <Dialog open={open}>
            <MainCard
                title={
                    <Typography variant="h5">{`Send Mail`}</Typography>
                }
                borderRadius={1}
                headerBorder
                sx={{minWidth: "600px" }}
            >
                <Formik
                    initialValues={{
                      subject: null,
                      body: null
                    }}
                    validationSchema={Yup.object().shape({
                        subject: Yup.string().required('Subject is required'),
                        body: Yup.string().required('Body is required')
                    })}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                        try {
                            
                            onClose();
                            showSnackbar("Sending email to contact...", { variant: 'success' });
                            const data = {
                              emails: selectedMails,
                              subject: values.subject,
                              content: values.body
                            }
                            await sendMailToContacts(data);
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
                    <Stack spacing={2} px={4}>

                        <Stack spacing={2}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="subject">To Email</InputLabel>
                                <Stack direction={"row"}>
                                  {
                                    selectedMails.map((email)=>{
                                      return <Chip key={email} label={email}/>
                                    })
                                  }
                                </Stack>
                            </Stack>
                        </Stack>

                        <Stack spacing={2}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="subject">Subject</InputLabel>
                                <OutlinedInput
                                    id="subject"
                                    type="text"
                                    name="subject"
                                    value={values.subject}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(touched.subject && errors.subject)}
                                    placeholder={`Enter subject`}
                                    fullWidth
                                />
                                {touched.subject && errors.subject && (
                                    <FormHelperText error id="standard-weight-helper-text-subject">
                                    {errors.subject}
                                    </FormHelperText>
                                )}
                            </Stack>
                        </Stack>

                        <Stack spacing={2}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="body">Body</InputLabel>
                                <OutlinedInput
                                    id="body"
                                    type="text"
                                    name="body"
                                    multiline
                                    minRows={8}
                                    value={values.body}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(touched.body && errors.body)}
                                    placeholder={`Enter content`}
                                    fullWidth
                                />
                                {touched.body && errors.body && (
                                    <FormHelperText error id="standard-weight-helper-text-body">
                                    {errors.body}
                                    </FormHelperText>
                                )}
                            </Stack>
                        </Stack>

                        <Box sx={{height: 10}}/>

                        <Stack display={"flex"} direction={"row"} spacing={2} justifyContent={"end"}>
                            <Button variant="text" size="medium" color="error" onClick={onClose}>
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

export default SendMailDialog;