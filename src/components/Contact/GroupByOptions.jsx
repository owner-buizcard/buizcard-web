import { EditOutlined, FilterOutlined, HistoryOutlined, ScanOutlined } from "@ant-design/icons";
import { Box, IconButton, ListItem, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useRef, useState } from "react";
import { showSnackbar } from "../../utils/snackbar-utils";

const GroupByOptions =({style, onClick})=>{

    const options = [ 
        {name: "Scanned", id: "scanned", icon: <ScanOutlined style={{fontSize: "18px"}}/>}, 
        {name: "Manual", id: "manual", icon: <EditOutlined style={{fontSize: "18px"}}/>}, 
        {name: "Recents", id: "recents", icon: <HistoryOutlined style={{fontSize: "18px"}}/>}
    ]

    const [anchorEl, setAnchorEl] = useState(null);
    const anchorRef = useRef(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const handleOptionClick = async(option) => {

        showSnackbar(`Exporting contacts to ${option['name']}`, { variant: 'success' }); 
        handleClose();
        onClick(option['id']);
    };

    return (
        <Box sx={{ flexShrink: 0 }}>
            <IconButton
                component="span"
                disableRipple
                sx={style ?? {
                    bgcolor: open ? 'grey.300' : 'white'
                }}
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
            >
                <FilterOutlined />
            </IconButton>
            <Menu
                id="popup-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {
                    options.map((item)=>{
                        return <MenuItem key={item['id']} onClick={() => handleOptionClick(item)}>
                            <ListItem>
                                <ListItemIcon>
                                    {item['icon']}
                                </ListItemIcon>
                                <ListItemText primary={`${item['name']}`} />
                            </ListItem>
                        </MenuItem>
                    })
                }
            </Menu>
        </Box>
    )
}

export default GroupByOptions;