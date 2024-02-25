import { DownloadOutlined } from "@ant-design/icons";
import { Box, Button, CircularProgress, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { QRCode } from "react-qrcode-logo";
import { Fragment, useEffect, useState } from "react";
import { createVirtualBackground, getVirtualBackgrounds } from "../../../../network/service/backgroundService";
import { downloadImageUrl } from "../../../../utils/utils";
import { useTheme } from "@emotion/react";

const VBTab =({cardData})=>{
    
    const theme = useTheme();
    const [selected, setSelected] = useState(null);

    const [loading, setLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const [backgrounds, setBackgrounds] = useState([]);

    useEffect(()=>{
        const init=async()=>{
            if(loading){
                const vbs = await getVirtualBackgrounds();
                setBackgrounds(vbs);
                setSelected(vbs[0].items[0]);
            }
            setLoading(false);
        }
        init();
    }, [loading])

    const downloadVB = async() => {
        setBtnLoading(true);
        const imageUrl = await createVirtualBackground(cardData._id, selected?._id);
        await downloadImageUrl(imageUrl);
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
                                        borderRadius: "4px",
                                        p: 1
                                    }}
                                >
                                    <Typography sx={{color: 'white', fontWeight: 'bold'}} variant="body1">{cardData?.name?.firstName} {cardData?.name?.middleName} {cardData?.name?.lastName}</Typography>
                                </Box>
                                <QRCode
                                    quietZone={2}
                                    size={58}
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
                    
                    <Grid container spacing={2}>
                        { loading ? (
                        Array.from({ length: 9 }).map((_, index) => (
                            <Grid item xs={12} sm={4} key={index}>
                                <Skeleton variant="rectangular" width="100%" height={140} />
                            </Grid>
                        ))
                        ) : (
                            backgrounds?.map((data, index)=>(
                                <Fragment key={index}>
                                <Grid item xs={12}>
                                    <Typography variant="body1" color={"gray"}>{data.category}</Typography>
                                </Grid>
                                {data.items.map((image, imageIndex) => (
                                    <Grid item xs={12} sm={4} key={imageIndex}>
                                        <img
                                            src={image.normal}
                                            alt={data.category}
                                            loading="lazy"
                                            style={{
                                            border: selected._id==image._id ?`3px solid ${theme.palette.primary.main}` : 'none',
                                            borderRadius: "6px",
                                            top: '0',
                                            left: '0',
                                            width: '100%',
                                            height: '140px',
                                            objectFit: 'cover', 
                                            cursor: 'pointer'
                                            }}
                                            onClick={() => setSelected(image)}
                                        />
                                    </Grid>
                                ))}
                                </Fragment>
                            ))
                        )}
                    </Grid>
                }
                </Box>
            </Grid>
        </Grid>
    )
}

export default VBTab;