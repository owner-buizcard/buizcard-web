import { Avatar, Badge, Box, Button, Dialog, Grid, IconButton, List, ListItem, ListItemText, OutlinedInput, Radio, Stack, Typography } from "@mui/material";
import MainCard from "../MainCard";
import { formCardLink } from "../../utils/utils";
import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux";
import { HiCheckBadge } from "react-icons/hi2";
import { useState } from "react";
import AnimateButton from "../@extended/AnimateButton";

const CardsDialog =({open, handleCancel, cardId})=>{

    const theme = useTheme();

    const cardLink = formCardLink(cardId);
    const cards = useSelector((state)=>state.app.cards);

    const [selected, setSelected] = useState(null);

    return (
        <Dialog 
            open={open} 
            onClose={handleCancel} 
            fullWidth 
            sx={{
                "& .MuiDialog-container": {
                "& .MuiPaper-root": {
                    width: "100%",
                    maxWidth: "440px",
                },
                },
            }}
        >
            <MainCard
                title={
                    <Typography variant="h5">Share Your Card</Typography>
                }
                borderRadius={1}
                headerBorder
            >
                <Stack sx={{flexGrow: 1}} spacing={0}>

                <List>
                    {
                        cards?.map((card)=>(
                            <AnimateButton key={card._id}>
                                <ListItem
                                    key={card._id}
                                    onClick={()=>setSelected(card)}
                                    sx={{
                                        border: `1px solid ${theme.palette.grey[300]}`,
                                        borderRadius: '3px',
                                        mb: 2,
                                        cursor: "pointer"
                                    }}
                                >
                                    <Avatar sx={{mr: 2}} src={card?.picture}/>
                                    <ListItemText>
                                        <Typography variant="body1">{card?.name?.firstName} {card?.name?.middleName} {card?.name?.lastName}</Typography>
                                        <Typography variant="caption" color={"grey"}>{card?.cardName}</Typography>
                                    </ListItemText>
                                    { selected==card && <HiCheckBadge style={{fontSize: "24px"}}/> }
                                </ListItem>
                            </AnimateButton>
                        ))
                    }
                </List>

                <Stack direction={"row"} justifyContent={"end"} spacing={3}>
                    <Button variant="text" onClick={()=>handleCancel()}>Skip</Button>
                    <Button variant="contained" sx={{px: 3}} disabled={selected==null}>Share</Button>
                </Stack>


                </Stack>

            </MainCard>
        </Dialog>
    )
}

export default CardsDialog;