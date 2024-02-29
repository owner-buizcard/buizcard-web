import { Box, Button, Divider, Grid, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import MainCard from "../../components/MainCard";
import { ArrowRightOutlined, DeleteOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import ConfirmDialog from "../../components/dialogs/ConfirmDialog";
import { useState } from "react";
import { deleteAccount } from "../../network/service/userService";
import { useNavigate } from "react-router-dom";
import { clearCookies } from "../../utils/utils";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../store/reducers/app";
import { forgotPassword } from "../../network/service/authService";
import { useSelector } from "react-redux";
import SuccessDialog from "../../components/dialogs/SuccessDialog";

const AccountSettings = ()=>{

    const [open, setOpen] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state)=>state.app.user);

    const handleDelete=async()=>{
        dispatch(showLoader());
        await deleteAccount();
        clearCookies();
        dispatch(hideLoader());
        navigate('/loading');
    }

    const sendPasswordReset =async()=>{
        dispatch(showLoader());
        await forgotPassword({email: user.email});
        dispatch(hideLoader());
        setOpenSuccess(true);
    }

    return (
        <MainCard>
            <ConfirmDialog
                open={open} 
                onOk={handleDelete} 
                onCancel={()=>setOpen(false)} 
                btnTxt={"Delete"}
                title={"Are you sure you want to delete?"}   
                content={`By deleting account, you will lose all your data. All cards created will be disabled.`}
            />
            <SuccessDialog
                open={openSuccess}
                onOk={()=>setOpenSuccess(false)} 
                btnTxt={"Done"}
                title={"Reset mail sent successfully!"}   
                content={`Password reset link sent to the registered email address.`}
            />
            <ListItem>
                <Box sx={{ width: "56px" }}>
                    <ListItemIcon><DeleteOutlined style={{fontSize: 24}}/></ListItemIcon>
                </Box>
                <ListItemText>
                    <Typography variant="body1" fontSize={16}>
                    Delete Account
                    </Typography>
                    <Typography variant="caption" color={"grey"}>
                    Note: All cards will be disabled.
                    </Typography>
                </ListItemText>
                <ListItemIcon>
                    <Button variant="contained" onClick={()=>setOpen(true)} color="error">Delete</Button>
                </ListItemIcon>
            </ListItem>
            <Divider sx={{my: 2}}/>
            <ListItem>
                <Box sx={{ width: "56px" }}>
                    <ListItemIcon><LockOutlined style={{fontSize: 24}}/></ListItemIcon>
                </Box>
                <ListItemText>
                    <Typography variant="body1" fontSize={16}>
                    Reset Password
                    </Typography>
                    <Typography variant="caption" color={"grey"}>
                    Password reset email will be sent.
                    </Typography>
                </ListItemText>
                <ListItemIcon>
                    <Button variant="contained" sx={{width: "136px"}} onClick={()=>sendPasswordReset()} >Send Reset Mail</Button>
                </ListItemIcon>
            </ListItem>
            <Divider sx={{my: 2}}/>
            <ListItem>
                <Box sx={{ width: "56px" }}>
                    <ListItemIcon><MailOutlined style={{fontSize: 24}}/></ListItemIcon>
                </Box>
                <ListItemText>
                    <Typography variant="body1" fontSize={16}>
                    Verify email
                    </Typography>
                    <Typography variant="caption" color={"grey"}>
                    Get a verfied badge.
                    </Typography>
                </ListItemText>
                <ListItemIcon>
                    <Button variant="contained" sx={{width: "136px"}} onClick={()=>setOpen(true)} >Verify</Button>
                </ListItemIcon>
            </ListItem>
        </MainCard>
    )
}

export default AccountSettings;