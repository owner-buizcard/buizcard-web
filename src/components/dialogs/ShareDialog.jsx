import { Avatar, Box, Dialog, Grid, IconButton, OutlinedInput, Stack, Typography } from "@mui/material";
import MainCard from "../MainCard";
import { CopyOutlined } from "@ant-design/icons";
import { EmailShareButton, FacebookShareButton, LinkedinShareButton, WhatsappShareButton } from "react-share";
import { IoMdOpen } from "react-icons/io";
import { formCardLink } from "../../utils/utils";
import { useTheme } from "@emotion/react";

const ShareDialog =({open, handleCancel, cardId})=>{

    const theme = useTheme();

    const cardLink = formCardLink(cardId);

    const copyLink = ()=>{
        navigator.clipboard.writeText(cardLink);
    }

    return (
        <Dialog open={open} onClose={handleCancel}>
            <MainCard
                title={
                    <Typography variant="h5">Share Card</Typography>
                }
                borderRadius={1}
                headerBorder
                sx={{maxWidth: "440px", width: "100%" }}
            >
                <Stack sx={{flexGrow: 1}} spacing={4}>

                <Stack spacing={2}>
                    <Typography variant="body1">Copy Card Link</Typography>

                    <Stack direction={"row"} spacing={2}>
                        <OutlinedInput
                            sx={{flexGrow: 1}}
                            size="small"
                            value={cardLink}
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

                <Stack spacing={0} sx={{flexGrow: 1}}>
                    {/* <MainCard> */}
                    <Grid container spacing={2}>
                        <Grid item xs={6} >
                            <EmailShareButton url={cardLink} quote={"Hello from bizcard!"} style={{width: "100%"}}>
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
                            <FacebookShareButton url={cardLink} quote={"Hello from bizcard!"} style={{width: "100%"}}>
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
                            <LinkedinShareButton url={cardLink} quote={"Hello from bizcard!"} style={{width: "100%"}}>
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
                            <WhatsappShareButton url={cardLink} quote={"Hello from bizcard!"} style={{width: "100%"}}>
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
                    {/* </MainCard> */}
                </Stack>


                </Stack>

            </MainCard>
        </Dialog>
    )
}

export default ShareDialog;