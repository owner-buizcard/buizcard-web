import { Button, Dialog, FormHelperText, InputLabel, OutlinedInput, Stack, Switch, Typography } from "@mui/material";
import MainCard from "../MainCard";
import { Formik } from "formik";
import * as Yup from 'yup';

const CreateCardDialog =({open, onCancel, onOk})=>{

    return ( 
        <Dialog 
            open={open}
            fullWidth
            maxWidth="xs"
        >
            <MainCard
                title={
                    <Typography variant="h5">{`Create Card`}</Typography>
                }
                borderRadius={1}
                headerBorder
            >
                <Formik
                    initialValues={{
                        cardName: null,
                        isPublic: false
                    }}
                    validationSchema={Yup.object().shape({
                        cardName: Yup.string().required('Card name is required')
                    })}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                        try {
                            
                            onOk({cardName: values.cardName, isPublic: values.isPublic});
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
                    <Stack spacing={3} px={{xs: 0, sm: 4}}>

                        <Stack spacing={2}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="cardName">Card name</InputLabel>
                                <OutlinedInput
                                    id="link"
                                    type="text"
                                    name="cardName"
                                    value={values.link}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(touched.link && errors.link)}
                                    placeholder={`Enter card name`}
                                    fullWidth
                                />
                                {touched.cardName && errors.cardName && (
                                    <FormHelperText error id="standard-weight-helper-text-link">
                                    {errors.cardName}
                                    </FormHelperText>
                                )}
                            </Stack>
                        </Stack>

                        <Stack direction={"row"} alignItems={"center"} spacing={2}>
                            <Typography variant="subtitle1" sx={{color: "#298"}}>Make public</Typography>
                            <Switch
                                checked={values.isPublic}
                                onChange={(e) => {
                                    const { checked } = e.target;
                                    setFieldValue("isPublic", checked);
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

export default CreateCardDialog;