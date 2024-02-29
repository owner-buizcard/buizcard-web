import { Avatar, Box, Divider, Grid, IconButton, ListItem, ListItemIcon, ListItemText, Skeleton, Stack, Typography } from "@mui/material";
import { getUserAnalytics } from "../../network/service/analyticsService";
import { useEffect, useState } from "react";
import MainCard from "../../components/MainCard";
import CountUp from 'react-countup';
import { PiDownload, PiEye, PiLink, PiPerson } from "react-icons/pi";
import { MdOutlineShowChart } from "react-icons/md";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateAnalytics } from "../../store/reducers/app";
import { ReloadOutlined } from "@ant-design/icons";
import { useTheme } from "@emotion/react";


const Analytics=()=>{

    const analytics = useSelector((state)=>state.app.analytics);
    const dispatch = useDispatch();
    const theme = useTheme();

    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);

    const [sortedCards, setSortedCards] = useState([]);

    const [insights, setInsights] = useState([
        {
            id: "viewCount",
            name: "Total Views",
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

    useEffect(()=>{
        const init=async()=>{
            if(loading){

                let data;

                if(analytics==null || refresh){
                    data = await getUserAnalytics();
                    dispatch(updateAnalytics(data));
                }else{
                    data = analytics;
                }

                const totals = data.totals;

                const updatedInsights = insights.map(insight => {
                    switch (insight.id) {
                        case 'viewCount':
                            return { ...insight, count: totals.totalViewCount };
                        case 'uniqueVisitCount':
                            return { ...insight, count: totals.totalUniqueVisitCount };
                        case 'savedCount':
                            return { ...insight, count: totals.totalSavedCount };
                        case 'webClickCount':
                            return { ...insight, count: totals.totalWebClickCount };
                        default:
                            return insight;
                    }
                });
                setSortedCards(data.sortedCards);
                setInsights(updatedInsights);
            }
            setLoading(false);
        }
        init();
    }, [loading, refresh])

    const reload = ()=>{
        setLoading(true);
        setRefresh(true);
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography variant="h4">Analytics</Typography>
                    <IconButton onClick={reload}>
                    <Box sx={{ border: `1px solid ${theme.palette.grey[300]}`, background: "#fff", borderRadius: '4px', p: 1 }}>
                        <ReloadOutlined />
                    </Box>
                    </IconButton>
                </Stack>
            </Grid>
            <Grid item xs={12} sm={8} spacing={3}>
                <Grid container spacing={3}>
                    { 
                        insights.map((insight)=>(
                            <Grid item xs={12} sm={6}>
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
                </Grid>
            </Grid>
            <Grid item xs={12} sm={4}>

                <MainCard>
                <Typography variant="body1" color={"grey"} sx={{mb: 1}}>Top performing cards</Typography>
                {
                    sortedCards.map((sorted)=>(
                        <>
                            <ListItem sx={{ px: '0px', py: '12px', width: "100%" }}>
                                <ListItemIcon sx={{ minWidth: '32px', marginRight: '16px' }}>
                                    <Avatar src={sorted.card?.picture ?? sorted.card?.logo}/>
                                </ListItemIcon>
                                <ListItemText>
                                    <Typography>{sorted.card?.name?.firstName} {sorted.card?.name?.middleName} {sorted.card?.name?.lastName}</Typography>
                                    <Typography variant="body2" color={"grey"}>{sorted.card?.cardName}</Typography>
                                </ListItemText>
                                <ListItemIcon sx={{ minWidth: '32px', marginRight: '16px' }}>
                                    <MdOutlineShowChart style={{fontSize: 32}}/>
                                    <Typography variant="subtitle1" color={"black"}>{sorted.analytics?.viewCount}</Typography>
                                </ListItemIcon>
                            </ListItem>
                            <Divider/>
                        </>
                    ))
                }
                </MainCard>

            </Grid>
        </Grid>
    )
}

export default Analytics;