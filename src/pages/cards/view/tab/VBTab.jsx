import { DownloadOutlined } from "@ant-design/icons";
import { Box, Button, Grid, ImageList, ImageListItem, Skeleton, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { QRCode } from "react-qrcode-logo";
import { Fragment, useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { getVirtualBackgrounds } from "../../../../network/service/backgroundService";
import { da } from "date-fns/locale";

const VBTab =({cardData})=>{

    const configs = useSelector((state)=>state.app.config);
    
    const [selected, setSelected] = useState(configs?.backgrounds[0].link);

    const componentRef = useRef();

    const [loading, setLoading] = useState(true);
    const [backgrounds, setBackgrounds] = useState([]);

    useEffect(()=>{
        const init=async()=>{
            if(loading){

                const vbs = await getVirtualBackgrounds();
                setBackgrounds(vbs);

            }
            setLoading(false);
        }
        init();
    }, [loading])

    const downloadVB = () => {
        if (componentRef.current) {
          html2canvas(componentRef.current, {
            allowTaint : true,
            useCORS : true,
            scale : 10,
            dpi : 1200
          }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = imgData;
            link.download = `${cardData.cardName}-vb-bizcard.png`;
            link.click();
          });
        }
      };

    return (
        <Grid container spacing={3} >
            <Grid item xs={8} >
                <Box>
                <Typography variant='h5' sx={{mb: "24px"}}>Virtual Background</Typography>
                {loading ? (
                    Array.from({ length: 8 }).map((_, index) => (
                        <Skeleton key={index} variant="rectangular" width="100%" height={450} />
                    ))
                    ) : (
                    
                    <Grid container spacing={2}>
                        {
                            backgrounds?.map((data, index)=>(
                                <Fragment key={index}>
                                <Grid item xs={12}>
                                    <Typography variant="body1" color={"gray"}>{data.category}</Typography>
                                </Grid>
                                {data.items.map((image, imageIndex) => (
                                    <Grid item xs={4} key={imageIndex}>
                                        <img
                                            src={image.normal}
                                            alt={data.category}
                                            loading="lazy"
                                            style={{
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
                        }
                    </Grid>
                )}
                </Box>
            </Grid>
            <Grid item xs={4}>
                <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"} 
                    spacing={2}
                >

                    <Typography variant="body1" sx={{color: "grey"}}>Virtual background preview</Typography>

                    <Box
                        ref={componentRef}
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
                        onClick={downloadVB}
                        variant="outlined"
                        startIcon={<DownloadOutlined/>}
                    >
                        Download Background
                    </Button>
                </Box>
            </Grid>
        </Grid>
    )
}

export default VBTab;