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
import { updateCards } from "../../../store/reducers/app";

const CardDetails =()=>{

    const dispatch = useDispatch();

    const [value, setValue] = useState(0);

    const handleChange = (_, newValue) => {
      setValue(newValue);
    };

    const navigate = useNavigate();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const cardId = queryParams.get('cardId');

    const cards = useSelector((state) => state.app.cards);
    const [cardData, setCardData] = useState(cards.find((item)=>item._id===cardId));

    const componentRef = useRef();

    const captureQr = () => {
        if (componentRef.current) {
          html2canvas(componentRef.current).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = imgData;
            link.download = `${cardData.cardName}-bizcard.png`;
            link.click();
          });
        }
      };

    const handleBack =()=>{
        navigate(-1);
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
    
    return (
        <Box>
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
                            >
                                <FilePdfOutlined />
                            </IconButton>
                        </Box>
                        <Box sx={{ flexShrink: 0, ml: 1 }}>
                            <IconButton
                                disableRipple
                                color="secondary"
                                title="Download Free Version"
                                sx={{ color: 'text.primary', }}
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