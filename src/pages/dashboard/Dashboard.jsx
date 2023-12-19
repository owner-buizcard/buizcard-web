import { Box, Button, Grid, Typography } from "@mui/material"
import CardItem from "../../components/Card/CardItem";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { createBizcard, deleteCard } from "../../network/service/cardService";
import { hideLoader, showLoader, updateCards } from "../../store/reducers/app";
import ConfirmDialog from "../../components/dialogs/ConfirmDialog";
import { useState } from "react";
import CreateCardDialog from "../../components/dialogs/CreateCardDialog";

const Dashboard = () => {

  const navigate = useNavigate();

  const cards = useSelector((state)=>state.app.cards)??[];

  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  const [cardItemLoading, setCardItemLoading] = useState(null);
  
  const dispatch = useDispatch();

  const openCardDetails =(cardId)=>{
    navigate(`/dashboard/card-details?cardId=${cardId}`);
  }

  const handleDelete=(id)=>{
    const itemToDelete = cards.find(item=>item._id==id);
    setDeleteItem(itemToDelete);
    setOpen(true);

  }

  const handleCancel=()=>{
    setDeleteItem(null);
    setOpen(false);
  }

  const deleteClick =async()=>{
    setOpen(false);
    setCardItemLoading(deleteItem._id);
    await deleteCard(deleteItem._id);
    const updated = cards.filter(item=>item._id!==deleteItem._id);
    setCardItemLoading(null);
    dispatch(updateCards(updated))
  }

  const createClick =async(data)=>{
    setOpenCreate(false);
    dispatch(showLoader());
    const cardData = await createBizcard(data);
    dispatch(hideLoader());
    const updated = [...cards, cardData];
    dispatch(updateCards(updated))
    navigate(`/dashboard/card?cardId=${cardData._id}`);
  }

  return (
    <Box>
      <CreateCardDialog
        open={openCreate} 
        onCancel={()=>setOpenCreate(false)} 
        onOk={createClick}
      />
      <ConfirmDialog 
        open={open} 
        onOk={deleteClick} 
        onCancel={handleCancel} 
        btnTxt={"Delete"}
        title={"Are you sure you want to delete?"}   
        content={`By deleting "${deleteItem?.cardName}" card, the people who have this card also cant view this card.`}
      />
      <Grid container rowSpacing={2.5} columnSpacing={2.75}>

        <Grid item xs={8} sx={{ mb: 0 }}>
          <Typography variant="h4">My Cards</Typography>
        </Grid>
        <Grid item xs={4} justifyContent={"end"} display={"flex"}>
          <Button variant="contained" size="medium" sx={{px: 4}} 
            onClick={()=>setOpenCreate(true)}
            startIcon={
              <PlusOutlined style={{fontSize: "16px"}}/>
            }>
            Add Card
          </Button>
        </Grid>
        {
          cards.map((item)=>{
            return (
              <Grid key={item._id} item xs={12} sm={6} md={4} lg={4}>
                <CardItem
                  key={item._id}
                  cardData={item}
                  handlePreviewClick={()=>openCardDetails(item._id)}
                  handleDeleteClick={()=>handleDelete(item._id)}
                  isLoading={cardItemLoading==item._id}
                />
              </Grid>
            )
          })
        }
      </Grid>
    </Box>
  )
}

export default Dashboard