import { Box, Button, Chip, ListItem, ListItemText, Stack, Typography } from "@mui/material"
import MainCard from "../../../components/MainCard"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import PaymentButton from "../../../components/PaymentButton";
import { useNavigate } from "react-router-dom";
import { sub } from "date-fns";
import { formatDate, formatDateMin } from "../../../utils/utils";

const PaymentTab =()=>{

    const navigate = useNavigate();

    const subs = useSelector((state)=>state.app.subs);


    return (
        <MainCard
            title={
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography sx={{my: 3}} variant="subtitle1">Your subscription</Typography>
                    <Box>
                        <Button variant="contained" onClick={()=>navigate('/profile/pricing')}>Subscribe Now</Button>
                    </Box>
                </Stack>
            }
            headerBorder
        >
            <Typography sx={{mb: 2, fontWeight: 500}} variant="h5" >Current Plan</Typography>
            {
                subs?.current?.map((i)=>{
                    return (
                        <MainCard key={i.subscriptionId}>
                            <ListItem >
                                <ListItemText>
                                    <Typography variant="h4">{i.name}</Typography>
                                </ListItemText>
                                <Typography variant="h5" sx={{fontWeight: 500}}>{`${formatDate(i.startAt)} - ${formatDate(i.endAt)}`}</Typography>
                                <Box sx={{m: 2}}/>
                                <Chip
                                    label={i.duration}
                                    clickable
                                />
                            </ListItem>
                        </MainCard>
                    )
                })
            }

            { subs?.upcoming && subs.upcoming.length>0 && <Typography sx={{mt: 3, mb: 2, fontWeight: 500}} variant="h5" >Upcoming Plans</Typography> }
            {
                subs?.upcoming.map((i)=>{
                    return (
                        <MainCard key={i.subscriptionId} sx={{mb: 2}}>
                            <ListItem >
                                <ListItemText>
                                    <Typography variant="h4">{i.name}</Typography>
                                </ListItemText>
                                <Typography variant="h5" sx={{fontWeight: 500}}>{`${formatDate(i.startAt)} - ${formatDate(i.endAt)}`}</Typography>
                                <Box sx={{m: 2}}/>
                                <Chip
                                    label={i.duration}
                                    clickable
                                />
                            </ListItem>
                        </MainCard>
                    )
                })
            }
            
        </MainCard>
    )
}

export default PaymentTab;