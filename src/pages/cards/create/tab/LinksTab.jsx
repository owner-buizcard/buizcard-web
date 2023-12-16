import { useTheme } from "@emotion/react";
import { Avatar, Box, Chip, FormControl, Grid, InputAdornment, OutlinedInput, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { generateRandomId, groupList } from "../../../../utils/utils";
import { SearchOutlined } from "@ant-design/icons";
import LinkItem from "../../../../components/items/LinkItem";
import AddLinkDialog from "../../../../components/dialogs/AddLinkDialog";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateCardData } from "../../../../store/reducers/card-builder";

const LinksTab = () => {

  const dispatch = useDispatch();

  const cardData = useSelector((state)=>state.cardBuilder.cardData)
  const config = useSelector((state)=>state.app.config)

  const theme = useTheme();
  const [fields, setFields] = useState(cardData?.fields??[]);

  const linkItems = groupList(config?.fieldTypes, "category")

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    setFields(prevFields => {
      
      const reorderedItems = Array.from(prevFields);
      const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
      reorderedItems.splice(result.destination.index, 0, reorderedItem);

      dispatch(updateCardData({ path: "fields", value: reorderedItems }));

      return reorderedItems;
    });
  };

  const [open, setOpen] = useState(false);
  const [addLinkItem, setAddLinkItem] = useState(null);

  const handleCancel =()=>{
    setOpen(false)
  }

  const openAddLink =(item)=>{
    setAddLinkItem(item);
    setOpen(true);
  }

  const handleChange =(item)=>{
    setFields(prevFields => {
      const updated = [...prevFields, {...item, id: generateRandomId()}]
      dispatch(updateCardData({ path: "fields", value: updated }));
      return updated;
    });
    setOpen(false);
  }

  const handleHighlightChange=(id)=>{
    setFields(prevFields => {
      const updated = prevFields.map(item => {
        if (item.id === id) {
          return { ...item, highlight: !item.highlight };
        }
        return item;
      });
      dispatch(updateCardData({ path: "fields", value: updated }));
      return updated;
    });
  }

  const handleRemove=(id)=>{
    setFields(prevFields => {
      const updated = prevFields.filter(item => item.id !== id);
      dispatch(updateCardData({ path: "fields", value: updated }));
      return updated;
    });
  }


  return (
    <>
      <AddLinkDialog open={open} handleCancel={handleCancel} item={addLinkItem} onAddItem={handleChange}/>
      <Grid container sx={{ my: 2 }} spacing={2}>
        <Grid item xs={6}>
          <Box
            sx={{
              borderRadius: "3px",
            }}
          >
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="list">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                    {fields.map((value, index) => (
                        <Draggable key={value.id} draggableId={value.id} index={index}>
                            {(provided) => (
                                <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                >
                                    <LinkItem 
                                      value={value}
                                      onChangeHighlight={()=>handleHighlightChange(value.id)}
                                      onRemove={()=>handleRemove(value.id)}  
                                    />
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                    </div>
                )}
                </Droppable>
            </DragDropContext>
          </Box>
        </Grid>
        <Grid item xs={6}>
            <Box sx={{border: `1px solid ${theme.palette.grey[200]}`, p: 1, borderRadius: 1}}>
                <Stack>
                    <FormControl sx={{ width: { xs: '100%' } }}>
                        <OutlinedInput
                            size="small"
                            id="header-search"
                            startAdornment={
                              <InputAdornment position="start" sx={{ mr: -0.5 }}>
                                  <SearchOutlined />
                              </InputAdornment>
                            }
                            aria-describedby="header-search-text"
                            inputProps={{
                            'aria-label': 'weight'
                            }}
                        />
                    </FormControl>
                    {
                        Array.from(linkItems).map(([key, value]) => (
                            <div key={key}>
                                <Box sx={{ margin: "16px 0 8px 2px" }}>
                                    <Typography variant="caption">{key}</Typography>
                                </Box>
                                <Stack spacing={{ xs: 1, sm: 1 }} direction="row" useFlexGap flexWrap="wrap">
                                    {
                                        value.map((val)=>(
                                            <Chip
                                                icon={<Avatar sx={{width: 24, height: 24}} src={`https://firebasestorage.googleapis.com/v0/b/bizcard-web.appspot.com/o/${val.icon}`}/>}
                                                key={val.name}
                                                label={val.label}
                                                sx={{ 
                                                    background: "#fff", 
                                                    boxShadow: "0px 2px 30px #ccc6",
                                                    borderRadius: "16px",
                                                    cursor: "pointer" 
                                                }} 
                                                onClick={()=>openAddLink(val)}
                                            />
                                        ))
                                    }
                                </Stack>
                            </div>
                        ))
                    }
                </Stack>
            </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default LinksTab;
