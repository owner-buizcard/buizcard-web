import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import IntegrationItem from "../../../components/items/IntegrationItem";

const IntegrationList = ()=>{

    const configs = useSelector((state)=>state.app.configs);
    const user = useSelector((state)=>state.app.user);

    console.log(user)

    const integrations = configs.find((con)=>con.key==="Integrations").value;
    const groupedData = integrations.reduce((acc, obj) => {
        const { group, ...rest } = obj;
        acc[group] = acc[group] || [];
        acc[group].push(rest);
        return acc;
    }, {});

    return (
        <Box>
            <Grid container >
                <Grid item xs={12}>
                    <Typography variant="h4">Integrations</Typography>
                    <Typography variant="body2">Connect platforms to assist with Bizcard lead management.</Typography>
                </Grid>

                {Object.keys(groupedData).map((group) => (
                    <Grid container key={group} spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="body1" color={"grey"} sx={{mt: 2}}>{group}</Typography>
                    </Grid>
                    {groupedData[group].map((value) => {
                        return <Grid item xs={6} sm={4} md={3} key={value.id}>
                            <IntegrationItem userId={user._id} item={value} isConnected={user.integrations.includes(value.id)}/>
                        </Grid>
                    })}
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default IntegrationList;