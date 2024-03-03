import { Box, Button, CircularProgress, Divider, InputAdornment, ListItem, ListItemIcon, ListItemText, OutlinedInput, Stack, Switch, Typography } from "@mui/material";
import MainCard from "../../components/MainCard";
import { CheckOutlined, CloseOutlined, CopyOutlined, DeleteOutlined, LinkOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { MdOutlineWavingHand } from "react-icons/md";
import { BsEyeglasses } from "react-icons/bs";
import ConfirmDialog from "../../components/dialogs/ConfirmDialog";
import { useEffect, useState } from "react";
import { deleteAccount, personalizedLinkCheck, updateBranding, updateFollowUp, updatePersonalizedLink } from "../../network/service/userService";
import { useNavigate } from "react-router-dom";
import { clearCookies } from "../../utils/utils";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader, updateAppUser } from "../../store/reducers/app";
import { forgotPassword } from "../../network/service/authService";
import { useSelector } from "react-redux";
import SuccessDialog from "../../components/dialogs/SuccessDialog";
import { debounce } from "lodash";
import { useDebounce } from 'use-debounce';
import { showSnackbar } from "../../utils/snackbar-utils";

const AccountSettings = ()=>{

    const [open, setOpen] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state)=>state.app.user);

    const [link, setLink] = useState(user.personalizedLink??'');
    const [linkToSearch] = useDebounce (link, 300);
    const [linkState, setLinkState] = useState(null);

    const handleDelete=async()=>{
        dispatch(showLoader());
        await deleteAccount();
        clearCookies();
        dispatch(hideLoader());
        navigate('/loading');
    }

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

    useEffect(() => {
        if(linkToSearch==user.personalizedLink){
            setLinkState(null)
        }else if (linkToSearch.trim() !== '') {
            checkDomainIsAvailable();
        }
      }, [linkToSearch]);

    const handleLinkChange = async(e)=>{
        setLink(e.target.value)
    }

    const handleSave = async()=>{
        const updated = {...user, personalizedLink: link};
        setLinkState(null);
        dispatch(updateAppUser(updated));
        await updatePersonalizedLink(link);
    }

    const handleCancel = ()=>{
        setLink(user.personalizedLink);
        setLinkState(null);
    }

    const sendPasswordReset =async()=>{
        dispatch(showLoader());
        await forgotPassword({email: user.email});
        dispatch(hideLoader());
        setOpenSuccess(true);
    }

    const handleFollowUp = async(value)=>{
        const updated = {...user, followUp: value};
        dispatch(updateAppUser(updated));
        await updateFollowUp(value);
    }

    const handleBranding = async(value)=>{
        const updated = {...user, branding: value};
        dispatch(updateAppUser(updated));
        await updateBranding(value);
    }

    return (
        <MainCard>
            <ConfirmDialog
                open={open} 
                onOk={handleDelete} 
                onCancel={()=>setOpen(false)} 
                btnTxt={"Delete"}
                title={"Are you sure you want to delete?"}   
                content={`By deleting account, you will lose all your data. All cards created will be disabled.`}
            />
            <SuccessDialog
                open={openSuccess}
                onOk={()=>setOpenSuccess(false)} 
                btnTxt={"Done"}
                title={"Reset mail sent successfully!"}   
                content={`Password reset link sent to the registered email address.`}
            />

            <ListItem>
                <Box sx={{ width: "56px" }}>
                    <ListItemIcon><LinkOutlined style={{fontSize: 24}}/></ListItemIcon>
                </Box>
                <ListItemText>
                    <Typography variant="body1" fontSize={16} sx={{mb: 1}}>
                    Personalized Url <CopyOutlined style={{
                        marginLeft: "10px", 
                        cursor: "pointer"
                    }} onClick={async()=>{
                        await navigator.clipboard.writeText(`https://bizcard.co/${link}`);
                        showSnackbar("Profile url is copied!", { variant: 'success' });
                    }}/>
                    </Typography>
                    <OutlinedInput
                        id="link"
                        type="text"
                        name="cardName"
                        startAdornment={
                            <InputAdornment position="start" sx={{ mr: -1 }}>
                              <Typography>bizcard.co/</Typography>
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
            <Divider sx={{my: 2}}/>
            <ListItem>
                <Box sx={{ width: "56px" }}>
                    <ListItemIcon><MdOutlineWavingHand style={{fontSize: 24}}/></ListItemIcon>
                </Box>
                <ListItemText>
                    <Typography variant="body1" fontSize={16}>
                    Follow up
                    </Typography>
                    <Typography variant="caption" color={"grey"}>
                    Send auto intro email to connected user.
                    </Typography>
                </ListItemText>
                <ListItemIcon>
                    <Switch
                        checked={user.followUp}
                        onChange={(e) => {
                            const { checked } = e.target;
                            handleFollowUp(checked);
                        }}
                    />
                </ListItemIcon>
            </ListItem>
            <Divider sx={{my: 2}}/>
            <ListItem>
                <Box sx={{ width: "56px" }}>
                    <ListItemIcon><BsEyeglasses style={{fontSize: 30}}/></ListItemIcon>
                </Box>
                <ListItemText>
                    <Typography variant="body1" fontSize={16}>
                    Remove Branding
                    </Typography>
                    <Typography variant="caption" color={"grey"}>
                    Remove Bizcard brand logo from your cards.
                    </Typography>
                </ListItemText>
                <ListItemIcon>
                    <Switch
                        checked={!user.branding}
                        onChange={(e) => {
                            const { checked } = e.target;
                            handleBranding(!checked);
                        }}
                    />
                </ListItemIcon>
            </ListItem>
            <Divider sx={{my: 2}}/>
            <ListItem>
                <Box sx={{ width: "56px" }}>
                    <ListItemIcon><LockOutlined style={{fontSize: 24}}/></ListItemIcon>
                </Box>
                <ListItemText>
                    <Typography variant="body1" fontSize={16}>
                    Reset Password
                    </Typography>
                    <Typography variant="caption" color={"grey"}>
                    Password reset email will be sent.
                    </Typography>
                </ListItemText>
                <ListItemIcon>
                    <Button variant="contained" sx={{width: "136px"}} onClick={()=>sendPasswordReset()} >Send Reset Mail</Button>
                </ListItemIcon>
            </ListItem>
            <Divider sx={{my: 2}}/>
            <ListItem>
                <Box sx={{ width: "56px" }}>
                    <ListItemIcon><MailOutlined style={{fontSize: 24}}/></ListItemIcon>
                </Box>
                <ListItemText>
                    <Typography variant="body1" fontSize={16}>
                    Verify email
                    </Typography>
                    <Typography variant="caption" color={"grey"}>
                    Get a verfied badge.
                    </Typography>
                </ListItemText>
                <ListItemIcon>
                    <Button variant="contained" sx={{width: "136px"}} onClick={()=>setOpen(true)} >Verify</Button>
                </ListItemIcon>
            </ListItem>
            <Divider sx={{my: 2}}/>
            <ListItem>
                <Box sx={{ width: "56px" }}>
                    <ListItemIcon><DeleteOutlined style={{fontSize: 24}}/></ListItemIcon>
                </Box>
                <ListItemText>
                    <Typography variant="body1" fontSize={16}>
                    Delete Account
                    </Typography>
                    <Typography variant="caption" color={"grey"}>
                    Note: All cards will be disabled.
                    </Typography>
                </ListItemText>
                <ListItemIcon>
                    <Button variant="contained" onClick={()=>setOpen(true)} color="error">Delete</Button>
                </ListItemIcon>
            </ListItem>
        </MainCard>
    )
}

export default AccountSettings;