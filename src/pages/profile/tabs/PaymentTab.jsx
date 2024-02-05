import { Typography } from "@mui/material"
import MainCard from "../../../components/MainCard"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import PaymentButton from "../../../components/PaymentButton";

const PaymentTab =()=>{

    const user = useSelector((state)=>state.app.user);
    const dispatch = useDispatch();

    return (
        <MainCard
            title={
                <Typography variant="subtitle1">Your subscription</Typography>
            }
            headerBorder
        >
            <PaymentButton planId={"plan_NX5qBC30iIf7sF"} type={"M"}/>
            

        </MainCard>
    )
}

export default PaymentTab;