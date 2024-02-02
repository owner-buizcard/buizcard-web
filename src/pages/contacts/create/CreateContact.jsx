import { Box, Button, FormHelperText, Grid, IconButton, InputLabel, OutlinedInput, Stack, Typography } from "@mui/material";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import MainCard from "../../../components/MainCard";
import { Formik } from "formik";
import * as Yup from 'yup';
import { useState } from "react";
import { uploadCardImage } from "../../../network/service/cardService";
import ImagePicker from "../../../components/ImagePicker";
import { UserOutlined } from "@ant-design/icons";
import { values } from "lodash";
import { saveContactDetails, updateContactDetails } from "../../../network/service/contactService";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader, updateContacts } from "../../../store/reducers/app";

const CreateContact =()=>{

  const navigate = useNavigate();
  const contacts = useSelector((state)=>state.app.contacts)??[];
  const dispatch = useDispatch();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const contactId = queryParams.get('contactId');
  var details = null;
  if(contactId){
    details = contacts.find((item)=>item._id===contactId)?.details
  }

  const handleBack =()=>{
    navigate(-1);
  }

  const [image, setImage] = useState(details?.picture);

  const handleImageChange=(image)=>{
    setImage(image);
  }   

  const uploadPicture = async(blob)=>{
      return await uploadCardImage({cardId: 'contact', key: 'picture', file: blob, fileName: 'contact.jpeg' });
  }

  return (
    <>
      <Formik
        initialValues={{
          fname: (details?.name ? details.name.split(' ')[0] : '') || '',
          lname: (details?.name ? details.name.split(' ')[1] : '') || '',
          email: details?.email??'',
          phone: details?.phone??'',
          title: details?.title??'',
          location: details?.location??'',
          company: details?.company??'',
          website: details?.website??''
        }}
        validationSchema={Yup.object().shape({
          fname: Yup.string().max(255).required("First name is required"),
          lname: Yup.string().max(255).required("Last name is required"),
          phone: Yup.string()
            .matches(
              /^(?:[0-9] ?){6,14}[0-9]$/,
              "Invalid phone number"
            ),
          email: Yup.string().email("Must be a valid email").max(255),
          location: Yup.string().max(255),
          company: Yup.string().max(255)
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm})=>{
          try {
            dispatch(showLoader());

            const data = {
              name: `${values.fname} ${values.lname}`,
              email: values.email,
              phone: values.phone,
              title: values.title,
              picture: image,
              company: values.company,
              website: values.website,
              location: values.location
            };

            if(details==null){
              const contactData = await saveContactDetails(data)
              const updated = [...contacts, contactData];
              dispatch(updateContacts(updated))
            }else{
              const contactData = await updateContactDetails(contactId, {details: data})
              const updated = contacts.map(item => {
                  if (item._id === contactData._id) {
                    return { ...item, ...contactData }; 
                  }
                  return item;
              });
              dispatch(updateContacts(updated))
            }

            dispatch(hideLoader());
            setStatus({ success: true });
            setSubmitting(false);
            if(details==null){
              resetForm();
            }
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({errors, handleBlur, handleChange, handleSubmit, touched, values})=>(
          <form noValidate onSubmit={handleSubmit}>
            <Grid container rowSpacing={1.5} columnSpacing={2.75}>
              <Grid item xs={12} justifyContent={"space-between"} display={"flex"} alignItems={"center"}> 
                  <Stack direction={"row"} alignItems={"center"}>
                      <IconButton
                          disableRipple
                          aria-label="go back"
                          onClick={handleBack}    
                          edge="start"
                          color="secondary"   
                      >
                          <FaArrowLeft/>
                      </IconButton>
                      <Box width={8}/>
                      <Typography variant="h4"> { details ? 'Edit Contact' : 'Create Contact'}</Typography>
                  </Stack>
                  <div>
                      <Button type="submit" variant="contained" sx={{px: 4}}>
                          Save
                      </Button>
                  </div>
              </Grid>
              <Grid item xs={12}>
                <MainCard>
                  <Grid container spacing={3} sx={{py: 4}}>
                    <Grid item xs={3}>
                      <Stack spacing={2} alignItems={"center"} justifyContent={"center"} display={"flex"}>
                          <InputLabel>Profile Picture</InputLabel>
                          <ImagePicker
                              tag={'picture'}
                              icon={<UserOutlined style={{fontSize: "36px"}}/>}
                              value={image}
                              onChange={handleImageChange}
                              onUpload={uploadPicture}
                          />
                      </Stack>
                    </Grid>
                    <Grid item xs={9}>
                      <Grid container spacing={3}>
                        <Grid item xs={6}>
                          <Stack spacing={1}>
                              <InputLabel htmlFor="fname">First Name</InputLabel>
                              <OutlinedInput
                                  id="firstName"
                                  type="text"
                                  name="fname"
                                  placeholder="Enter first name"
                                  value={values.fname}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  fullWidth
                              />
                              {touched.fname && errors.fname && (
                                <FormHelperText error id={`standard-weight-helper-first-name`}>
                                  {errors.fname}
                                </FormHelperText>
                              )}
                          </Stack>
                        </Grid>
                        <Grid item xs={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="lname">Last Name</InputLabel>
                            <OutlinedInput
                              id="lastName"
                              type="text"
                              name="lname"
                              placeholder="Enter last name"
                              value={values.lname}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              fullWidth
                            />
                            {touched.lname && errors.lname && (
                              <FormHelperText error id={`standard-weight-helper-last-name`}>
                                {errors.lname}
                              </FormHelperText>
                            )}
                          </Stack>
                        </Grid>
                        <Grid item xs={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <OutlinedInput
                              id="email"
                              type="email"
                              name="email"
                              placeholder="Enter email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              fullWidth
                            />
                            {touched.email && errors.email && (
                              <FormHelperText error id={`standard-weight-helper-email`}>
                                {errors.email}
                              </FormHelperText>
                            )}
                          </Stack>
                        </Grid>
                        <Grid item xs={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="phone">Phone</InputLabel>
                            <OutlinedInput
                              id="phone"
                              type="tel"
                              name="phone"
                              placeholder="Enter phone number"
                              value={values.phone}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              fullWidth
                            />
                            {touched.phone && errors.phone && (
                              <FormHelperText error id={`standard-weight-helper-phone`}>
                                {errors.phone}
                              </FormHelperText>
                            )}
                          </Stack>
                        </Grid>
                        <Grid item xs={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="company">Company</InputLabel>
                            <OutlinedInput
                              id="company"
                              type="text"
                              name="company"
                              placeholder="Enter company name"
                              value={values.company}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              fullWidth
                            />
                            {touched.company && errors.company && (
                              <FormHelperText error id={`standard-weight-helper-company`}>
                                {errors.company}
                              </FormHelperText>
                            )}
                          </Stack>
                        </Grid>
                        <Grid item xs={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="website">Website</InputLabel>
                            <OutlinedInput
                              id="website"
                              type="url"
                              name="website"
                              placeholder="Enter website URL"
                              value={values.website}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              fullWidth
                            />
                            {touched.website && errors.website && (
                              <FormHelperText error id={`standard-weight-helper-website`}>
                                {errors.website}
                              </FormHelperText>
                            )}
                          </Stack>
                        </Grid>
                        <Grid item xs={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="title">Title</InputLabel>
                            <OutlinedInput
                              id="title"
                              type="text"
                              name="title"
                              placeholder="Enter job title"
                              value={values.title}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              fullWidth
                            />
                            {touched.title && errors.title && (
                              <FormHelperText error id={`standard-weight-helper-title`}>
                                {errors.title}
                              </FormHelperText>
                            )}
                          </Stack>
                        </Grid>
                        <Grid item xs={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="location">Location</InputLabel>
                            <OutlinedInput
                              id="location"
                              type="text"
                              name="location"
                              placeholder="Enter location"
                              value={values.location}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              fullWidth
                            />
                            {touched.location && errors.location && (
                              <FormHelperText error id={`standard-weight-helper-location`}>
                                {errors.location}
                              </FormHelperText>
                            )}
                          </Stack>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </MainCard>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  )
}

export default CreateContact;