import { Avatar, Box, Divider, ListItem, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import { forwardRef } from "react";
import MainCard from "../MainCard";
import Banner from "./Banner";
import { BANNER_PLACEHOLDER } from "../../utils/global";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { EnvironmentOutlined, GlobalOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";

const CardExportView = forwardRef(({cardData}, ref)=>{
    return (
        <div ref={ref} style={{ position: 'absolute', left: '-9999px' }}>
            <MainCard
                headerPadding={1}
                sx={{
                    minHeight: "calc(100vh - 180px)",
                    width: "100%"
                }}
            >
                <Stack spacing={2}>
                <div style={{ position: 'relative' }}>
                    <Banner image={cardData?.banner??BANNER_PLACEHOLDER} />
                    <Avatar
                    src={cardData?.picture}
                    sx={{
                        border: '4px solid white',
                        width: 84,
                        height: 84,
                        position: 'absolute',
                        bottom: 16,
                        left: '50%',
                        transform: 'translate(-50%, 50%)'
                    }}
                    />
                </div>

                <Stack display={'flex'} alignItems={'center'} sx={{mt: 3}}>
                <Typography variant="h4">{cardData?.name?.firstName} {cardData?.name?.middleName} {cardData?.name?.lastName}</Typography>
                <Typography variant="body1">{cardData?.company?.title}</Typography>
                </Stack>

                <Typography variant="body2" sx={{ textAlign: 'center', color: 'grey' }}>
                {cardData?.bio}
                </Typography>

                { cardData?.company?.companyName && <Divider /> }

                {
                    cardData?.company?.companyName && (
                        <ListItem sx={{ px: 0, py: '4px', alignItems: 'flex-start' }}>
                        <ListItemIcon sx={{ minWidth: '32px', marginTop: '8px', marginRight: '8px' }}>
                            <Avatar src={cardData?.logo}>
                            <HiBuildingOffice2 />
                            </Avatar>
                        </ListItemIcon>
                        <ListItemText sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                            <Typography variant="h5">{cardData?.company?.companyName}</Typography>
                            <Box>
                            <Typography variant="caption">{cardData?.company?.department}</Typography>
                            </Box>
                        </ListItemText>
                        </ListItem>
                    )
                }

                {
                    cardData?.email && (
                        <Stack direction={'row'} alignItems={'center'} spacing={2}>
                        <MailOutlined />
                        <Typography>{cardData?.email}</Typography>
                        </Stack>
                    )
                    }

                    {
                    cardData?.phoneNumber && (
                        <Stack direction={'row'} alignItems={'center'} spacing={2}>
                        <PhoneOutlined />
                        <Typography>{cardData?.phoneNumber}</Typography>
                        </Stack>
                    )
                    }

                    {
                    cardData?.location && (
                        <Stack direction={'row'} alignItems={'center'} spacing={2}>
                        <EnvironmentOutlined />
                        <Typography>{cardData?.location}</Typography>
                        </Stack>
                    )
                    }

                    {
                    cardData?.website && (
                        <Stack direction={'row'} alignItems={'center'} spacing={2}>
                        <GlobalOutlined />
                        <Typography>{cardData?.website}</Typography>
                        </Stack>
                    )
                    }

                    {
                    cardData?.fields && cardData?.fields.length>0 && (
                        <Divider>
                        <Typography variant="body2">Follow Me On</Typography>
                        </Divider>
                    )
                    }
                </Stack>
            
            
            </MainCard>
        </div>
    )
})

export default CardExportView;