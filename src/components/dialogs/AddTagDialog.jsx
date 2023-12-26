import { Avatar, Box, Button, Chip, CircularProgress, Dialog, FormHelperText, InputLabel, OutlinedInput, Stack, Switch, Typography } from "@mui/material";
import MainCard from "../MainCard";
import { useEffect, useState } from "react";
import { addTags } from "../../network/service/connectService";
import { CloseOutlined } from "@ant-design/icons";

const AddTagDialog =({open, handleCancel, onAdded, contact})=>{

    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (contact && contact.tags) {
            setTags(contact.tags);
        }
    }, [contact]);


    const [tagvalue, setTagvalue] = useState('');

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !tags.includes(tagvalue)) {
            setTagvalue('');
            setTags([...tags, tagvalue]);
        }
    };

    const updateTags = async()=>{
        setLoading(true);
        const updated = await addTags(contact?._id, tags);
        setLoading(false);
        onAdded(updated);
    }

    const onDelete = async(tag)=>{
        const updated = tags.filter((item)=>item!=tag);
        setTags([...updated]);
    }

    return ( 
        <Dialog open={open}>
            <MainCard
                
                title={
                    <Typography variant="h5">{`Add Tags`}</Typography>
                }
                borderRadius={1}
                headerBorder
                sx={{minWidth: "600px" }}
            >
                    <Stack spacing={3} px={4}>
                    <Stack spacing={{ xs: 1 }} direction="row" useFlexGap flexWrap="wrap">
                        {
                            tags?.map((tag)=><Chip
                                    key={tag}
                                    label={tag}
                                    onDelete={()=>onDelete(tag)}
                                    deleteIcon={<CloseOutlined style={{fontSize: 12, padding: "6px"}}/>}
                                />
                            )
                        }
                    </Stack>
                        

                        <Stack>
                        <OutlinedInput
                            id="link-description"
                            type="text"
                            name="tags"
                            value={tagvalue}
                            disabled={tags.length==3}
                            onChange={(e)=>setTagvalue(e.target.value)}
                            placeholder="Enter tag name"
                            onKeyDown={handleKeyDown}
                        />
                       <FormHelperText id="standard-weight-helper-text-link" >
                        Click enter to add tags. You can add maximum 3 tags.
                        </FormHelperText>
                        </Stack>

                        <Stack display={"flex"} direction={"row"} spacing={2} justifyContent={"end"}>
                            <Button variant="text" size="medium" color="error" onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" size="medium" onClick={updateTags}>
                                {loading ? (
                                    <CircularProgress
                                        size="1.6rem"
                                        sx={{color: "white"}}
                                    />
                                ) : (
                                    "Add"
                                )}
                            </Button>
                        </Stack>

                    </Stack>
            </MainCard>
        </Dialog>
    )
}

export default AddTagDialog;