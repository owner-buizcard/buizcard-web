import { CloseOutlined, HomeOutlined } from '@ant-design/icons'
import { Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function HomeDrawer({open, onClose, handleClick}) {

  const navigate = useNavigate();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        width: '100%',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: '100%',
          backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
        },
      }}
      
    >
      <List sx={{color: "#fff", p: 2}} >
        <Stack direction={"row"} justifyContent={"space-between"}>
          <IconButton onClick={onClose}>
            <CloseOutlined style={{color: "white"}}/>
          </IconButton>
          <Button
            onClick={()=>navigate('/login')}
            variant="outlined" sx={{width: "80px", borderColor: "white", borderRadius: "30px", fontWeight: 600, color: "white"}}>LOGIN</Button>
        </Stack>
        <ListItemButton onClick={()=>handleClick("home")} sx={{justifyContent: "center", my: 2}}>
          <Typography sx={{fontWeight: "500", fontSize: "20px"}}>Home</Typography>
        </ListItemButton>
        <Divider sx={{borderColor: "#afafaf"}}/>
        <ListItemButton onClick={()=>handleClick("features")} sx={{justifyContent: "center", my: 2}}>
          <Typography sx={{fontWeight: "500", fontSize: "20px"}}>Features</Typography>
        </ListItemButton>
        <Divider sx={{borderColor: "#afafaf"}}/>
        <ListItemButton onClick={()=>handleClick("pricing")} sx={{justifyContent: "center", my: 2}}>
          <Typography sx={{fontWeight: "500", fontSize: "20px"}}>Pricing</Typography>
        </ListItemButton>
        <Divider sx={{borderColor: "#afafaf"}}/>
        <ListItemButton onClick={()=>handleClick("testimonials")} sx={{justifyContent: "center", my: 2}}>
          <Typography sx={{fontWeight: "500", fontSize: "20px"}}>Testimonials</Typography>
        </ListItemButton>
        <Divider sx={{borderColor: "#afafaf"}}/>
        <ListItemButton onClick={()=>handleClick("faq")} sx={{justifyContent: "center", my: 2}}>
          <Typography sx={{fontWeight: "500", fontSize: "20px"}}>FAQ</Typography>
        </ListItemButton>
        <Divider sx={{borderColor: "#afafaf"}}/>
        <ListItemButton onClick={()=>handleClick("contact")} sx={{justifyContent: "center", my: 2}}>
          <Typography sx={{fontWeight: "500", fontSize: "20px"}}>Contact Us</Typography>
        </ListItemButton>
      </List>
    </Drawer>
  )
}

export default HomeDrawer