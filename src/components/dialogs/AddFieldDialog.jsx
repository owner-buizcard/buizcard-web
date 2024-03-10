import { Button, Dialog, FormHelperText, InputLabel, OutlinedInput, Stack, Switch, Typography } from "@mui/material";
import MainCard from "../MainCard";
import { Formik } from "formik";
import * as Yup from 'yup';

const AddFieldDialog =({open, onCancel, onOk})=>{

    return ( 
        <Dialog 
            open={open}
            fullWidth
            maxWidth="xs"
        >
            <MainCard
                borderRadius={1}
                headerBorder
            >
                <Formik
                    initialValues={{
                        fieldName: null,
                        isRequired: false
                    }}
                    validationSchema={Yup.object().shape({
                        fieldName: Yup.string().required('Field name is required')
                    })}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                        try {
                            
                            onOk({label: values.fieldName, isRequired: values.isRequired});
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
                    <Stack spacing={1} px={{xs: 0, sm: 4}}>

                        <Stack spacing={2}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="fieldName">Add Field</InputLabel>
                                <OutlinedInput
                                    id="link"
                                    type="text"
                                    name="fieldName"
                                    value={values.link}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(touched.link && errors.link)}
                                    placeholder={`Enter field name`}
                                    fullWidth
                                />
                                {touched.fieldName && errors.fieldName && (
                                    <FormHelperText error id="standard-weight-helper-text-link">
                                    {errors.fieldName}
                                    </FormHelperText>
                                )}
                            </Stack>
                        </Stack>

                        <Stack direction={"row"} alignItems={"center"} spacing={2}>
                            <Typography variant="subtitle1" sx={{color: "#298"}}>Is Required</Typography>
                            <Switch
                                checked={values.isRequired}
                                onChange={(e) => {
                                    const { checked } = e.target;
                                    setFieldValue("isRequired", checked);
                                }}
                            />
                        </Stack>

                        <Stack display={"flex"} direction={"row"} spacing={2} justifyContent={"end"}>
                            <Button variant="text" size="medium" color="error" onClick={onCancel}>
                                Cancel
                            </Button>
                            <Button disabled={isSubmitting} type="submit" variant="contained" size="medium">
                                Create
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

export default AddFieldDialog;