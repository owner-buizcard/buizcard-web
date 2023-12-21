import React, { useState } from "react";
import { Box, Grid, ListItem, ListItemIcon, ListItemText, Switch, Typography } from "@mui/material";
import { EyeOutlined, PauseOutlined, QrcodeOutlined } from "@ant-design/icons";
import { pauseCard, updateQrLogo, updateQrVisible } from "../../../../network/service/cardService";

const SettingsTab = ({ cardData, onChange }) => {
    
  const createState = (key, defaultValue) => {
    const [state, setState] = useState(cardData?.[key] ?? defaultValue);
    const updateState = async (status) => {
      setState(status);
      onChange({ [key]: status });
      await key === "status"
        ? pauseCard(status, cardData._id)
        : key === "qrVisible"
        ? updateQrVisible(status, cardData._id)
        : updateQrLogo(status, cardData._id);
    };
    return [state, updateState];
  };

  const [qrVisible, updateQrVisibleState] = createState("qrVisible", false);
  const [logoInQr, updateLogoInQrState] = createState("qrWithLogo", false);
  const [pause, updatePauseState] = createState("status", false);

  const createListItem = (icon, title, subtitle, onChange, checked) => (
    <ListItem>
      <Box sx={{ width: "36px" }}>
        <ListItemIcon>{React.cloneElement(icon, { style: { fontSize: 20, color: "grey" } })}</ListItemIcon>
      </Box>
      <ListItemText>
        <Typography variant="body1" fontSize={16}>
          {title}
        </Typography>
        <Typography variant="caption" color={"grey"}>
          {subtitle}
        </Typography>
      </ListItemText>
      <ListItemIcon>
        <Switch onChange={onChange} checked={checked} />
      </ListItemIcon>
    </ListItem>
  );

  return (
    <Box sx={{ minHeight: "calc(100vh - 280px)" }}>
      <Grid container spacing={3}>
        {[["qrVisible", "View Qr code in card", "Share your card with qr code.", updateQrVisibleState, qrVisible],
          ["qrWithLogo", "Show logo in Qr code", "Personalized qr code with the card logo.", updateLogoInQrState, logoInQr],
          ["status", "Pause card", "You can disable this card, and you can enable at any time.", updatePauseState, pause]
        ].map(([key, title, subtitle, onChange, checked]) => (
          <Grid key={key} item xs={12} sx={{ justifyContent: "center", display: "flex" }}>
            <Box sx={{ minWidth: "600px" }}>
              {createListItem(
                key === "qrVisible" ? <EyeOutlined /> : key === "qrWithLogo" ? <QrcodeOutlined /> : <PauseOutlined />,
                title,
                subtitle,
                () => onChange(!checked),
                checked
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SettingsTab;
