import { DownloadOutlined } from "@ant-design/icons";
import { Box, Button, CircularProgress, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { QRCode } from "react-qrcode-logo";
import { useEffect, useState } from "react";
import { createVirtualBackground, getVirtualBackgrounds } from "../../../../network/service/backgroundService";
import { downloadImageUrl, downloadImageWithText } from "../../../../utils/utils";
import { useTheme } from "@emotion/react";
import GalleryView from "../../../../components/GalleryView";
import { useSelector } from "react-redux";

const VBTab =({cardData})=>{
    
    const theme = useTheme();
    const [selected, setSelected] = useState(null);

    let vbs = useSelector((state)=>state.app.backgrounds)

    const [loading, setLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const [backgrounds, setBackgrounds] = useState([]);

    useEffect(()=>{
        const init=async()=>{
            if(loading){
                vbs = vbs?.length<=0 ?await getVirtualBackgrounds() : vbs;
                setBackgrounds(vbs);
                setSelected(vbs[0].items[0]);
            }
            setLoading(false);
        }
        init();
    }, [loading])

    const downloadVB = async() => {
        setBtnLoading(true);
        await downloadImageWithText(selected.large, cardData)
        setBtnLoading(false);
    }

    return (
        <Grid container spacing={3} >
            <Grid item xs={12} sm={4}>
                <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"} 
                    spacing={2}
                >

                    <Typography variant="body1" sx={{color: "grey"}}>Virtual background preview</Typography>

                    {
                        loading 
                        ? <Skeleton variant="rectangular" width="100%" height={140} sx={{m: 2}}/>
                        : <>
                        <Box
                            sx={{
                                width: "100%",
                                position: "relative",
                                borderRadius: "3px",
                                marginBottom: "32px",
                                marginTop: "16px",
                            }}
                        >
                            <img
                                src={selected?.normal}
                                alt="Background"
                                style={{
                                    borderRadius: "5px",
                                    width: '100%',
                                    height: 'auto',
                                    objectFit: 'cover',
                                }}
                            />
                            <Stack direction={"row"} justifyContent={"space-between"} sx={{position: "absolute", top: 0, width: "100%", p: 1}}>
                                <Box 
                                    sx={{
                                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                                        height: "fit-content",
                                        borderRadius: "2px",
                                        px: 1,
                                        py: 0.5
                                    }}
                                >
                                    <Typography sx={{color: 'white', fontSize: "8px"}} variant="subtitle2">{cardData?.name?.firstName} {cardData?.name?.middleName} {cardData?.name?.lastName}</Typography>
                                </Box>
                                <QRCode
                                    quietZone={2}
                                    size={28}
                                    bgColor="#cccccc"
                                    logoWidth={58 * 0.25}
                                    logoHeight={58 * 0.25}
                                    qrStyle= {'dots'}
                                />
                            </Stack>
                        </Box>

                        <Button 
                            variant="outlined" 
                            onClick={downloadVB} 
                            sx={{ width: "200px", height: "40px" }}
                            startIcon={!btnLoading && <DownloadOutlined/>}>
                                {btnLoading ? (
                                    <CircularProgress
                                        size="1.6rem"
                                    />
                                ) : (
                                    "Download Background"
                                )}
                        </Button>
                        </>
                    }
                </Box>
            </Grid>
            <Grid item xs={12} sm={8}>
                <Box>
                <Typography variant='h5' sx={{mb: "24px"}}>Virtual Background</Typography>
                {
                    
                    <Grid container spacing={2} sx={{height: `${window.innerHeight - 310}px`, overflowY: 'auto', padding: '6px', border: '1px solid #eee', borderRadius: "4px"}}>
                        { loading ? (
                        Array.from({ length: 9 }).map((_, index) => (
                            <Grid item xs={12} sm={4} key={index}>
                                <Skeleton variant="rectangular" width="100%" height={140} />
                            </Grid>
                        ))
                        ) : (
                            <GalleryView backgrounds={backgrounds} onClick={setSelected} selected={selected}/>
                        )}
                    </Grid>
                }
                </Box>
            </Grid>
        </Grid>
    )
}

export default VBTab;