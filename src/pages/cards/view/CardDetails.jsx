import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { CopyOutlined, DeleteOutlined, FilePdfOutlined, QrcodeOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import MainCard from "../../../components/MainCard";
import TabBar from "./tab/TabBar";
import { useRef, useState } from "react";
import TabPanel from "./tab/TabPanel";
import QrExportView from "../../../components/Card/QrExportView";
import html2canvas from "html2canvas";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader, updateCards } from "../../../store/reducers/app";
import { cloneBizcard, deleteCard } from "../../../network/service/cardService";
import ConfirmDialog from "../../../components/dialogs/ConfirmDialog";
import { showUpgradeInfo } from "../../../utils/snackbar-utils";

const CardDetails =()=>{

    const dispatch = useDispatch();
    const cardAnalytics = useSelector((state)=>state.app.cardAnalytics);
    const navigate = useNavigate();

    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(false);

    const handleChange = (_, newValue) => {
        if(newValue==3){
            if(cardAnalytics){
                setValue(newValue);
            }else{
                showUpgradeInfo(navigate, "Upgrade your account to view Card analytics!")
            }
        }else{
            setValue(newValue);
        }
    };

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const cardId = queryParams.get('cardId');

    const cards = useSelector((state) => state.app.cards);
    const [cardData, setCardData] = useState(cards.find((item)=>item._id===cardId));

    const componentRef = useRef();

    const captureQr = () => {
        if (componentRef.current) {
          html2canvas(componentRef.current, {useCORS: true, logging: true, letterRendering: 1,allowTaint: false}).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            var src = encodeURI(imgData);
            const link = document.createElement('a');
            link.href = src;
            link.download = `${cardData.cardName}-bizcard.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          });
        }
    };

    const handleBack =()=>{
        navigate(-1);
    }

    const createCloneClick =async(data)=>{
        dispatch(showLoader());
        const cardData = await cloneBizcard({cardId: cardId});
        dispatch(hideLoader());
        const updated = [...cards, cardData];
        dispatch(updateCards(updated))
        navigate(`/dashboard/card?cardId=${cardData._id}`);
    }

    const handleSettingsChange =(data)=>{
        const updated = {...cardData, ...data};
        const updatedCards = cards.map(item => {
            if (item._id === updated._id) {
              return { ...item, ...updated }; 
            }
            return item;
        });
        dispatch(updateCards(updatedCards));
        setCardData(updated);
    }

    const handleDelete=()=>{
        setOpen(true);
    }

    const deleteClick =async()=>{
        setOpen(false);
        await deleteCard(cardId);
        const updated = cards.filter(item=>item._id!==cardId);
        dispatch(updateCards(updated))
        navigate(`/dashboard`);
    }
    
    const handleCancel=()=>{
        setOpen(false);
    }
    
    return (
        <Box>
            <ConfirmDialog
                open={open} 
                onOk={deleteClick} 
                onCancel={handleCancel} 
                btnTxt={"Delete"}
                title={"Are you sure you want to delete?"}   
                content={`By deleting "${cardData?.cardName}" card, the people who have this card also cant view this card.`}
            />
            <QrExportView ref={componentRef} cardData={cardData} />
            <Grid container rowSpacing={1.5} columnSpacing={2.75}>
                <Grid item xs={12} justifyContent={"space-between"} display={"flex"} alignItems={"center"}> 
                    <Stack direction={"row"} alignItems={"center"}>
                        <IconButton
                            disableRipple
                            aria-label="go back"
                            onClick={handleBack}    
                            edge="start"
                            color="secondary"   
                        >
                            <FaArrowLeft/>
                        </IconButton>
                        <Typography variant="h4">{cardData?.cardName}</Typography>
                    </Stack>
                    <Stack direction={"row"}>
                        <Box sx={{ flexShrink: 0, ml: 1 }}>
                            <IconButton
                                disableRipple
                                color="secondary"
                                title="Download Free Version"
                                sx={{ color: 'text.primary', }}
                                onClick={createCloneClick}
                            >
                                <CopyOutlined />
                            </IconButton>
                        </Box>
                        <Box sx={{ flexShrink: 0, ml: 1 }}>
                            <IconButton
                                disableRipple
                                color="secondary"
                                title="Download Free Version"
                                sx={{ color: 'text.primary', }}
                                onClick={captureQr}
                            >
                                <QrcodeOutlined />
                            </IconButton>
                        </Box>
                        <Box sx={{ flexShrink: 0, ml: 1 }}>
                            <IconButton
                                disableRipple
                                color="secondary"
                                title="Download Free Version"
                                sx={{ color: 'text.primary', }}
                                onClick={handleDelete}
                            >
                                <DeleteOutlined style={{color: "red"}} />
                            </IconButton>
                        </Box>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <MainCard
                        title={
                            <Grid item xs={12}>
                                <TabBar value={value} handleChange={handleChange}/>
                            </Grid>
                        }
                    >
                        <TabPanel 
                            value={value} 
                            cardData={cardData}
                            captureQr={captureQr}
                            handleSettingsChange={handleSettingsChange}
                        />    
                    </MainCard>

                </Grid>
            </Grid>
        </Box>
    )
}

export default CardDetails;