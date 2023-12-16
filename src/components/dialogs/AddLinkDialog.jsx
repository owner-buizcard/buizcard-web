import { Avatar, Button, Dialog, FormHelperText, InputLabel, OutlinedInput, Stack, Switch, Typography } from "@mui/material";
import MainCard from "../MainCard";
import { Formik } from "formik";
import * as Yup from 'yup';

const AddLinkDialog =({open, handleCancel, item, onAddItem})=>{

    return ( 
        <Dialog open={open}>
            <MainCard
                
                title={
                    <Typography variant="h5">{`Add ${item?.label}`}</Typography>
                }
                borderRadius={1}
                headerBorder
                sx={{minWidth: "600px" }}
            >
                <Formik
                    initialValues={{
                        link: item?.link,
                        title: item?.title,
                        description: item?.description,
                        highlight: item?.highlight || false
                    }}
                    validationSchema={Yup.object().shape({
                        link: Yup.string().required('Link is required'),
                        title: Yup.string().max(120).required('Link title is required')
                    })}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {

                        try {
                          onAddItem({
                            link: values.link,
                            title: values.title,
                            description: values.description,
                            highlight: values.highlight,
                            icon: item.icon
                          });
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

                        <Avatar src={`https://firebasestorage.googleapis.com/v0/b/bizcard-web.appspot.com/o/${item?.icon}`}/>
                        <Stack spacing={2}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="link">{item?.label} Link</InputLabel>
                                <OutlinedInput
                                    id="link"
                                    type="text"
                                    name="link"
                                    value={values.link}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(touched.link && errors.link)}
                                    placeholder={`Enter ${item?.label} Link`}
                                    fullWidth
                                />
                                {touched.link && errors.link && (
                                    <FormHelperText error id="standard-weight-helper-text-link">
                                    {errors.link}
                                    </FormHelperText>
                                )}
                            </Stack>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="link-title">Link Title</InputLabel>
                                <OutlinedInput
                                    id="link-title"
                                    type="text"
                                    name="title"
                                    value={values.title}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(touched.title && errors.title)}
                                    placeholder="Enter link title"
                                    fullWidth
                                />
                                {touched.title && errors.title && (
                                    <FormHelperText error id="standard-weight-helper-title">
                                    {errors.title}
                                    </FormHelperText>
                                )}
                            </Stack>
                            { values.highlight && <Stack spacing={1}>
                                <InputLabel htmlFor="link-description">Link Description</InputLabel>
                                <OutlinedInput
                                    id="link-description"
                                    type="text"
                                    name="description"
                                    value={values.description}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(touched.description && errors.description)}
                                    placeholder="Enter link description"
                                    fullWidth
                                />
                                {touched.description && errors.description && (
                                    <FormHelperText error id="standard-weight-helper-text-description">
                                    {errors.description}
                                    </FormHelperText>
                                )}
                            </Stack> }
                        </Stack>

                        <Stack direction={"row"} alignItems={"center"} spacing={2}>
                            <Typography variant="subtitle1" sx={{color: "#298"}}>Highlight</Typography>
                            <Switch
                                checked={values.highlight}
                                onChange={(e) => {
                                    const { checked } = e.target;
                                    setFieldValue("highlight", checked);
                                }}
                            />
                        </Stack>

                        <Stack display={"flex"} direction={"row"} spacing={2} justifyContent={"end"}>
                            <Button variant="text" size="medium" color="error" onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button disabled={isSubmitting} type="submit" variant="contained" size="medium">
                                Add
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

export default AddLinkDialog;