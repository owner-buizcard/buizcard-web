import { CheckCircleOutlined, CodeOutlined, CopyOutlined } from "@ant-design/icons";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import { generateEmailSignature } from "../network/service/signatureService";
import * as clipboard from "clipboard-polyfill";
import { useState } from "react";

const SignatureInstructions = ({ values, data })=>{

    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState(false);
    const [signature, setSignature] = useState(null);
    const [copied, setCopied] = useState(null);

    const generateSignatureText=async ()=>{
        if(signature){
            await clipboard.write([signature]);
            return;
        }

        setLoadingText(true);
        const signatureHtml = await generateEmailSignature(data);
        const item = new clipboard.ClipboardItem({
            "text/plain": new Blob(
                [ signatureHtml ],
                { type: "text/plain" }
            ),
            });
        setSignature(item);
        setCopied("text");
        setLoadingText(false);
    }

    const generateSignature=async ()=>{
        if(signature){
            await clipboard.write([signature]);
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
        setCopied("html");
        setSignature(item);
        setLoading(false);
    }
    

    return (
        <Stack direction={"column"} spacing={2}>
            {
                values!=null
                ? values?.map((v)=>{
                    return (
                        <Stack direction={"column"} spacing={2}>
                            <Stack direction={"row"} spacing={2}>
                                <Avatar sx={{height: "18px", width: "18px", fontSize: "14px"}}>{v.index}</Avatar>
                                <Typography>{v.content}</Typography>
                            </Stack>
                            {
                                v.action=="Copy text"
                                ? <Stack direction={"row"} spacing={2}>
                                    <Button color={copied=="text" ?"success": null}  disabled={loadingText} onClick={()=>generateSignatureText()} variant="contained" startIcon={
                                        copied=="text" ? <CheckCircleOutlined/>: <CopyOutlined style={{ fontSize: "14px" }}/>}>
                                    {copied=="text" ? "Copied": "Copy Text"}
                                    </Button>
                                    <Button color={copied=="html" ?"success": null}  disabled={loading} onClick={()=>generateSignature()} variant="contained" startIcon={
                                        copied=="html" ? <CheckCircleOutlined/>: <CopyOutlined style={{ fontSize: "14px" }}/>}>
                                    {copied=="html" ? "Copied": "Copy HTML"}
                                    </Button>
                                </Stack>
                                : v.action && <Stack direction={"row"} spacing={2}>
                                    <Button color={copied=="html" ?"success": null}  disabled={loading} onClick={()=>generateSignature()} variant="contained" startIcon={
                                        copied=="html" ? <CheckCircleOutlined/>: <CopyOutlined style={{ fontSize: "14px" }}/>}>
                                        {copied=="html" ? "Copied": "Copy Signature"}
                                    </Button>
                                </Stack>
                            }
                        </Stack>
                    )
                })
                : <Typography>You must select a platform first.</Typography>
            }
        </Stack>
    )
}

export default SignatureInstructions;