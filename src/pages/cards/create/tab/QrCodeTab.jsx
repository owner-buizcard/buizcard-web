import { Avatar, Box, Grid, InputLabel, OutlinedInput, Stack, Typography } from "@mui/material";
import MainCard from "../../../../components/MainCard";
import { FaUserCircle } from "react-icons/fa";
import pickerColors from "../../../../theme/colors";
import ImagePicker from "../../../../components/ImagePicker";
import { useDispatch } from "react-redux";
import { updateCardData } from "../../../../store/reducers/card-builder";
import { useSelector } from "react-redux";


const QrCodeTab =()=>{
    const dispatch = useDispatch();
    const cardData = useSelector((state) => state.cardBuilder.cardData);

    const handleValueChange=(field, val)=>{
        dispatch(updateCardData({path: field, value: val}));
    }
    
    const handleImageChange=(image)=>{
        dispatch(updateCardData({path: "qr.logo", value: image}));
    }

    const removeImage=()=>{
        dispatch(updateCardData({path: "qr.logo", value: null}));
    }

    return ( 
        <Stack spacing={2} my={3}>
            <MainCard
                borderRadius={1}
                headerBorder
                title={"Qr Style"}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Stack spacing={2} alignItems={"center"} justifyContent={"center"} display={"flex"}>
                            <InputLabel>Custom Logo</InputLabel>
                            <ImagePicker
                                id={'qr-logo'}
                                value={cardData?.qr?.logo}
                                onChange={handleImageChange}
                                onRemove={removeImage} 
                                height={120} 
                                width={120}
                            >
                                <Stack spacing={1} sx={{ height: 120, width: 120, alignItems: "center", justifyContent: "center", display: "flex", backgroundColor: "#f5f5f5", border: "1px dashed #b0b0b0", borderRadius: "3px", flexDirection: "column" }}>
                                    <FaUserCircle  fontSize={"46px"} style={{color: "#aaa"}}/>
                                    <Typography variant="caption" sx={{ color: "grey" }}>Upload</Typography>
                                </Stack>
                            </ImagePicker>
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="first-name">Qr Style</InputLabel>
                            <OutlinedInput
                                id="first-name"
                                type="text"
                                name="First Name"
                                placeholder="Enter first name"
                                fullWidth
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="last-name">Eye Style</InputLabel>
                            <OutlinedInput
                                id="last-name"
                                type="text"
                                name="Last Name"
                                placeholder="Enter last name"
                                fullWidth
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="last-name">QrCode Color</InputLabel>
                            <MainCard>
                                <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                                    {
                                        pickerColors.map((color)=>{
                                            return <Box 
                                                key={color} 
                                                onClick={()=>handleValueChange("qr.fgColor", color)}
                                                sx={{background: color, width: 24, height: 24, borderRadius: 16}}/>
                                        })
                                    }
                                </Stack>
                            </MainCard>
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                                <InputLabel htmlFor="last-name">Eye Color</InputLabel>
                                <MainCard>
                                    <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                                        {
                                            pickerColors.map((color)=>{
                                                return <Box 
                                                    key={color} 
                                                    onClick={()=>handleValueChange("qr.eyeColor", color)}
                                                    sx={{background: color, width: 24, height: 24, borderRadius: 16}}/>
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

export default QrCodeTab;