import { Box, Button, Checkbox, FormControlLabel, Grid, IconButton, Stack, Typography } from "@mui/material";
import MainCard from "../../../../components/MainCard";
import CountUp from 'react-countup';
import { PiDownload, PiEye, PiLink, PiPerson } from "react-icons/pi";
import LineChart from "../../../../components/charts/LineChart";
import { useState } from "react";
import { MoreOutlined } from "@ant-design/icons";

const AnalyticsTab =({cardData})=>{

    const [slot, setSlot] = useState('popcode');

    const insights = [
        {
            name: "Total Card Views",
            count: 1200,
            icon: <PiEye fontSize={"24px"} color="#ff2052"/>
        },
        {
            name: "Total Unique Visitors",
            count: 2400,
            icon: <PiPerson fontSize={"24px"} color="#ff5e20"/>
        },
        {
            name: "Total Downloads",
            count: 3100,
            icon: <PiDownload fontSize={"24px"} color="#2051ff"/>
        },
        {
            name: "Total Links Taps",
            count: 9200,
            icon: <PiLink fontSize={"24px"} color="#5f20ff"/>
        }
    ];

    return ( 
        <Grid container spacing={3}>
            {
                insights.map((insight)=>(
                    <Grid item xs={3}>
                        <MainCard>
                            <Stack>
                                <Typography variant="body1" color={"grey"}>{insight.name}</Typography>
                                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                    {insight.icon}
                                    <CountUp start={0} end={insight?.count??0} duration={2.5} separator="," style={{fontSize: "32px"}} />
                                </Stack>
                            </Stack>
                        </MainCard>
                    </Grid>
                ))
            }

            <Grid item xs={8}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Views over time</Typography>
                    </Grid>
                    <Grid item>
                        <Stack direction="row" alignItems="center" spacing={4} sx={{px: 1}}>
                        
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Qrcode" />
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Share" />
                        </Stack>
                    </Grid>
                </Grid>
                <div style={{height: "12px"}}/>
                <MainCard>
                    <LineChart slot={"week"}/>
                </MainCard>
            </Grid>
            <Grid item xs={4}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Recent Activity</Typography>
                    </Grid>
                    <Grid item>
                        <Stack direction="row" alignItems="center" spacing={4} sx={{px: 1}}>
                        
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Views" />
                        </Stack>
                    </Grid>
                </Grid>
                <div style={{height: "12px"}}/>
                <MainCard
                    sx={{
                        minHeight: "508px",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex"
                    }}
                >
                    <Typography>No recent data found</Typography>
                </MainCard>
            </Grid>
        </Grid>
    )   
}

export default AnalyticsTab;