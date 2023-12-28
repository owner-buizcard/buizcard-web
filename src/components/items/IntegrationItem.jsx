import { Box, Button, Stack, Typography } from "@mui/material";
import MainCard from "../MainCard";
import { useTheme } from "@emotion/react";

const IntegrationItem =({item})=>{

    const theme = useTheme();

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
                <Button variant="contained">
                    Connect
                </Button>
            </Stack>
        </MainCard>
    )
}

export default IntegrationItem;