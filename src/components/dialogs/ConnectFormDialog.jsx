import { Avatar, Badge, Box, Button, Dialog, FormHelperText, Grid, IconButton, InputLabel, List, ListItem, ListItemText, OutlinedInput, Radio, Stack, Typography } from "@mui/material";
import MainCard from "../MainCard";
import { formCardLink } from "../../utils/utils";
import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux";
import { HiCheckBadge } from "react-icons/hi2";
import { useState } from "react";
import AnimateButton from "../@extended/AnimateButton";
import { connectRequest, connectWithForm } from "../../network/service/connectService";
import { Formik } from "formik";
import * as Yup from 'yup';

const ConnectFormDialog =({open, handleCancel, cardData})=>{

    return (
        <Dialog 
            open={open} 
            onClose={handleCancel} 
            fullWidth 
            sx={{
                "& .MuiDialog-container": {
                "& .MuiPaper-root": {
                    width: "100%",
                    maxWidth: "440px",
                },
                },
            }}
        >
            <MainCard
                title={
                    <Typography variant="h5">Share Your Message</Typography>
                }
                borderRadius={1}
                headerBorder
            >
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        phone: '',
                        message: ''
                    }}
                    validationSchema={Yup.object().shape({
                        name: Yup.string().required('Name is required'),
                    })}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                        try {
                            console.log(values);
                            const data = await connectWithForm({name: values.name, email: values.email, phone: values.phone, message: values.message, userId: cardData.createdBy});
                            console.log(data);
                            setStatus({ success: true });
                            setSubmitting(false);
                            handleCancel();
                
                          } catch (err) {
                            console.log(err);
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                          }
                    }}
                >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    
                    <form noValidate onSubmit={handleSubmit}>
                    <Stack spacing={3} px={4}>

                        <Stack spacing={2}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="name">Full name</InputLabel>
                                <OutlinedInput
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={values.name}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(touched.name && errors.name)}
                                    placeholder={`Enter your name`}
                                    fullWidth
                                />
                                {touched.name && errors.name && (
                                    <FormHelperText error id="standard-weight-helper-text-link">
                                    {errors.name}
                                    </FormHelperText>
                                )}
                            </Stack>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="email">Email address</InputLabel>
                                <OutlinedInput
                                    id="email"
                                    type="text"
                                    name="email"
                                    value={values.email}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(touched.email && errors.email)}
                                    placeholder={`Enter email address`}
                                    fullWidth
                                />
                            </Stack>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="phone">Phone number</InputLabel>
                                <OutlinedInput
                                    id="phone"
                                    type="text"
                                    name="phone"
                                    value={values.phone}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(touched.phone && errors.phone)}
                                    placeholder={`Enter phone number`}
                                    fullWidth
                                />
                            </Stack>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="message">Message</InputLabel>
                                <OutlinedInput
                                    id="message"
                                    type="text"
                                    name="message"
                                    value={values.message}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(touched.message && errors.message)}
                                    placeholder={`Enter your message`}
                                    fullWidth
                                />
                            </Stack>
                        </Stack>

                        <Stack display={"flex"} direction={"row"} spacing={2} justifyContent={"end"}>
                            <Button variant="text" size="medium" color="error" onClick={handleCancel}>
                                Skip
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

export default ConnectFormDialog;