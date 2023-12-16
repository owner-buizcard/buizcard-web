import { Grid, InputLabel, OutlinedInput, Stack, Typography } from "@mui/material";
import MainCard from "../../../../components/MainCard";
import { FaAd, FaImage } from 'react-icons/fa';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateCardData } from "../../../../store/reducers/card-builder";
import ImagePicker from "../../../../components/ImagePicker";

const BusinessTab =()=>{

    const dispatch = useDispatch();
    const cardData = useSelector((state) => state.cardBuilder.cardData);

    const handleChange=(field, event)=>{
        dispatch(updateCardData({path: field, value: event.target.value}));
    }

    const handleLogoChange=(image)=>{
        console.log('logo');
        dispatch(updateCardData({path: "logo", value: image}));
    }   

    const handleBannerChange=(image)=>{
        console.log('banner');
        dispatch(updateCardData({path: "banner", value: image}));
    }   

    const removeLogo=()=>{
        dispatch(updateCardData({path: "logo", value: null}));
    }

    const removeBanner=()=>{
        dispatch(updateCardData({path: "banner", value: null}));
    }

    return ( 
       <Stack spacing={2} my={3}>
            <MainCard 
                borderRadius={1}
                headerBorder
                title={"Business Information"}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12} >
                        <Stack direction={"row"} spacing={4} alignItems={"center"} justifyContent={"center"} display={"flex"}>


                            <Stack spacing={2} alignItems={"center"} justifyContent={"center"} display={"flex"}>
                                <InputLabel>Company Logo</InputLabel>
                                <ImagePicker 
                                    id={'logo'}
                                    value={cardData?.logo}
                                    onChange={handleLogoChange}
                                    onRemove={removeLogo} 
                                    height={120} 
                                    width={120}
                                >
                                    <Stack spacing={1} sx={{height: 120, width: 120, alignItems: "center", justifyContent: "center", display: "flex", backgroundColor: "#f5f5f5", border: "1px dashed #b0b0b0", borderRadius: "3px", flexDirection: "column", cursor: "pointer" }}>
                                        <FaImage  fontSize={"46px"} style={{color: "#aaa"}}/>
                                        <Typography variant="caption" sx={{ color: "grey" }}>Upload</Typography>
                                    </Stack>
                                </ImagePicker>
                            </Stack>

                            <Stack spacing={2} alignItems={"center"} justifyContent={"center"} display={"flex"}>
                                <InputLabel>Banner</InputLabel>
                                <ImagePicker 
                                    id={'banner'}
                                    value={cardData?.banner}
                                    onChange={handleBannerChange}
                                    onRemove={removeBanner} 
                                    height={120} 
                                    width={280}
                                >
                                    <Stack spacing={1} sx={{ height: 120, width: 280, alignItems: "center", justifyContent: "center", display: "flex", backgroundColor: "#f5f5f5", border: "1px dashed #b0b0b0", borderRadius: "3px", flexDirection: "column", cursor: "pointer" }}>
                                        <FaAd  fontSize={"46px"} style={{color: "#aaa"}}/>
                                        <Typography variant="caption" sx={{ color: "grey" }}>Upload</Typography>
                                    </Stack>
                                </ImagePicker>
                            </Stack>

                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="job-title">Job Title</InputLabel>
                            <OutlinedInput
                                id="job-title"
                                type="text"
                                name="Job Title"
                                placeholder="Enter job title"
                                value={cardData?.company?.title??""}
                                onChange={(event)=>handleChange("company.title", event)}
                                fullWidth
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="company-name">Company Name</InputLabel>
                            <OutlinedInput
                                id="company-name"
                                type="text"
                                name="Company Name"
                                placeholder="Enter company name"
                                value={cardData?.company?.companyName??""}
                                onChange={(event)=>handleChange("company.companyName", event)}
                                fullWidth
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="department">Department</InputLabel>
                            <OutlinedInput
                                id="department"
                                type="text"
                                name="Department"
                                placeholder="Enter department"
                                value={cardData?.company?.department??""}
                                onChange={(event)=>handleChange("company.department", event)}
                                fullWidth
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="company-website">Company Website</InputLabel>
                            <OutlinedInput
                                id="company-website"
                                type="text"
                                name="Company Website"
                                placeholder="Enter company website"
                                value={cardData?.company?.companyWebsite??""}
                                onChange={(event)=>handleChange("company.companyWebsite", event)}
                                fullWidth
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="about-company">About Company</InputLabel>
                            <OutlinedInput
                                id="about-company"
                                type="text"
                                name="About Company"
                                placeholder="Enter company description"
                                value={cardData?.company?.about??""}
                                onChange={(event)=>handleChange("company.about", event)}
                                fullWidth
                                multiline
                                rows={3}
                            />
                        </Stack>
                    </Grid>
                </Grid>
            </MainCard>
       </Stack>
    )
}

export default BusinessTab;