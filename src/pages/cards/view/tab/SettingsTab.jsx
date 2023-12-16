import { EyeOutlined, LineChartOutlined, PauseOutlined, QrcodeOutlined } from "@ant-design/icons";
import { Box, Grid, ListItem, ListItemIcon, ListItemText, Switch, Typography } from "@mui/material";

const SettingsTab =({cardData})=>{
    return (
        <Grid container spacing={3} >
            <Grid item xs={12} sx={{justifyContent: "center", display: "flex"}}>
                <Box sx={{minWidth: "600px"}}>
                <ListItem>
                    <Box sx={{width: "36px"}}>
                        <ListItemIcon>
                            <EyeOutlined style={{fontSize: 20}} color="grey"/>
                        </ListItemIcon>
                    </Box>
                    <ListItemText>
                        <Typography variant="body1" fontSize={16}>View Qr code in card</Typography>
                        <Typography variant="caption" color={"grey"}>Share your card with qr code.</Typography>
                    </ListItemText>
                    <ListItemIcon>
                        <Switch/>
                    </ListItemIcon>
                </ListItem>
                </Box>
            </Grid>
            <Grid item xs={12} sx={{justifyContent: "center", display: "flex"}}>
                <Box sx={{minWidth: "600px"}}>
                <ListItem>
                    <Box sx={{width: "36px"}}>
                        <ListItemIcon>
                            <QrcodeOutlined style={{fontSize: 20}} color="grey"/>
                        </ListItemIcon>
                    </Box>
                    <ListItemText>
                        <Typography variant="body1" fontSize={16}>Show logo in Qr code</Typography>
                        <Typography variant="caption" color={"grey"}>Personalized qr code with the card logo.</Typography>
                    </ListItemText>
                    <ListItemIcon>
                        <Switch/>
                    </ListItemIcon>
                </ListItem>
                </Box>
            </Grid>
            <Grid item xs={12} sx={{justifyContent: "center", display: "flex"}}>
                <Box sx={{minWidth: "600px"}}>
                <ListItem>
                    <Box sx={{width: "36px"}}>
                        <ListItemIcon>
                            <PauseOutlined style={{fontSize: 20}} color="grey"/>
                        </ListItemIcon>
                    </Box>
                    <ListItemText>
                        <Typography variant="body1" fontSize={16}>Pause card</Typography>
                        <Typography variant="caption" color={"grey"}>You can disable this card, and you can enable at anytime.</Typography>
                    </ListItemText>
                    <ListItemIcon>
                        <Switch/>
                    </ListItemIcon>
                </ListItem>
                </Box>
            </Grid>
            <Grid item xs={12} sx={{justifyContent: "center", display: "flex"}}>
                <Box sx={{minWidth: "600px"}}>
                <ListItem>
                    <Box sx={{width: "36px"}}>
                        <ListItemIcon>
                            <LineChartOutlined style={{fontSize: 20}} color="grey"/>
                        </ListItemIcon>
                    </Box>
                    <ListItemText>
                        <Typography variant="body1" fontSize={16}>Track card</Typography>
                        <Typography variant="caption" color={"grey"}>Track your card, generate analytics.</Typography>
                    </ListItemText>
                    <ListItemIcon>
                        <Switch/>
                    </ListItemIcon>
                </ListItem>
                </Box>
            </Grid>
        </Grid>
    )
}

export default SettingsTab;