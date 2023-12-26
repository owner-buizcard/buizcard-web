import React, { useState, Fragment } from "react";
import { IconButton, ListItem, ListItemIcon, ListItemText, Menu } from "@mui/material";
import { DeleteOutlined, DownloadOutlined, EditOutlined, MailOutlined, MoreOutlined, PlusOutlined } from "@ant-design/icons";

const ContactOptions = ({ onDelete, onSave, onAdd }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleListItemClick = (index) => {
        console.log(index);
        if (index === 0) {
            onAdd();
        } else if (index === 1) {
            handleCapture();
        } else if (index === 2) {
            onSave();
        } else if (index === 3) {
            onDelete();
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
                {menuItems.map((item, index) => (
                    <ListItem key={index} onClick={() => handleListItemClick(index)} sx={{cursor: "pointer", width: "180px", px: 2, py: 1.3 }}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </Menu>
        </Fragment>
    );
};

const menuItems = [
    { icon: <PlusOutlined />, text: "Add Tags" },
    { icon: <MailOutlined />, text: "Send Email" },
    { icon: <DownloadOutlined />, text: "Save as Contact" },
    { icon: <DeleteOutlined style={{ color: "red" }} />, text: "Remove", style: { color: "red" } },
];

export default ContactOptions;
