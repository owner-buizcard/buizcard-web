import { PlusOutlined } from "@ant-design/icons";
import { useTheme } from "@emotion/react";
import { Box, Button, Divider, Grid, InputLabel, OutlinedInput, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { QRCode } from "react-qrcode-logo";
import SignatureDialog from "../../../../components/dialogs/SignatureDialog";
import { showUpgradeInfo } from "../../../../utils/snackbar-utils";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignatureTab = ({cardData})=>{

    const theme = useTheme();
    const navigate = useNavigate();
    let isEnabled = useSelector((state)=>state.app.enableEmailSignature)

    const [fullName, setFullName] = useState(`${cardData?.name?.firstName??""} ${cardData?.name?.lastName??""}`);
    const [jobTitle, setJobTitle] = useState(cardData?.designation??"");
    const [company, setCompany] = useState(cardData?.company?.companyName??"");
    const [phoneNumber, setPhoneNumber] = useState(cardData?.phoneNumber??"");
    const [location, setLocation] = useState(cardData?.address?.city??"");
    const [disclaimer, setDisclaimer] = useState('');

    const [open, setOpen] = useState(false);

    const handleClose=()=>{
        setOpen(false);
    }

    const handleOpen=()=>{
        if(!isEnabled){
            showUpgradeInfo(navigate, "Upgrade your account to use this feature!")
            return;
        }
        setOpen(true);
    }

    return (
        <>
        <SignatureDialog 
            open={open}
            data={{ fullName, jobTitle, company, phoneNumber, location, disclaimer, cardId: cardData._id, showQrCode: true }} 
            onCancel={handleClose}  
        />
        <Box sx={{ minHeight: "calc(100vh - 280px)" }}>

        <Grid container spacing={3} >
                <Grid item xs={12} sm={5}>
                <Box 
                    sx={{
                        p: 2
                    }}
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"} 
                >
                    <Typography variant="body1" sx={{color: "grey"}}>Signature preview</Typography>
                    <Box
                        sx={{
                            width: "100%",
                            border: `1px solid ${theme.palette.grey[200]}`,
                            p: 2.5,
                            marginTop: "16px",
                            marginBottom: "32px"
                        }}
                    >
                        <Grid container>
                            <Grid item xs={8}>
                                <Box>
                                    <Typography variant="h5">{fullName}</Typography>
                                    <Stack>
                                    <Typography variant="caption">{jobTitle}</Typography>
                                    <Typography variant="caption">{company}</Typography>
                                    <Typography variant="caption">{phoneNumber}</Typography>
                                    <Typography variant="caption">{location}</Typography>
                                    </Stack>

                                    <div style={{height: "30px"}}/>

                                    <Typography sx={{fontStyle: "italic"}} variant="caption">{disclaimer}</Typography>
                                </Box>

                            </Grid>
                            <Grid item xs={4} >

                                <Box
                                    sx={{
                                        width: "100%",
                                        alignItems: "end",
                                        justifyContent: "end"
                                    }}
                                >
                                    <Stack 
                                        alignItems={"center"}
                                        spacing={2}
                                    >
                                        <QRCode
                                            quietZone={2}
                                            size={100}
                                            value={`${window.origin}/app/p/card/${cardData._id}`}
                                            logoWidth={100 * 0.25}
                                            logoHeight={100 * 0.25}
                                            qrStyle= {'dots'}
                                        />
                                        <Typography variant="caption" sx={{color: "grey"}}>Connect With Me</Typography>
                                    </Stack>
                                </Box>
                            </Grid>
                        </Grid>

                    </Box>
                    <Button
                        onClick={()=>handleOpen()}
                        variant="outlined"
                        startIcon={<PlusOutlined/>}
                    >
                        Add To Email
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12} sm={7}>  

            <Box>
                <Typography variant='h5' sx={{mb: "24px"}}>Email Signature</Typography>
                <Grid container spacing={3}>
                    
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="full-name">Full Name</InputLabel>
                            <OutlinedInput
                                id="full-name"
                                type="text"
                                name="full Name"
                                placeholder="Enter full name"
                                value={fullName}
                                onChange={(event)=>setFullName(event.target.value)}
                                fullWidth
                            />
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
                                value={jobTitle}
                                onChange={(event)=>setJobTitle(event.target.value)}
                                fullWidth
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="company-name">Company</InputLabel>
                            <OutlinedInput
                                id="company-name"
                                type="text"
                                name="Company Name"
                                placeholder="Enter company name"
                                value={company}
                                onChange={(event)=>setCompany(event.target.value)}
                                fullWidth
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="phone-number">Phone Number</InputLabel>
                            <OutlinedInput
                                id="phone-number"
                                type="text"
                                name="Phone Number"
                                placeholder="Enter phone number"
                                value={phoneNumber}
                                onChange={(event)=>setPhoneNumber(event.target.value)}
                                fullWidth
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="address">Location</InputLabel>
                            <OutlinedInput
                                id="address"
                                type="text"
                                name="Address"
                                placeholder="Enter address"
                                value={location}
                                onChange={(event)=>setLocation(event.target.value)}
                                fullWidth
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="desclaimer">Desclaimer</InputLabel>
                            <OutlinedInput
                                id="desclaimer"
                                type="text"
                                name="Desclaimer"
                                placeholder="Enter desclaimer"
                                value={disclaimer}
                                onChange={(event)=>setDisclaimer(event.target.value)}
                                fullWidth
                            />
                        </Stack>
                    </Grid>
                </Grid>
            </Box>

            </Grid>
        </Grid>
        </Box>
        </>
    )
}

export default SignatureTab;