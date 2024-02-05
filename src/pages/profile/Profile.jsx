import { Grid } from "@mui/material";
import MainCard from "../../components/MainCard";
import ProfileNav from "./ProfileNav";
import PersonalInfoTab from "./tabs/PersonalInfoTab";
import PaymentTab from "./tabs/PaymentTab";
import { useState } from "react";

const Profile = ()=>{

    const [selected, setSelected] = useState(0);

    const handleTabChange=(index)=>{
        setSelected(index)
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
                <ProfileNav index={selected} onChange={handleTabChange}/>
            </Grid>
            <Grid item xs={12} md={9}>
                { selected == 0 
                    ? <PersonalInfoTab/>
                    : <PaymentTab/> }
            </Grid>
        </Grid>
    )
}

export default Profile;