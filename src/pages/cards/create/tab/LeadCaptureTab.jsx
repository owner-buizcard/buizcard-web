import { Box, Button, Grid, IconButton, InputAdornment, ListItemIcon, OutlinedInput, Stack, Switch, Typography, colors } from "@mui/material";
import MainCard from "../../../../components/MainCard";
import { useDispatch } from "react-redux";
import { updateCardData } from "../../../../store/reducers/card-builder";
import { useSelector } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";
import { useState } from "react";
import AddFieldDialog from "../../../../components/dialogs/AddFieldDialog";
import { showUpgradeInfo } from "../../../../utils/snackbar-utils";
import { useNavigate } from "react-router-dom";


const LeadCaptureTab =()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cardData = useSelector((state) => state.cardBuilder.cardData);
    const isEnabled = useSelector((state) => state.app.leadCapture);

    const enabled = !(cardData?.captureForm?.enable && isEnabled);

    const [open, setOpen] = useState(false);

    const handleSwitch=(e)=>{
      if(!isEnabled){
        showUpgradeInfo(navigate, "Upgrade your account to use this feature!")
        return;
      }
      dispatch(updateCardData({path: "captureForm.enable", value: e.target.checked}))
    }

    const handleCancel=()=>{
      setOpen(false);
    }

    const handleChange = (idx, item) => {
      const newFields = [...cardData?.captureForm?.fields];
      newFields[idx] = { ...newFields[idx], ...item };
      dispatch(updateCardData({path: "captureForm.fields", value: newFields}));
    };

    const addField = (item)=>{
      const updated = [ ...cardData?.captureForm?.fields??[] ];
      updated.push(item)
      dispatch(updateCardData({path: "captureForm.fields", value: updated}));
      setOpen(false)
    }

    const handleRemove = (idx)=>{
      const updated = [ ...cardData?.captureForm?.fields??[] ];
      updated.splice(idx, 1)
      dispatch(updateCardData({path: "captureForm.fields", value: updated}));
    }

    return ( 
        <Stack spacing={2} my={3}>
            <AddFieldDialog
              open={open}
              onCancel={handleCancel}
              onOk={(e)=>{
                console.log(e)
                addField(e)
              }}
            />
            <MainCard
                borderRadius={1}
                headerBorder
                title={<>
                <Stack direction={"row"} justifyContent={"space-between"}>
                    <Box>
                    <Typography variant="subtitle1" >Lead Capture Mode</Typography>
                    <Typography sx={{fontSize: '12px', mt: 0.2}}>When lead capture mode is enabled, the lead form will popup as soon as your profile is shared</Typography>
                    </Box>
                    <ListItemIcon onClick={(e)=>{}}>
                        <Switch 
                          checked={cardData?.captureForm?.enable && isEnabled} 
                          onClick={ (e)=>handleSwitch(e)}/>
                    </ListItemIcon>
                </Stack>
                </>}
            >
                <Grid container spacing={3} >
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <Typography variant="subtitle1" sx={{fontWeight: 500, color: enabled?"grey":null}}>Form Header</Typography>
                      <OutlinedInput
                            id="city"
                            type="text"
                            name="city"
                            disabled={enabled}
                            placeholder="Share Your Information"
                            value={cardData?.captureForm?.header}
                            onChange={(event)=>{
                              dispatch(updateCardData({path: "captureForm.header", value: event.target.value}))
                            }}
                            fullWidth
                        />
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                      <Typography variant="subtitle1" sx={{fontWeight: 500, color: enabled?"grey":null}}>Input Fields</Typography>
                      <Button disabled={enabled} variant="contained" sx={{minWidth: '116px', borderRadius: "26px", height: "34px"}} onClick={()=>setOpen(true)}>Add Field</Button>
                    </Stack>
                  </Grid>
                  {
                    cardData?.captureForm?.fields?.map((i, idx)=>{
                      return (
                        <Grid item xs={12} key={i.label}>
                          <OutlinedInput
                                id="city"
                                type="text"
                                name="city"
                                disabled={enabled}
                                placeholder="Enter Label"
                                defaultValue={i.label??""}
                                onBlur={(e)=>{
                                  console.log(e.target.value)
                                  let updated = { ...i, ...{label: e.target.value} }
                                  handleChange(idx, updated);
                                }}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <Typography sx={{color: enabled?"grey.400":null}}>Require</Typography>
                                    <Switch disabled={enabled} checked={i.isRequired} onClick={(e)=>{
                                      let updated = { ...i, ...{isRequired: e.target.checked} }
                                      handleChange(idx, updated);
                                    }}/>
                                    <IconButton disabled={enabled} onClick={()=>handleRemove(idx)}>
                                      <CloseOutlined />
                                    </IconButton>
                                  </InputAdornment>
                                }
                                fullWidth
                            />
                        </Grid>
                      )
                    })
                  }
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <Typography variant="subtitle1" sx={{fontWeight: 500, color: enabled?"grey":null}}>Form Disclaimer</Typography>
                      <OutlinedInput
                            id="city"
                            type="text"
                            name="city"
                            disabled={enabled}
                            placeholder="Buizcard dont sell your data"
                            value={cardData?.captureForm?.disclaimer}
                            onChange={(event)=>{
                              dispatch(updateCardData({path: "captureForm.disclaimer", value: event.target.value}))
                            }}
                            fullWidth
                        />
                    </Stack>
                  </Grid>
                </Grid>
            </MainCard>
       </Stack>
    )
}

export default LeadCaptureTab;