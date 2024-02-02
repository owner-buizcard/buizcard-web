import { DeleteOutlined, EditOutlined, ExportOutlined, MoreOutlined } from "@ant-design/icons";
import { Box, Button, ClickAwayListener, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Paper, Popper, Typography } from "@mui/material";
import Transitions from "../@extended/Transitions";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@emotion/react";
import MainCard from "../MainCard";
import html2canvas from "html2canvas";
import { useSelector } from "react-redux";

const ExportOptions =({onExport})=>{

    const config = useSelector((state)=>state.app.configs);
    const user = useSelector((state)=>state.app.user);

    var integrations = config.find((item)=>item['key']=="Integrations")['value'];
    integrations = integrations.filter((item)=>item['group']=="CRM" && user.integrations?.includes(item['id']));

    integrations = [ 
        {name: "Excel", id: "excel", image: "https://firebasestorage.googleapis.com/v0/b/bizcard-spiderlingz.appspot.com/o/app_icons%2Fexcel.png?alt=media&token=a54a4f0e-7431-4294-bb62-9274a528ef7e"}, 
        {name: "CSV", id: "excel", image: "https://firebasestorage.googleapis.com/v0/b/bizcard-spiderlingz.appspot.com/o/app_icons%2Fcsv.png?alt=media&token=9d342e95-aa6b-488a-b699-7fd19d248720"}, 
        ...integrations 
    ]

    const [anchorEl, setAnchorEl] = useState(null);
    const anchorRef = useRef(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const handleOptionClick = (option) => {
        console.log(`Option clicked: ${option}`);
        handleClose();
    };

    return (
        <Box sx={{ flexShrink: 0 }}>
            <IconButton
                component="span"
                disableRipple
                sx={{
                    bgcolor: open ? 'grey.300' : 'white'
                }}
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
            >
                <ExportOutlined />
            </IconButton>
            <Menu
                id="popup-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {
                    integrations.map((integ)=>{
                        return <MenuItem onClick={() => handleListItemClick(e, 0)}>
                            <ListItem>
                                <ListItemIcon>
                                    <Box component={'img'} src={integ['image']} width={36}/>
                                </ListItemIcon>
                                <Box width={20}/>
                                <ListItemText primary={`Export to ${integ['name']}`} />
                            </ListItem>
                        </MenuItem>
                    })
                }
            </Menu>
        </Box>
    )
}

export default ExportOptions;