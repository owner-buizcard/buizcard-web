import React, { useState, Fragment } from "react";
import { IconButton, ListItem, ListItemIcon, ListItemText, Menu } from "@mui/material";
import { DeleteOutlined, DownloadOutlined, EditOutlined, EyeOutlined, MailOutlined, MoreOutlined, PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { showUpgradeInfo } from "../../utils/snackbar-utils";
import { useNavigate } from "react-router-dom";

const ContactOptions = ({ onDelete, onSave, onAdd, onEdit, isEdit, isEmail, onSend, onPreview }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const enableTags = useSelector((state)=>state.app.enableTags);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const menuItems = ()=> [
        { icon: <PlusOutlined />, text: "Add Tags", id: 0 },
        ...(isEmail ? [{ icon: <MailOutlined />, text: "Send Email", id: 1 }] : []),
        ...(isEdit ? [{ icon: <EditOutlined />, text: "Edit Contact", id: 2 }] : []),
        ...(!isEdit ? [{ icon: <EyeOutlined />, text: "Preview Contact", id: 5 }] : []),
        { icon: <DownloadOutlined />, text: "Save as Contact", id: 3 },
        { icon: <DeleteOutlined style={{ color: "red" }} />, text: "Remove", id: 4, style: { color: "red" } },
    ];

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleListItemClick = (index) => {
        if (index === 0) {
            if(enableTags){
                onAdd();
            }else{
                showUpgradeInfo(navigate, "Upgrade your account to use this feature!")
            }
        } else if (index === 1) {
            onSend();
        } else if (index === 2) {
            onEdit();
        } else if (index === 3) {
            onSave();
        } else if (index === 4) {
            onDelete();
        } else if (index === 5) {
            onPreview();
        } 
        handleClose();
    };

    return (
        <Fragment>
            <IconButton
                aria-controls={anchorEl ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
            >
                <MoreOutlined />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                {menuItems().map((item, index) => (
                    <ListItem key={index} onClick={() => handleListItemClick(item.id)} sx={{cursor: "pointer", width: "180px", px: 2, py: 1.3 }}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </Menu>
        </Fragment>
    );
};

export default ContactOptions;
