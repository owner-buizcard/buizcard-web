import { Avatar, Box, Grid, InputLabel, OutlinedInput, Stack, Typography } from "@mui/material";
import MainCard from "../../../../components/MainCard";
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateCardData } from "../../../../store/reducers/card-builder";
import ImagePicker from "../../../../components/ImagePicker";

const AboutTab =()=>{

    const dispatch = useDispatch();
    const cardData = useSelector((state) => state.cardBuilder.cardData);

    const handleChange=(field, event)=>{
        dispatch(updateCardData({path: field, value: event.target.value}));
    }

    const handleImageChange=(image)=>{
        dispatch(updateCardData({path: "picture", value: image}));
    }   

    const removeImage=()=>{
        dispatch(updateCardData({path: "picture", value: null}));
    }

    return ( 
       <Stack spacing={2} my={3}>
            <MainCard 
                borderRadius={1}
                headerBorder
                title={"Personal Information"}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Stack spacing={2} alignItems={"center"} justifyContent={"center"} display={"flex"}>
                            <InputLabel>Profile Picture</InputLabel>
                            <ImagePicker 
                                id={'picture'}
                                value={cardData?.picture}
                                onChange={handleImageChange}
                                onRemove={removeImage} 
                                height={120} 
                                width={120}
                            >
                                <Stack spacing={1} sx={{height: 120, width: 120, alignItems: "center", justifyContent: "center", display: "flex", backgroundColor: "#f5f5f5", border: "1px dashed #b0b0b0", borderRadius: "3px", flexDirection: "column", cursor: "pointer" }}>
                                    <FaUserCircle  fontSize={"46px"} style={{color: "#aaa"}}/>
                                    <Typography variant="caption" sx={{ color: "grey" }}>Upload</Typography>
                                </Stack>
                            </ImagePicker>
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="first-name">First Name</InputLabel>
                            <OutlinedInput
                                id="first-name"
                                type="text"
                                name="First Name"
                                placeholder="Enter first name"
                                value={cardData?.name?.firstName??""}
                                onChange={(event)=>handleChange("name.firstName", event)}
                                fullWidth
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="last-name">Last Name</InputLabel>
                            <OutlinedInput
                                id="last-name"
                                type="text"
                                name="Last Name"
                                placeholder="Enter last name"
                                value={cardData?.name?.lastName??""}
                                onChange={(event)=>handleChange("name.lastName", event)}
                                fullWidth
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="middle-name">Middle Name</InputLabel>
                            <OutlinedInput
                                id="middle-name"
                                type="text"
                                name="Middle Name"
                                placeholder="Enter middle name"
                                value={cardData?.name?.middleName??""}
                                onChange={(event)=>handleChange("name.middleName", event)}
                                fullWidth
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="prefix">Prefix</InputLabel>
                            <OutlinedInput
                                id="prefix"
                                type="text"
                                name="Prefix"
                                placeholder="Enter prefix"
                                value={cardData?.name?.prefix??""}
                                onChange={(event)=>handleChange("name.prefix", event)}
                                fullWidth
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="bio">Bio</InputLabel>
                            <OutlinedInput
                                id="bio"
                                type="text"
                                name="Bio"
                                placeholder="Enter bio"
                                value={cardData?.bio??""}
                                onChange={(event)=>handleChange("bio", event)}
                                fullWidth
                                multiline
                                rows={3}
                            />
                        </Stack>
                    </Grid>
                </Grid>

            </MainCard>
            <MainCard 
                borderRadius={1}
                headerBorder
                title={"Contact Information"}
            >
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="email-address">Email Address</InputLabel>
                            <OutlinedInput
                                id="email-address"
                                type="email"
                                name="email"
                                placeholder="Enter email address"
                                value={cardData?.email??""}
                                onChange={(event)=>handleChange("email", event)}
                                fullWidth
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="phone-number">Phone Number</InputLabel>
                            <OutlinedInput
                                id="phone-number"
                                type="tel"
                                name="phone"
                                placeholder="Enter phone number"
                                value={cardData?.phoneNumber??""}
                                onChange={(event)=>handleChange("phoneNumber", event)}
                                fullWidth
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="country">Country</InputLabel>
                            <OutlinedInput
                                id="country"
                                type="text"
                                name="country"
                                placeholder="Enter country"
                                value={cardData?.country??""}
                                onChange={(event)=>handleChange("country", event)}
                                fullWidth
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="pincode">Pincode</InputLabel>
                            <OutlinedInput
                                id="pincode"
                                type="text"
                                name="pincode"
                                placeholder="Enter pincode"
                                value={cardData?.pincode??""}
                                onChange={(event)=>handleChange("pincode", event)}
                                fullWidth
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="address">Address</InputLabel>
                            <OutlinedInput
                                id="address"
                                type="text"
                                name="address"
                                placeholder="Enter address"
                                value={cardData?.address??""}
                                onChange={(event)=>handleChange("address", event)}
                                fullWidth
                            />
                        </Stack>
                    </Grid>
                </Grid>

            </MainCard>
       </Stack>
    )
}

export default AboutTab;