import { Box, Button, Grid, IconButton, Stack } from "@mui/material";
import MainCard from "../../../components/MainCard";
import CardPreview from "../../../components/Card/CardPreview";
import { useEffect, useState } from "react";
import TabBar from "./tab/TabBar";
import TabPanel from "./tab/TabPanel";
import EditableInput from "../../../components/@extended/EditableInput";
import { FaArrowLeft } from "react-icons/fa";
import QrCodePreview from "../../../components/Card/QrCodePreview";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateCards } from "../../../store/reducers/app";
import { initializeCardData, updateCardData } from "../../../store/reducers/card-builder";
import { useLocation, useNavigate } from "react-router-dom";
import { updateBizcard } from "../../../network/service/cardService";


const CreateCard = ()=>{

    const [value, setValue] = useState(0);

    const handleChange = (_, newValue) => {
      setValue(newValue);
    };

    const cards = useSelector((state) => state.app.cards);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const cardData = useSelector((state) => state.cardBuilder.cardData);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const cardEditId = queryParams.get('cardId');

    if(cardEditId && cardData?._id!=cardEditId){
        const editCard = cards.find((item)=>item._id===cardEditId);
        dispatch(initializeCardData(editCard));
    }

    const [updated, setUpdated] = useState({ ...cardData });

    useEffect(() => {
        setUpdated({ ...cardData });
    }, [cardData]);

    const saveCard =async ()=>{
        // const result = await saveBizcard(updated);
        // dispatch(updateCards([...cards??[], result]));
        // navigate("/dashboard");
    }

    const updateCard =async ()=>{
        const result = await updateBizcard(cardEditId, updated);

        const updatedCards = cards.map(item => {
            if (item._id === result._id) {
              return { ...item, ...result }; 
            }
            return item;
        });
        dispatch(updateCards(updatedCards));
        navigate("/dashboard");
    }

    const handleBack =()=>{
        navigate(-1);
    }

    const handleCardNameChange =(name)=>{
        dispatch(updateCardData({path: "cardName", value: name}));
    }

    return (
        <Box>
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
                        <EditableInput
                            id='cardName'
                            text={updated?.cardName}
                            onChange={handleCardNameChange}
                        />
                    </Stack>
                    <div>
                        <Button variant="contained" sx={{px: 4}} onClick={cardEditId ? updateCard: saveCard}>
                            {cardEditId ? 'Update' : 'Create'}
                        </Button>
                    </div>
                </Grid>
                <Grid item xs={8}>
                    <MainCard >
                        <TabBar value={value} handleChange={handleChange}/>
                        <TabPanel value={value}/>
                    </MainCard>
                </Grid>
                <Grid item xs={4}>
                    <Stack alignItems={"center"} >
                        { value!=3 
                            ? <CardPreview 
                                cardData={updated}
                            /> 
                            : <QrCodePreview
                                cardData={updated}
                            /> 
                        }
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    )
}

export default CreateCard;