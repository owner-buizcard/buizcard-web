import { Box, Button, Grid, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import MainCard from "../../components/MainCard";
import { ArrowRightOutlined, DeleteOutlined } from "@ant-design/icons";
import ConfirmDialog from "../../components/dialogs/ConfirmDialog";
import { useState } from "react";
import { deleteAccount } from "../../network/service/userService";
import { useNavigate } from "react-router-dom";
import { clearCookies } from "../../utils/utils";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../store/reducers/app";

const AccountSettings = ()=>{

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDelete=async()=>{
        dispatch(showLoader());
        await deleteAccount();
        clearCookies();
        dispatch(hideLoader());
        navigate('/loading');
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
        </MainCard>
    )
}

export default AccountSettings;