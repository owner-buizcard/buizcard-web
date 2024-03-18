import { ExportOutlined } from "@ant-design/icons";
import { Box, IconButton, ListItem, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { showSnackbar, showUpgradeInfo } from "../../utils/snackbar-utils";
import { exportContacts } from "../../network/service/contactService";
import { useNavigate } from "react-router-dom";

const ExportOptions =({contactIds, disabled, style, onExportToCsv, onExportToExcel})=>{

    const config = useSelector((state)=>state.app.configs);
    const user = useSelector((state)=>state.app.user);
    const navigate = useNavigate();

    const isEnabled = useSelector((state)=>state.app.enableExport);

    var integrations = config?.find((item)=>item['key']=="Integrations")['value']??[];
    integrations = integrations?.filter((item)=>item['group']=="CRM" && user.integrations?.includes(item['id']))??[];

    integrations = [ 
        {name: "Excel", id: "excel", image: "https://firebasestorage.googleapis.com/v0/b/bizcard-spiderlingz.appspot.com/o/app_icons%2Fexcel.png?alt=media&token=a54a4f0e-7431-4294-bb62-9274a528ef7e"}, 
        {name: "CSV", id: "csv", image: "https://firebasestorage.googleapis.com/v0/b/bizcard-spiderlingz.appspot.com/o/app_icons%2Fcsv.png?alt=media&token=9d342e95-aa6b-488a-b699-7fd19d248720"}, 
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
    
    const handleOptionClick = async(option) => {
        if(!isEnabled){
            showUpgradeInfo(navigate, "Upgrade your account to use this feature!")
            return;
        }
        showSnackbar(`Exporting contacts to ${option['name']}`, { variant: 'success' }); 
        handleClose();
        if(option['id']=='zoho_crm'){
            await exportContacts(contactIds,'zoho');
        }else if(option['id']=='hubspot_crm'){
            await exportContacts(contactIds,'hubspot');
        }else if(option['id']=='spreadsheet'){
            await exportContacts(contactIds,'spreadsheet');
        }else if(option['id']=='csv'){
            onExportToCsv();
        }else {
            onExportToExcel();
        }
    };

    return (
        <Box sx={{ flexShrink: 0 }}>
            <IconButton
                disabled={disabled}
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
                <ExportOutlined />
            </IconButton>
            <Menu
                id="popup-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {
                    integrations.map((item)=>{
                        return <MenuItem key={item['id']} onClick={() => handleOptionClick(item)}>
                            <ListItem>
                                <ListItemIcon>
                                    <Box component={'img'} src={item['image']} width={36}/>
                                </ListItemIcon>
                                <Box width={20}/>
                                <ListItemText primary={`Export to ${item['name']}`} />
                            </ListItem>
                        </MenuItem>
                    })
                }
            </Menu>
        </Box>
    )
}

export default ExportOptions;