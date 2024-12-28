import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Grid, InputAdornment, ListItem, ListItemIcon, ListItemText, OutlinedInput, Stack, Switch, Typography } from "@mui/material";
import { CheckOutlined, CloseOutlined, CopyOutlined, EyeOutlined, LinkOutlined, PauseOutlined, QrcodeOutlined } from "@ant-design/icons";
import { pauseCard, updatePersonalizedLink, updateQrLogo, updateQrVisible } from "../../../../network/service/cardService";
import { showUpgradeInfo } from "../../../../utils/snackbar-utils";
import { personalizedLinkCheck } from "../../../../network/service/userService";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { useSelector } from "react-redux";

const SettingsTab = ({ cardData, onChange }) => {

  const [link, setLink] = useState(cardData?.personalizedLink ?? '');
  const [linkToSearch] = useDebounce (link, 300);
  const [linkState, setLinkState] = useState(null);
  const personalizedLink = useSelector((state)=>state.app.personalizedLink);

  const navigate = useNavigate();

  useEffect(() => {
      if(linkToSearch==cardData?.personalizedLink){
          setLinkState(null)
      }else if (linkToSearch.trim() !== '') {
          checkDomainIsAvailable();
      }
    }, [linkToSearch]);

    const checkDomainIsAvailable = async (query) => {
        setLinkState("loading")
        try {
          const data = await personalizedLinkCheck(link);
          if(data){
            setLinkState("success")
          }else{
            setLinkState("error")
          }
        } catch (error) {
            setLinkState(null);
        } 
    };

  const handleSave = async()=>{
      if(!personalizedLink){
          showUpgradeInfo(navigate, "Upgrade your account to use this feature!")
          return;
      }
      setLinkState(null);
      onChange({ "personalizedLink": link });
      await updatePersonalizedLink(link, cardData._id);
  }

    
  const createState = (key, defaultValue) => {
    const initialValue =
      key === "status" ? cardData?.status === "PAUSED" : cardData?.[key] ?? defaultValue;
    const [state, setState] = useState(initialValue);
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

  const handleLinkChange = async(e)=>{
      setLink(e.target.value)
  }

  const handleCancel = ()=>{
      setLink(cardData?.personalizedLink??'');
      setLinkState(null);
  }

  
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
      <Typography variant='h5' sx={{mb: "24px"}}>Card Settings</Typography>
      <Grid container spacing={3}>

        <Grid item xs={12} sx={{ justifyContent: "center", display: "flex" }}>
        <Box sx={{ minWidth: "600px" }}>
        <ListItem>
            <Box sx={{ width: "36px" }}>
                <ListItemIcon><LinkOutlined style={{fontSize: 20}}/></ListItemIcon>
            </Box>
            <ListItemText>
                <Typography variant="body1" fontSize={16} sx={{mb: 1}}>
                Personalized Url <CopyOutlined style={{
                    marginLeft: "10px", 
                    cursor: "pointer"
                }} onClick={async()=>{
                    await navigator.clipboard.writeText(`https://buizcard.in/p/${link}`);
                    showSnackbar("Profile url is copied!", { variant: 'success' });
                }}/>
                </Typography>
                <OutlinedInput
                    id="link"
                    type="text"
                    name="cardName"
                    startAdornment={
                        <InputAdornment position="start" sx={{ mr: -1 }}>
                          <Typography>buizcard.in/p/</Typography>
                        </InputAdornment>
                    }
                    endAdornment={
                        <InputAdornment position="start" >
                            {
                                linkState == "loading"
                                ? <CircularProgress size={20}/>
                                : linkState == "error"
                                ? <CloseOutlined style={{color: "red", fontSize: "18px"}}/>
                                : linkState == "success"
                                ? <CheckOutlined style={{color: "green", fontSize: "18px"}}/> 
                                : <></> 
                            }
                        </InputAdornment>
                    }
                    value={link}
                    onChange={handleLinkChange}
                    placeholder={`xyzerd`}
                    fullWidth
                />
                {
                    linkState!=null && (
                        <Stack direction={"row"} spacing={3} justifyContent={"end"} sx={{mt: 3}}>
                            <Button sx={{minWidth: '136px'}} onClick={handleCancel}>Cancel</Button>
                            <Button disabled={linkState=="error" || linkState=="loading"} onClick={handleSave} variant="contained" sx={{minWidth: '136px'}}>Save</Button>
                        </Stack>
                    )
                }
            </ListItemText>
        </ListItem>
        </Box>
        </Grid>

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
