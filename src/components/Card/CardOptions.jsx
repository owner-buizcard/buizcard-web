import { DeleteOutlined, EditOutlined, ExportOutlined, MoreOutlined } from "@ant-design/icons";
import { Box, ClickAwayListener, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Paper, Popper } from "@mui/material";
import Transitions from "../@extended/Transitions";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@emotion/react";
import MainCard from "../MainCard";
import CardExportView from "./CardExportView";
import html2canvas from "html2canvas";

const CardOptions =({cardData, onDelete, onEdit})=>{

    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const componentRef = useRef();

    const theme = useTheme();

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
      };
    
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }
  
      prevOpen.current = open;
    }, [open]);

    const handleListItemClick = (event, index) => {
        if(index==0){
            onEdit();
        }else if(index==1){
            handleCapture();
        }else{
            onDelete();
        }
        setOpen(false);
    };

    const handleCapture = () => {
        if (componentRef.current) {
          html2canvas(componentRef.current).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'component.png';
            link.click();
          });
        }
      };

    return (
        <Box sx={{ flexShrink: 0, ml: 0.75 }}>
            <IconButton
                component="span"
                disableRipple
                sx={{
                    bgcolor: open ? 'grey.300' : 'grey.100'
                }}
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                color="inherit"
            >
                <MoreOutlined />
            </IconButton>
            <Popper
                sx={{zIndex: 30001}}
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: [0, -36]
                        }
                    }
                ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions type="fade" in={open} {...TransitionProps}>
                        <Paper sx={{ boxShadow: theme.customShadows.z1 }}>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MainCard elevation={0} border={false} content={false} sx={{minWidth: "130px"}}>
                                <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
                                    <ListItemButton onClick={(e)=>handleListItemClick(e, 0)}>
                                        <ListItemIcon>
                                            <EditOutlined />
                                        </ListItemIcon>
                                        <ListItemText primary="Edit" />
                                    </ListItemButton>
                                    <ListItemButton onClick={(e)=>handleListItemClick(e, 1)}>
                                        <ListItemIcon>
                                            <ExportOutlined />
                                        </ListItemIcon>
                                        <ListItemText primary="Export" />
                                    </ListItemButton>
                                    
                                    <CardExportView ref={componentRef} cardData={cardData} />

                                    <ListItemButton onClick={(e)=>handleListItemClick(e, 2)} sx={{color: "red"}}>
                                        <ListItemIcon >
                                            <DeleteOutlined style={{ color: "red" }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Delete" />
                                    </ListItemButton>
                                </List>
                            </MainCard>
                        </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </Box>
    )
}

export default CardOptions;