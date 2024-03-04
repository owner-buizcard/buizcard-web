import { Box, Grid, InputLabel, MenuItem, OutlinedInput, Stack, TextField } from "@mui/material";
import MainCard from "../../../../components/MainCard";
import ImagePicker from "../../../../components/ImagePicker";
import { useDispatch } from "react-redux";
import { updateCardData } from "../../../../store/reducers/card-builder";
import { useSelector } from "react-redux";
import { PictureOutlined } from "@ant-design/icons";
import { qrEyeStyles, qrStyles } from "../../../../utils/global";
import { useState } from "react";
import { uploadCardImage } from "../../../../network/service/cardService";
import { pickerColors } from "../../../../theme/colors";


const QrCodeTab =()=>{
    const dispatch = useDispatch();
    const cardData = useSelector((state) => state.cardBuilder.cardData);

    const [eyeStyle, setEyeStyle] = useState(cardData?.qr?.eyeStyle??"leaf");
    const [qrStyle, setQrStyle] = useState(cardData?.qr?.codeStyle??"dots");

    const handleValueChange=(field, val)=>{
        dispatch(updateCardData({path: field, value: val}));
    }

    const handleEyeStyleChange =(val)=>{
        setEyeStyle(val);
        dispatch(updateCardData({path: "qr.eyeStyle", value: val}));
    }

    const handleQrStyleChange =(val)=>{
        setQrStyle(val);
        dispatch(updateCardData({path: "qr.codeStyle", value: val}));
    }
    
    const handleImageChange=(image)=>{
        dispatch(updateCardData({path: "qr.logo", value: image}));
    }

    const uploadQrLogo = async(blob)=>{
        return await uploadCardImage({cardId: cardData._id, key: 'qrLogo', file: blob, fileName: 'qrLogo.jpeg' });
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
                                tag={'qrLogo'}
                                icon={<PictureOutlined style={{fontSize: "32px"}}/>}
                                value={cardData?.qr?.logo}
                                onChange={handleImageChange}
                                onUpload={uploadQrLogo}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="last-name">Qr Style</InputLabel>
                            <TextField
                                    id="qr-style"
                                    size="small"
                                    select
                                    value={qrStyle}
                                    onChange={(e) => handleQrStyleChange(e.target.value)}
                                    sx={{ '& .MuiInputBase-input': { py: 1.3, fontSize: '0.875rem' } }}
                                    >
                            {qrStyles.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                            </TextField>
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="last-name">Eye Style</InputLabel>
                            <TextField
                                    id="eye-style"
                                    size="small"
                                    select
                                    value={eyeStyle}
                                    onChange={(e) => handleEyeStyleChange(e.target.value)}
                                    sx={{ '& .MuiInputBase-input': { py: 1.3, fontSize: '0.875rem' } }}
                                    >
                            {qrEyeStyles.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                            </TextField>
                        </Stack>
                    </Grid>

                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="last-name">QrCode Color</InputLabel>
                            <MainCard>
                                <Stack spacing={{ xs: 1 }} direction="row" useFlexGap flexWrap="wrap">
                                    {
                                        pickerColors.map((color)=>{
                                            return <Box
                                                sx={{
                                                    p: '2px',
                                                    border: `2px solid ${ cardData?.qr?.fgColor==color ? color: 'white' }`,
                                                    borderRadius: 16,
                                                }}
                                            >
                                                <Box 
                                                key={color} 
                                                onClick={()=>handleValueChange("qr.fgColor", color)}
                                                sx={{
                                                    background: color, 
                                                    width: 24, 
                                                    height: 24, 
                                                    borderRadius: 16,
                                                }}/>
                                            </Box>
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
                                    <Stack spacing={{ xs: 1 }} direction="row" useFlexGap flexWrap="wrap">
                                        {
                                            pickerColors.map((color)=>{
                                                return <Box
                                                    sx={{
                                                        p: '2px',
                                                        border: `2px solid ${ cardData?.qr?.eyeColor==color ? color: 'white' }`,
                                                        borderRadius: 16,
                                                    }}
                                                ><Box 
                                                    key={color} 
                                                    onClick={()=>handleValueChange("qr.eyeColor", color)}
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

export default QrCodeTab;