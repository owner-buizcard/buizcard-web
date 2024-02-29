import { CheckCircleOutlined, DeleteFilled, DeleteOutlined } from "@ant-design/icons";
import { Avatar, Box, Button, Dialog, Stack, Typography } from "@mui/material";
import MainCard from "../MainCard";
import { useTheme } from "@emotion/react";

const SuccessDialog =({open, onOk, title, content, btnTxt})=>{

    const theme = useTheme();
    
    return(
    <Dialog open={open}>
        <MainCard
            borderRadius={1}
            headerBorder
            sx={{maxWidth: "460px" }}
        >
            <Stack spacing={2} px={4} alignItems={"center"}>
                <Avatar sx={{width: 70, height: 70, background: `${theme.palette.success.lighter}`}} >
                    <CheckCircleOutlined style={{color: `${theme.palette.success.main}`, fontSize: 26}}/>
                </Avatar>
                <Stack spacing={1}>
                <Typography variant="h4" sx={{textAlign: "center"}}>{title}</Typography>
                <Typography variant="body1" sx={{textAlign: "center"}}>{content}</Typography>
                </Stack>
                <Box/>
                <Stack direction={"row"} spacing={2} sx={{width: "100%"}}>
                    <Button variant="contained" color="success" onClick={onOk} sx={{px: 3}} fullWidth>{btnTxt??"Ok"}</Button>
                </Stack>
            </Stack>
        </MainCard>
    </Dialog>
)}

export default SuccessDialog;