import { Avatar, Box, Button, Grid, IconButton, OutlinedInput, Stack, Typography } from "@mui/material";
import CardPreview from "../../../../components/Card/CardPreview";
import QRCodeView from "../../../../components/QRCodeView";
import { CopyOutlined, DownloadOutlined } from "@ant-design/icons";
import { IoMdOpen } from "react-icons/io";
import MainCard from "../../../../components/MainCard";
import { useTheme } from "@emotion/react";
import { formCardLink } from "../../../../utils/utils";
import Toaster from "../../../../components/@extended/Toaster";
import { useState } from "react";
import { EmailShareButton, FacebookShareButton, LinkedinShareButton, WhatsappShareButton } from 'react-share';

const ShareTab =({cardData, captureQr})=>{

    const theme = useTheme();

    const [showToast, setShowToast] = useState(false);

    const copyLink = ()=>{
        navigator.clipboard.writeText(cardData.cardLink);
        setShowToast(true);
    }

    return (
        <Grid container spacing={4}>
        <Toaster
            open={showToast}
            close={()=>setShowToast(false)}
            message={"Card link copied successfully!"}
        />
        {/* <Grid item xs={4}>
            <CardPreview cardData={cardData}/>
        </Grid> */}
        <Grid item xs={2}/>
        <Grid item xs={8} >
            <Stack direction={"row"} sx={{py: 1, px: 4}} spacing={6} alignItems={"center"}>
                <Stack spacing={4}>
                    <QRCodeView
                        cardLink={cardData?.cardLink}
                        logo={cardData?.qr?.logo}
                        qrStyle={cardData?.qr?.codeStyle}
                        fgColor={cardData?.qr?.fgColor}
                        eyeColor={cardData?.qr?.eyeColor}
                        eyeStyle={cardData?.qr?.eyeStyle}
                    />
                    <Box sx={{display: "flex", justifyContent: "center"}}>
                        <Button variant="contained" startIcon={<DownloadOutlined/>} onClick={captureQr}>
                            Download Qr Code
                        </Button>
                    </Box>
                </Stack>

                <Stack sx={{flexGrow: 1}} spacing={4}>

                    <Stack spacing={2}>
                        <Typography variant="h5">Copy Card Link</Typography>

                        <Stack direction={"row"} spacing={2}>
                            <OutlinedInput
                                sx={{flexGrow: 1}}
                                size="small"
                                value={cardData.cardLink}
                                id="header-search"
                                readOnly={true}
                                aria-describedby="header-search-text"
                                inputProps={{
                                'aria-label': 'weight'
                                }}
                            />
                                <IconButton
                                    onClick={copyLink}
                                    disableRipple
                                    color="secondary"
                                    title="Download Free Version"
                                    sx={{ color: 'text.primary', }}
                                >
                                    <CopyOutlined />
                                </IconButton>
                        </Stack>
                    </Stack>

                    <Stack spacing={2} sx={{flexGrow: 1}}>
                        <Typography variant="h5">Share Card</Typography>

                        <MainCard>
                        <Grid container spacing={2}>
                            <Grid item xs={6} >
                                <EmailShareButton url={cardData.cardLink} quote={"Hello from bizcard!"} style={{width: "100%"}}>
                                <Box sx={{backgroundColor: theme.palette.grey[200], p: 1, borderRadius: '3px'}}>
                                    <Stack direction={"row"} alignItems={"center"} spacing={1}>
                                        <Avatar src={`https://firebasestorage.googleapis.com/v0/b/bizcard-web.appspot.com/o/cardbuilder%2Ficons%2Fcommunication%2Femail.png?alt=media`} sx={{width: 24, height: 24}}/>
                                        <Typography variant="body1" sx={{flexGrow: 1, textAlign: "left"}}>Email</Typography>
                                        <IoMdOpen/>
                                    </Stack>
                                </Box>
                                </EmailShareButton>
                            </Grid>
                            <Grid item xs={6}>
                                <FacebookShareButton url={cardData.cardLink} quote={"Hello from bizcard!"} style={{width: "100%"}}>
                                <Box sx={{backgroundColor: theme.palette.grey[200], p: 1, borderRadius: '3px'}}>
                                    <Stack direction={"row"} alignItems={"center"} spacing={1}>
                                        <Avatar src={`https://firebasestorage.googleapis.com/v0/b/bizcard-web.appspot.com/o/cardbuilder%2Ficons%2Fsocial%2Ffacebook.png?alt=media`} sx={{width: 24, height: 24}}/>
                                        <Typography variant="body1" sx={{flexGrow: 1, textAlign: "left"}}>Facebook</Typography>
                                        <IoMdOpen/>
                                    </Stack>
                                </Box>
                                </FacebookShareButton>
                            </Grid>
                            <Grid item xs={6}>
                                <LinkedinShareButton url={cardData.cardLink} quote={"Hello from bizcard!"} style={{width: "100%"}}>
                                <Box sx={{backgroundColor: theme.palette.grey[200], p: 1, borderRadius: '3px'}}>
                                    <Stack direction={"row"} alignItems={"center"} spacing={1}>
                                        <Avatar src={`https://firebasestorage.googleapis.com/v0/b/bizcard-web.appspot.com/o/cardbuilder%2Ficons%2Fsocial%2Flinkedin.png?alt=media`} sx={{width: 24, height: 24}}/>
                                        <Typography variant="body1" sx={{flexGrow: 1, textAlign: "left"}}>Linkedin</Typography>
                                        <IoMdOpen/>
                                    </Stack>
                                </Box>
                                </LinkedinShareButton>
                            </Grid>
                            <Grid item xs={6}>
                                <WhatsappShareButton url={cardData.cardLink} quote={"Hello from bizcard!"} style={{width: "100%"}}>
                                <Box sx={{backgroundColor: theme.palette.grey[200], p: 1, borderRadius: '3px'}}>
                                    <Stack direction={"row"} alignItems={"center"} spacing={1}>
                                        <Avatar src={`https://firebasestorage.googleapis.com/v0/b/bizcard-web.appspot.com/o/cardbuilder%2Ficons%2Fcommunication%2Fwhatsapp.png?alt=media`} sx={{width: 24, height: 24}}/>
                                        <Typography variant="body1" sx={{flexGrow: 1, textAlign: "left"}}>Whatsapp</Typography>
                                        <IoMdOpen/>
                                    </Stack>
                                </Box>
                                </WhatsappShareButton>
                            </Grid>
                        </Grid>
                        </MainCard>
                    </Stack>


                </Stack>
            </Stack>
        </Grid>
    </Grid>
    )
}

export default ShareTab;