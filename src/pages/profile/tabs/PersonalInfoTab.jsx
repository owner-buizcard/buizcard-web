import { Button, Divider, FormHelperText, Grid, InputLabel, OutlinedInput, Stack, Typography } from "@mui/material"
import MainCard from "../../../components/MainCard"
import { Formik } from "formik";
import * as Yup from 'yup';
import { useSelector } from "react-redux";
import { updateProfile } from "../../../network/service/userService";
import { useDispatch } from "react-redux";
import { updateAppUser } from "../../../store/reducers/app";

const PersonalInfoTab =()=>{

    const user = useSelector((state)=>state.app.user);
    const dispatch = useDispatch();

    return (
        <MainCard
            title={
                <Typography variant="subtitle1">Personal Information</Typography>
            }
            headerBorder
        >
            <Formik
                initialValues={{
                    firstName: user?.firstName,
                    lastName: user?.lastName,
                    companyName: user?.companyName,
                    companyWebsite: user?.companyWebsite,
                    designation: user?.designation,
                    addressLine1: user?.address?.addressLine1,
                    state: user?.address?.state,
                    country: user?.address?.country,
                    email: user?.email,
                    additionalEmail: user?.additionalEmail,
                    phoneNumber: user?.phoneNumber,
                    additionalPhoneNumber: user?.additionalPhoneNumber
                }}
                validationSchema={Yup.object().shape({
                    firstName: Yup.string().max(40).required('First name required'),
                    lastName: Yup.string().max(30).required('Last name required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {

                        const data = { firstName: values.firstName, lastName: values.lastName, companyName: values.companyName, companyWebsite: values.companyWebsite, designation: values.designation,
                                            address: { addressLine1: values.addressLine1, state: values.state, country: values.country },
                                            phoneNumber: values.phoneNumber, additionalEmail: values.additionalEmail, additionalPhoneNumber: values.additionalPhoneNumber}
                                            
                    
                        const updated = await updateProfile({...data, ...{picture: user.picture}});
                        dispatch(updateAppUser(updated));
            
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
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                <InputLabel htmlFor="first-name">First Name</InputLabel>
                                <OutlinedInput
                                    id="first-name"
                                    type="text"
                                    value={values.firstName}
                                    name="firstName"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder="Enter first name"
                                    fullWidth
                                    error={Boolean(touched.firstName && errors.firstName)}
                                />
                                {touched.firstName && errors.firstName && (
                                    <FormHelperText error id="standard-weight-helper-text-first-name">
                                    {errors.firstName}
                                    </FormHelperText>
                                )}
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                <InputLabel htmlFor="last-name">Last Name</InputLabel>
                                <OutlinedInput
                                    id="last-name"
                                    type="text"
                                    value={values.lastName}
                                    name="lastName"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder="Enter last name"
                                    fullWidth
                                    error={Boolean(touched.lastName && errors.lastName)}
                                />
                                {touched.lastName && errors.lastName && (
                                    <FormHelperText error id="standard-weight-helper-text-last-name">
                                    {errors.lastName}
                                    </FormHelperText>
                                )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="email">Primary Email Address</InputLabel>
                                    <OutlinedInput
                                        id="email"
                                        disabled={true}
                                        type="email"
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter email"
                                        fullWidth
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="phone-number">Phone Number</InputLabel>
                                    <OutlinedInput
                                        id="phone-number"
                                        type="tel"
                                        value={values.phoneNumber}
                                        name="phoneNumber"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter phone number"
                                        fullWidth
                                        error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                                    />
                                    {touched.phoneNumber && errors.phoneNumber && (
                                        <FormHelperText error id="standard-weight-helper-text-phone-number">
                                            {errors.phoneNumber}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="additional-email">Secondary Email Address</InputLabel>
                                    <OutlinedInput
                                        id="additional-email"
                                        type="email"
                                        value={values.additionalEmail}
                                        name="additionalEmail"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter additional email"
                                        fullWidth
                                        error={Boolean(touched.additionalEmail && errors.additionalEmail)}
                                    />
                                    {touched.additionalEmail && errors.additionalEmail && (
                                        <FormHelperText error id="standard-weight-helper-text-additional-email">
                                            {errors.additionalEmail}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="additional-phone-number">Secondary Phone Number</InputLabel>
                                    <OutlinedInput
                                        id="additional-phone-number"
                                        type="tel"
                                        value={values.additionalPhoneNumber}
                                        name="additionalPhoneNumber"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter additional phone number"
                                        fullWidth
                                        error={Boolean(touched.additionalPhoneNumber && errors.additionalPhoneNumber)}
                                    />
                                    {touched.additionalPhoneNumber && errors.additionalPhoneNumber && (
                                        <FormHelperText error id="standard-weight-helper-text-additional-phone-number">
                                            {errors.additionalPhoneNumber}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="h5" sx={{mb: 1}}>Business</Typography>
                                <Divider/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                <InputLabel htmlFor="company-name">Company Name</InputLabel>
                                <OutlinedInput
                                    id="company-name"
                                    type="text"
                                    value={values.companyName}
                                    name="companyName"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder="Enter company name"
                                    fullWidth
                                    error={Boolean(touched.designation && errors.designation)}
                                />
                                {touched.companyName && errors.companyName && (
                                    <FormHelperText error id="standard-weight-helper-text-company-name">
                                    {errors.companyName}
                                    </FormHelperText>
                                )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="company-website">Company Website</InputLabel>
                                    <OutlinedInput
                                        id="company-website"
                                        type="text"
                                        value={values.companyWebsite}
                                        name="companyWebsite"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter company website"
                                        fullWidth
                                        error={Boolean(touched.companyWebsite && errors.companyWebsite)}
                                    />
                                    {touched.companyWebsite && errors.companyWebsite && (
                                        <FormHelperText error id="standard-weight-helper-text-company-website">
                                            {errors.companyWebsite}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                <InputLabel htmlFor="designation">Designation</InputLabel>
                                <OutlinedInput
                                    id="designation"
                                    type="text"
                                    value={values.designation}
                                    name="designation"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder="Enter last name"
                                    fullWidth
                                    error={Boolean(touched.designation && errors.designation)}
                                />
                                {touched.designation && errors.designation && (
                                    <FormHelperText error id="standard-weight-helper-text-designation">
                                    {errors.designation}
                                    </FormHelperText>
                                )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h5" sx={{mb: 1}}>Address</Typography>
                                <Divider/>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="address-line-1">Address Line 1</InputLabel>
                                    <OutlinedInput
                                        id="address-line-1"
                                        type="text"
                                        value={values.addressLine1}
                                        name="addressLine1"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter address line 1"
                                        fullWidth
                                        error={Boolean(touched.addressLine1 && errors.addressLine1)}
                                    />
                                    {touched.addressLine1 && errors.addressLine1 && (
                                        <FormHelperText error id="standard-weight-helper-text-address-line-1">
                                            {errors.addressLine1}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="state">State</InputLabel>
                                    <OutlinedInput
                                        id="state"
                                        type="text"
                                        value={values.state}
                                        name="state"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter state"
                                        fullWidth
                                        error={Boolean(touched.state && errors.state)}
                                    />
                                    {touched.state && errors.state && (
                                        <FormHelperText error id="standard-weight-helper-text-state">
                                            {errors.state}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="country">Country</InputLabel>
                                    <OutlinedInput
                                        id="country"
                                        type="text"
                                        value={values.country}
                                        name="country"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter country"
                                        fullWidth
                                        error={Boolean(touched.country && errors.country)}
                                    />
                                    {touched.country && errors.country && (
                                        <FormHelperText error id="standard-weight-helper-text-country">
                                            {errors.country}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack direction={"row"} justifyContent={"end"} spacing={2}>
                                    <Button variant="outlined">
                                        Cancel
                                    </Button>
                                    <Button variant="contained" disabled={isSubmitting} type="submit">
                                        Save
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>

                    </form>
                )}
            </Formik>

        </MainCard>
    )
}

export default PersonalInfoTab;