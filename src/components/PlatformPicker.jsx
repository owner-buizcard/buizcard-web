import { Box, Stack, Typography } from "@mui/material";

const PlatformPicker = ({value, onChange})=>{

    const options = ["Gmail", "Outlook", "Apple", "Other"];

    return (
        <Stack direction={"column"} spacing={1}>
            <Typography variant="h6" sx={{color: "gray"}}>Mail App</Typography>
            <Stack direction={"row"} spacing={2}>
                {
                    options.map((option)=>(
                        <Box 
                        onClick={()=>onChange(option)}
                        sx={{ 
                            border: value==option ? "2px solid blue": "1px solid lightgray", 
                            borderRadius: "5px", 
                            background: value==option ? "#efefef": null,
                            p: "8px 12px 6px 12px", 
                            alignContent: "center",
                            cursor: "pointer" 
                        }}> 
                            <Typography variant="h6" sx={{fontWeight: value==option ? 900: null}}>{option}</Typography>
                        </Box>
                    ))
                }
            </Stack>
        </Stack>
    )
}

export default PlatformPicker;