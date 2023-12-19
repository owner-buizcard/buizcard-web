import { Box, CircularProgress } from "@mui/material";

const WindowLoader =()=>(
    <Box
        sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1400,
          }}
        >
          <CircularProgress sx={{ color: 'white' }} />
    </Box>
)

export default WindowLoader;