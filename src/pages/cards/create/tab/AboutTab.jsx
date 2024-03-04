import { Box, Button, Grid, InputLabel, OutlinedInput, Stack, Typography } from "@mui/material";
import MainCard from "../../../../components/MainCard";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateCardData } from "../../../../store/reducers/card-builder";
import ImagePicker from "../../../../components/ImagePicker";
import { ClockCircleOutlined, CloseCircleFilled, CloseCircleOutlined, UserOutlined } from "@ant-design/icons";
import { uploadCardImage } from "../../../../network/service/cardService";
import { themeColors } from "../../../../theme/colors";
import ImageButton from "../../../../components/ImageButton";
import { useState } from "react";


const AboutTab =()=>{

    const dispatch = useDispatch();
    const cardData = useSelector((state) => state.cardBuilder.cardData);

    const [bagdeUploading, setBadgeUploading] = useState(false);

    const handleChange=(field, event)=>{
        dispatch(updateCardData({path: field, value: event.target.value}));
    }

    const handleImageChange=(image)=>{
        dispatch(updateCardData({path: "picture", value: image}));
    }   

    const uploadPicture = async(blob)=>{
        return await uploadCardImage({cardId: cardData._id, key: 'picture', file: blob, fileName: 'picture.jpeg' });
    }

    const uploadBadge = async(blob)=>{
        var badges = cardData?.badges??[];
        setBadgeUploading(true);
        const uploaded = await uploadCardImage({cardId: cardData._id, key: `badge-${badges.length}`, file: blob, fileName: `bagde-${badges.length}.jpeg` });
        setBadgeUploading(false);
        badges = [...badges, uploaded]
        dispatch(updateCardData({path: "badges", value: badges}));
    }

    const removeBadge = async(idx)=>{
        var badges = cardData?.badges??[];
        badges = badges.filter((_, index) => index !== idx);
        dispatch(updateCardData({path: "badges", value: badges}));
    }

    const handleValueChange=(field, val)=>{
        dispatch(updateCardData({path: field, value: val}));
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
                                tag={'picture'}
                                icon={<UserOutlined style={{fontSize: "36px"}}/>}
                                value={cardData?.picture}
                                onChange={handleImageChange}
                                onUpload={uploadPicture}
                            />
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
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="address">Address</InputLabel>
                            <OutlinedInput
                                id="address"
                                type="text"
                                name="address"
                                placeholder="Enter address"
                                value={cardData?.address?.addressLine1??""}
                                onChange={(event)=>handleChange("address.addressLine1", event)}
                                fullWidth
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="city">City</InputLabel>
                            <OutlinedInput
                                id="city"
                                type="text"
                                name="city"
                                placeholder="Enter city"
                                value={cardData?.address?.city??""}
                                onChange={(event)=>handleChange("address.city", event)}
                                fullWidth
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="state">State</InputLabel>
                            <OutlinedInput
                                id="state"
                                type="text"
                                name="state"
                                placeholder="Enter state"
                                value={cardData?.address?.state??""}
                                onChange={(event)=>handleChange("address.state", event)}
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
                                value={cardData?.address?.country??""}
                                onChange={(event)=>handleChange("address.country", event)}
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
                                value={cardData?.address?.pincode??""}
                                onChange={(event)=>handleChange("address.pincode", event)}
                                fullWidth
                            />
                        </Stack>
                    </Grid>
                </Grid>

            </MainCard>

            <MainCard 
                borderRadius={1}
                headerBorder
                title={<>
                    <Stack justifyContent={"space-between"} direction={"row"} alignItems={"center"}>
                        <Stack>
                            <Typography variant="subtitle1">Badges</Typography>
                            <Typography variant="body2">You can upload maximum 8 badges</Typography>
                        </Stack>
                        <ImageButton tag={'bagde-upload'} onUpload={uploadBadge} disabled={bagdeUploading || cardData.badges?.length>7}/>
                    </Stack>
                </>}
                
            >
                <Grid container spacing={3}>
                    {
                        cardData?.badges?.map((badge, idx)=>{
                            return (
                                <Grid item xs={3} key={`badge-wrapper-${idx}`}>
                                    <div style={{position: "relative"}}>
                                        <CloseCircleFilled 
                                            onClick={()=>removeBadge(idx)}
                                            style={{position: "absolute", right: -20, top: -4, fontSize: "24px", background: "#fff", borderRadius: "50px", padding: "2px", cursor: "pointer"}}/>
                                        <Box
                                            component={"img"}
                                            src={badge}
                                            width={"100%"}
                                            height={"100%"}
                                            sx={{m: 1}}
                                        />
                                    </div>
                                </Grid>
                            )   
                        })  
                    }
                </Grid>
            </MainCard>

            <MainCard 
                borderRadius={1}
                headerBorder
                title={"Theme"}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="last-name">Profile Theme</InputLabel>
                            <MainCard>
                                <Stack spacing={{ xs: 1 }} direction="row" useFlexGap flexWrap="wrap">
                                    {
                                        themeColors.map((color)=>{
                                            return <Box
                                                sx={{
                                                    p: '2px',
                                                    border: `2px solid ${ cardData?.theme==color ? color: 'white' }`,
                                                    borderRadius: 16,
                                                }}
                                            ><Box 
                                                key={color} 
                                                onClick={()=>handleValueChange("theme", color)}
                                                sx={{background: color, width: 24, height: 24, borderRadius: 16}}/>
                                            </Box>
                                        })
                                    }
                                </Stack>
                            </MainCard>
                        </Stack>
                    </Grid>
                    
                </Grid>
            </MainCard>
       </Stack>
    )
}

export default AboutTab;