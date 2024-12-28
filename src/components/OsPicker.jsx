import { InfoCircleFilled } from "@ant-design/icons";
import { Box, ListItem, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";

const OSPicker = ({value, onChange, platform})=>{

    const options = platform == "Gmail"
        ? [
            { label: "Web", icon: "web_icon", enabled: true },
            { label: "Mac", icon: "mac_icon", enabled: false },
            { label: "Mobile", icon: "mobile_icon", enabled: false },
            { label: "Windows", icon: "windows_icon", enabled: false }
        ]
        : platform == "Outlook"
        ? [
            { label: "Web", icon: "web_icon", enabled: true },
            { label: "Mac", icon: "mac_icon", enabled: true },
            { label: "Windows", icon: "windows_icon", enabled: true },
            { label: "Mobile", icon: "mobile_icon", enabled: false },
        ]
        : platform == "Apple"
        ? [
            { label: "Mac", icon: "mac_icon", enabled: true },
            { label: "Mobile", icon: "mobile_icon", enabled: true },
            { label: "Web", icon: "web_icon", enabled: false },
            { label: "Windows", icon: "windows_icon", enabled: false }
        ]
        : null

    return (
        <Stack direction={"column"} spacing={1}>
            <Typography variant="h6" sx={{color: "gray"}}>OS</Typography>
            <Stack direction={"row"} spacing={2}>
                
                {
                    options!=null
                    ? options?.map((option)=>(
                        <Box 
                        onClick={option.enabled ? ()=>onChange(option.label): null}
                        sx={{ 
                            border: value==option.label ? "2px solid blue": "1px solid lightgray", 
                            borderRadius: "5px", 
                            background: value==option.label ? "#efefef": null,
                            color: !option.enabled ? "lightgray": null,
                            p: "8px 12px 6px 12px", 
                            alignContent: "center",
                            cursor: "pointer" 
                        }}> 
                            <Typography variant="h6" sx={{fontWeight: value==option.label ? 900: null}}>{option.label}</Typography>
                        </Box>
                    ))
                    : <ListItem
                        sx={{
                            background: "#efefef",
                        }}
                    >
                        <ListItemIcon>
                            <InfoCircleFilled/>
                        </ListItemIcon>
                        <ListItemText>
                        Email signatures work with any platform that supports HTML and text insertion.
                        </ListItemText>
                    </ListItem>
                }
            </Stack>
        </Stack>
    )
}

export default OSPicker;