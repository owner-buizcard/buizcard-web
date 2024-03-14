import { Box, Button, CircularProgress, Dialog, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import MainCard from "../MainCard";
import { CloseOutlined } from "@ant-design/icons";
import * as clipboard from "clipboard-polyfill";
import { generateEmailSignature } from "../../network/service/signatureService";
import { useState } from "react";

const SignatureDialog=({data, onCancel, open})=>{

    const [loading, setLoading] = useState(false);
    const [signature, setSignature] = useState(null);
    const [copied, setCopied] = useState(false);


    const generateSignature=async ()=>{
        if(signature){
            await clipboard.write([signature]);
            setCopied(true);
            return;
        }

        setLoading(true);
        const signatureHtml = await generateEmailSignature(data);
        const item = new clipboard.ClipboardItem({
            "text/html": new Blob(
              [ signatureHtml ],
              { type: "text/html" }
            ),
          });
        setSignature(item);
        setLoading(false);
    }


    return (
        <Dialog open={open}>
            <MainCard
                title={
                    <Stack direction={"row"} justifyContent={"space-between"}>
                        <Box>
                            <Typography variant="h4" sx={{mb: 0.6}}>How to add a signature to your emails</Typography>
                            <Typography variant="body1">Follow to the steps to add your signature</Typography>
                        </Box>
                        <IconButton onClick={()=>{
                            setCopied(false);
                            setSignature(null);
                            onCancel();
                        }}>
                            <CloseOutlined/>
                        </IconButton>
                    </Stack>
                }
                borderRadius={1}
                headerBorder
                sx={{minWidth: "700px" }}
            >
                <Stack spacing={1.5}>
                    <ListItem>
                        <ListItemText>
                            <Typography variant="body2" color={"grey"} sx={{mb: 0.8}}>STEP 1</Typography>
                            <Typography>{`Copy your email signature —>`}</Typography>
                        </ListItemText>
                        <ListItemIcon>
                        <Button variant="contained" onClick={generateSignature} sx={{ width: "160px", height: "40px", background: copied ? "green": null }}>
                            {loading ? (
                                <CircularProgress
                                    size="1.6rem"
                                    sx={{color: "white"}}
                                />
                            ) : (
                               copied ? "Signature Copied": signature ? "Copy" : "Generate Signature"
                            )}
                        </Button>
                        </ListItemIcon>
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <ListItemText>
                            <Typography variant="body2" color={"grey"} sx={{mb: 0.8}}>STEP 2</Typography>
                            <Typography>Within your Gmail account, click the gear icon on the top right, select the “See all settings” option and scroll down to the “Signature” section</Typography>
                        </ListItemText>
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <ListItemText>
                            <Typography variant="body2" color={"grey"} sx={{mb: 0.8}}>STEP 3</Typography>
                            <Typography>Select the “Create new” option and paste your email signature into the text box</Typography>
                        </ListItemText>
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <ListItemText>
                            <Typography variant="body2" color={"grey"} sx={{mb: 0.8}}>STEP 4</Typography>
                            <Typography>In the “Signature Defaults” subsection, select your newly created signature as default and then scroll down to the very bottom of the page and select the “Save” button</Typography>
                        </ListItemText>
                    </ListItem>
                    <Divider/>
                </Stack>

            </MainCard>
        </Dialog>
    )
}

export default SignatureDialog;