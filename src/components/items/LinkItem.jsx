import { DeleteOutlined, HolderOutlined } from "@ant-design/icons";
import { useTheme } from "@emotion/react";
import { Avatar, Box, IconButton, ListItem, ListItemIcon, Stack, Switch, Typography } from "@mui/material";

const LinkItem =({value, onRemove, onChangeHighlight})=>{
    const theme = useTheme();

    return (
        <Box
            sx={{
                border: `1px solid ${theme.palette.grey[200]}`,
                borderRadius: "3px",
                marginBottom: "16px"
            }}
        >
            <ListItem>
                <ListItemIcon>
                    <HolderOutlined />
                </ListItemIcon>
                <Stack direction={"row"} spacing={2} alignItems={"center"} flexGrow={1}>
                    <ListItemIcon>
                        <Avatar src={`https://firebasestorage.googleapis.com/v0/b/bizcard-web.appspot.com/o/${value.icon}`}/>
                    </ListItemIcon>
                    <Typography variant="subtitle1">{value.title}</Typography>
                </Stack>
                { !value.highlight && <ListItemIcon>
                    <IconButton onClick={onRemove}>
                        <DeleteOutlined/>
                    </IconButton>
                </ListItemIcon> }
                <ListItemIcon onClick={onChangeHighlight}>
                    <Switch checked={value.highlight}/>
                </ListItemIcon>
            </ListItem>
        </Box>
    )
}

export default LinkItem;