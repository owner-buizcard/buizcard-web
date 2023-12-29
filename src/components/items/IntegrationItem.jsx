import { Box, Button, Stack, Typography } from "@mui/material";
import MainCard from "../MainCard";
import { useTheme } from "@emotion/react";

const IntegrationItem =({userId, item, isConnected})=>{

    const theme = useTheme();

    const handleClick=()=>{
        let link = item.auth_link;
        const type = item.auth_type;

        if (link.includes('${userId}')) {
            link = link.replace('${userId}', userId);
        }

        if(type=="_blank"){
            window.open(link, "_blank")
        }
    }

    return (
        <MainCard>
            <Stack spacing={2}> 
                <Stack direction={"row"} alignItems={"center"} spacing={2}>
                    <Box width={50} height={50} sx={{p: 1, background: `${theme.palette.grey[100]}`, borderRadius: "6px"}}>
                        <Box width={"100%"} component={"img"} src={item.image}/>
                    </Box>
                    <Typography variant="h5">{item.name}</Typography>
                </Stack>
                <Box height={50}>
                    <Typography variant="body1" color={"gray"}>{item.description}</Typography>
                </Box>
                <Button variant="contained" disabled={isConnected} onClick={handleClick}>
                    {
                        isConnected ? 'Connected' : 'Connect'
                    }
                </Button>
            </Stack>
        </MainCard> 
    )
}

export default IntegrationItem;