import { Button, CircularProgress, Dialog,OutlinedInput, Stack, Typography } from "@mui/material";
import MainCard from "../MainCard";
import { useEffect, useState } from "react";
import { addNotes } from "../../network/service/connectService";

const AddNotesDialog =({open, handleCancel, onAdded, contact})=>{

    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (contact && contact.notes) {
            setNotes(contact.notes);
        }
    }, [contact]);

    const updateTags = async()=>{
        setLoading(true);
        const updated = await addNotes(contact?._id, notes);
        setLoading(false);
        onAdded(updated);
    }

    return ( 
        <Dialog open={open}>
            <MainCard
                title={
                    <Typography variant="h5">{`Add Notes`}</Typography>
                }
                borderRadius={1}
                headerBorder
                sx={{minWidth: "600px" }}
            >
                    <Stack spacing={3} px={4}>
                        <OutlinedInput
                            id="link-description"
                            type="text"
                            name="tags"
                            minRows={5}
                            multiline
                            value={notes}
                            onChange={(e)=>setNotes(e.target.value)}
                            placeholder="Enter notes"
                        />

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

export default AddNotesDialog;