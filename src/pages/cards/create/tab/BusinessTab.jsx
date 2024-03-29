import { Grid, InputLabel, OutlinedInput, Stack, Typography, useMediaQuery } from "@mui/material";
import MainCard from "../../../../components/MainCard";
import { FaAd, FaImage } from 'react-icons/fa';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateCardData } from "../../../../store/reducers/card-builder";
import ImagePicker from "../../../../components/ImagePicker";
import { FileImageOutlined, PicCenterOutlined, PictureOutlined } from "@ant-design/icons";
import { uploadCardImage } from "../../../../network/service/cardService";

const BusinessTab =()=>{

    const dispatch = useDispatch();
    const cardData = useSelector((state) => state.cardBuilder.cardData);

    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));


    const handleChange=(field, event)=>{
        dispatch(updateCardData({path: field, value: event.target.value}));
    }

    const handleLogoChange=(image)=>{
        dispatch(updateCardData({path: "logo", value: image}));
    }   

    const handleBannerChange=(image)=>{
        dispatch(updateCardData({path: "banner", value: image}));
    }   

    const uploadLogo = async(blob)=>{
        return await uploadCardImage({cardId: cardData._id, key: 'logo', file: blob, fileName: 'logo.jpeg' });
    }

    const uploadBanner = async(blob)=>{
        return await uploadCardImage({cardId: cardData._id, key: 'banner', file: blob, fileName: 'banner.jpeg' });
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
                        <Stack direction={isSmallScreen ? "column": "row"} spacing={4} alignItems={"center"} justifyContent={"center"} display={"flex"}>


                            <Stack spacing={2} alignItems={"center"} justifyContent={"center"} display={"flex"}>
                                <InputLabel>Company Logo</InputLabel>
                                <ImagePicker 
                                    tag={'logo'}
                                    icon={<PictureOutlined style={{fontSize: "36px"}}/>}
                                    value={cardData?.logo}
                                    onChange={handleLogoChange}
                                    onUpload={uploadLogo}
                                />
                            </Stack>

                            <Stack spacing={2} alignItems={"center"} justifyContent={"center"} display={"flex"}>
                                <InputLabel>Banner</InputLabel>
                                <ImagePicker 
                                    tag={'banner'}
                                    type={"rect"}
                                    icon={<PictureOutlined style={{fontSize: "36px"}}/>}
                                    value={cardData?.banner}
                                    onChange={handleBannerChange}
                                    onUpload={uploadBanner}
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
                                value={cardData?.company?.companyDescription??""}
                                onChange={(event)=>handleChange("company.companyDescription", event)}
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