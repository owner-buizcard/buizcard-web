import { Avatar, Button, Divider, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import CardPreview from "../../../../components/Card/CardPreview";
import QRCodeView from "../../../../components/QRCodeView";
import { CopyOutlined, DownloadOutlined } from "@ant-design/icons";
import Toaster from "../../../../components/@extended/Toaster";
import { useState } from "react";
import { EmailIcon, EmailShareButton, FacebookShareButton, LinkedinShareButton, WhatsappShareButton } from 'react-share';
import WhatsappImg from '../../../../assets/images/whatsapp.png'
import FacebookImg from '../../../../assets/images/facebook.png'
import LinkedinImg from '../../../../assets/images/linkedin.png'
import GmailImg from '../../../../assets/images/gmail.png'

const ShareTab =({cardData, captureQr})=>{

    const [showToast, setShowToast] = useState(false);

    const isMobileScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const copyLink = ()=>{
        navigator.clipboard.writeText(cardData?.cardLink);
        setShowToast(true);
    }

    return (
        <Grid container spacing={4}>
        <Toaster
            open={showToast}
            close={()=>setShowToast(false)}
            message={"Card link copied successfully!"}
        />
        <Grid item xs={12} sm={8}>
            <Stack direction={"row"} sx={{py: 1, px: 4}} spacing={6} justifyContent={"center"}>
                <Stack spacing={5} alignItems={"center"}>
                    <Stack alignItems={"center"} spacing={0.8}>
                    <Typography variant='h5'>Personalized Qrcode</Typography>
                    <Typography variant="body1" sx={{color: "grey"}}>Scan or tap on Qr code to go to your card</Typography>
                    </Stack>
                    <QRCodeView
                        cardLink={cardData?.cardLink}
                        logo={cardData?.qr?.logo}
                        qrStyle={cardData?.qr?.codeStyle}
                        fgColor={cardData?.qr?.fgColor}
                        eyeColor={cardData?.qr?.eyeColor}
                        eyeStyle={cardData?.qr?.eyeStyle}
                    />
                    <Stack direction={ isMobileScreen ? "column" : "row"} sx={{display: "flex", justifyContent: "center"}} spacing={2}>
                        <Button sx={{minWidth: "160px"}} variant="contained" startIcon={<DownloadOutlined/>} onClick={captureQr}>
                            Download Qr
                        </Button>
                        <Button sx={{minWidth: "160px"}} variant="outlined" startIcon={<CopyOutlined/>} onClick={copyLink}>
                            Copy Link
                        </Button>
                    </Stack>
                    <Divider sx={{width: "100%"}}>Share On</Divider>
                    <Stack direction={"row"} sx={{display: "flex", justifyContent: "center"}} spacing={3}>
                        <EmailShareButton url={cardData?.cardLink} quote={"Hello from buizcard!"} style={{width: "100%"}}>
                        <Avatar sx={{p: 0.55, cursor: "pointer", width: "50px"}} src={GmailImg} />
                        </EmailShareButton>

                        <FacebookShareButton url={cardData?.cardLink} quote={"Hello from buizcard!"} style={{width: "100%"}}>
                        <Avatar sx={{p: 0.3, cursor: "pointer", width: "50px"}}  src={FacebookImg} />
                        </FacebookShareButton>

                        <LinkedinShareButton url={cardData?.cardLink} quote={"Hello from buizcard!"} >
                        <Avatar sx={{p: 0.3, cursor: "pointer", width: "50px"}}  src={LinkedinImg} />
                        </LinkedinShareButton>
                        
                        <WhatsappShareButton url={cardData?.cardLink} quote={"Hello from buizcard!"} style={{width: "100%"}}>
                        <Avatar sx={{p: 0.2, cursor: "pointer", width: "50px"}}  src={WhatsappImg} />
                        </WhatsappShareButton>
                    </Stack>
                </Stack>
            </Stack>
        </Grid>
        <Grid item xs={12} sm={4}>
            <CardPreview cardData={cardData} isLive={false} removePadding={true}/>
        </Grid>
    </Grid>
    )
}

export default ShareTab;