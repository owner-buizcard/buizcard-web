import { DownloadOutlined } from "@ant-design/icons";
import { Box, Button, Grid, ImageList, ImageListItem, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { QRCode } from "react-qrcode-logo";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";

const VBTab =({cardData})=>{

    const configs = useSelector((state)=>state.app.config);
    
    const [selected, setSelected] = useState(configs?.backgrounds[0].link);

    const componentRef = useRef();

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
            <Grid item xs={7} >

                <ImageList sx={{ width: "100%", height: 450 }} cols={3}>
                    {configs?.backgrounds?.map((item)=>(
                        <ImageListItem key={item.link}>
                            <img
                                srcSet={`${item.link}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.category}
                                loading="lazy"
                                style={{
                                    height: "auto",
                                    cursor: "pointer"
                                }}
                                onClick={()=>setSelected(item.link)}
                                crossorigin="anonymous"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Grid>
            <Grid item xs={5}>
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
                            backgroundImage: `url(${selected})`,
                            width: "100%",
                            height: "270px",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            borderRadius: "3px",
                            marginBottom: "32px",
                            marginTop: "16px",
                            padding: "12px"
                        }}
                    >
                        <Stack direction={"row"} justifyContent={"space-between"}>
                            <Box 
                                sx={{
                                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                                    height: "fit-content",
                                    p: 1
                                }}
                            >
                                <Typography sx={{color: 'white'}} variant="h5">{cardData?.name?.firstName} {cardData?.name?.middleName} {cardData?.name?.lastName}</Typography>
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