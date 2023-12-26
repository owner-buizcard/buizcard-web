import { Avatar, Box, Button, Checkbox, Divider, FormControlLabel, Grid, IconButton, ListItem, ListItemIcon, ListItemText, Skeleton, Stack, Typography } from "@mui/material";
import MainCard from "../../../../components/MainCard";
import CountUp from 'react-countup';
import { PiDownload, PiEye, PiLink, PiPerson } from "react-icons/pi";
import LineChart from "../../../../components/charts/LineChart";
import { useEffect, useState } from "react";
import { DownloadOutlined, EyeOutlined, GroupOutlined, LinkOutlined, MoreOutlined, ShareAltOutlined, UserOutlined } from "@ant-design/icons";
import { getCardAnalytics, getCardLog } from "../../../../network/service/analyticsService";
import { formatDateDistance } from "../../../../utils/utils";

const AnalyticsTab =({cardData})=>{

    const [cardLog, setCardLog] = useState([]);

    const [series, setSeries] = useState(null);
    const [seriesDate, setSeriesDate] = useState([]);

    const [insights, setInsights] = useState([
        {
            id: "viewCount",
            name: "Total Card Views",
            count: 0,
            icon: <PiEye fontSize={"24px"} color="#ff2052"/>
        },
        {
            id: "uniqueVisitCount",
            name: "Total Unique Visitors",
            count: 0,
            icon: <PiPerson fontSize={"24px"} color="#ff5e20"/>
        },
        {
            id: "savedCount",
            name: "Total Downloads",
            count: 0,
            icon: <PiDownload fontSize={"24px"} color="#2051ff"/>
        },
        {
            id: "webClickCount",
            name: "Total Links Taps",
            count: 0,
            icon: <PiLink fontSize={"24px"} color="#5f20ff"/>
        }
    ]);

    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const init=async()=>{
            if(loading){

                const [data, cardLog] = await Promise.all([ 
                    getCardAnalytics(cardData._id),
                    getCardLog(cardData._id)
                ])

                const updatedInsights = insights.map(insight => {
                    switch (insight.id) {
                        case 'viewCount':
                            return { ...insight, count: data.viewCount };
                        case 'uniqueVisitCount':
                            return { ...insight, count: data.uniqueVisitCount };
                        case 'savedCount':
                            return { ...insight, count: data.savedCount };
                        case 'webClickCount':
                            return { ...insight, count: data.webClickCount };
                        default:
                            return insight;
                    }
                });

                const weekDatesArray = data?.weekLogViews?.map(item => item.date)??[];
                const weekCountsArray = data?.weekLogViews?.map(item => item.count)??[];
                const logCountsArray = data?.weekLogSave?.map(item => item.count)??[];

                setSeries([
                    {
                        name: 'Cards Viewed',
                        data: weekCountsArray
                    },
                    {
                        name: 'Cards Saved',
                        data: logCountsArray
                    }
                ])
                setSeriesDate(weekDatesArray)
                setCardLog(cardLog);
                setInsights(updatedInsights);
            }
            setLoading(false);
        }
        init();
    }, [loading])

    return ( 
        <Grid container spacing={3}>
            { 
                insights.map((insight)=>(
                    <Grid item xs={3}>
                        <MainCard>
                            {
                                !loading ? <Stack>
                                    <Typography variant="body1" color={"grey"}>{insight.name}</Typography>
                                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                        {insight.icon}
                                        <CountUp start={0} end={insight?.count??0} duration={2.5} separator="," style={{fontSize: "32px"}} />
                                    </Stack>
                                </Stack>
                                : <Skeleton variant="rectangular" height={75} />
                            }
                        </MainCard>
                    </Grid>
                ))
            }

            <Grid item xs={8}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item >
                        <Typography variant="h5" sx={{py: 1}}>Views over time</Typography>
                    </Grid>
                    {/* <Grid item>
                        <Stack direction="row" alignItems="center" spacing={4} sx={{px: 1}}>
                        
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Qrcode" />
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Share" />
                        </Stack>
                    </Grid> */}
                </Grid>
                <div style={{height: "12px"}}/>
                <MainCard>
                    <LineChart data={series??[]} date={seriesDate}/>
                </MainCard>
            </Grid>
            <Grid item xs={4}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item >
                        <Typography variant="h5" sx={{py: 1}}>Recent Activity</Typography>
                    </Grid>
                    {/* <Grid item>
                        <Stack direction="row" alignItems="center" spacing={4} sx={{px: 1}}>
                        
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Views" />
                        </Stack>
                    </Grid> */}
                </Grid>
                <div style={{height: "12px"}}/>
                <MainCard
                    sx={{
                        minHeight: "508px",
                        alignItems: cardLog.length!==0 ? "none": "center",
                        justifyContent: "center",
                        display: "flex"
                    }}
                >
                   { cardLog.length===0
                        ? <Typography>No recent data found</Typography> 
                        : <>
                            {
                                cardLog.map((log)=>(
                                    <>
                                        <ListItem sx={{ px: '0px', py: '12px', width: "100%" }}>
                                            <ListItemIcon sx={{ minWidth: '32px', marginRight: '16px' }}>
                                                <Avatar
                                                    sx={{
                                                        background: log.action.type=="unique-visit" 
                                                            ? "#3498db": log.action.type=="webclick"
                                                            ? "#e74c3c": log.action.type=="save"
                                                            ? "#2ecc71": log.action.type=="share"
                                                            ? "#9b59b6": log.action.type=="connect"
                                                            ? "#e67e22" : "#f1c40f"
                                                    }}
                                                >
                                                {
                                                        log.action.type=="unique-visit"
                                                        ? <UserOutlined/>
                                                        : log.action.type=="webclick"
                                                        ? <LinkOutlined/>
                                                        : log.action.type=="save"
                                                        ? <DownloadOutlined/>
                                                        : log.action.type=="share"
                                                        ? <ShareAltOutlined/>
                                                        : log.action.type=="connect"
                                                        ? <GroupOutlined/>
                                                        : <EyeOutlined/>
                                                }  
                                                </Avatar>
                                            </ListItemIcon>
                                            <ListItemText>
                                                <Typography>{log.action.prompt}</Typography>
                                                <Typography variant="body2" color={"grey"}>{formatDateDistance(log.created)}</Typography>
                                            </ListItemText>
                                        </ListItem>
                                        <Divider/>
                                    </>
                                ))
                            }
                        </>}
                </MainCard>
            </Grid>
        </Grid>
    )   
}

export default AnalyticsTab;