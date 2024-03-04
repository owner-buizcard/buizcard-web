import { Avatar, Box, Button, Divider, Grid, ListItem, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import Banner from './Banner';
import { EnvironmentOutlined, GlobalOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import MainCard from '../MainCard';
import { HiBuildingOffice2 } from 'react-icons/hi2';
import { useSelector } from 'react-redux';
import { BANNER_PLACEHOLDER } from '../../utils/global';
import { IoMdOpen } from 'react-icons/io';
import { useTheme } from '@emotion/react';
import AvatarBanner from './AvatarBanner';

const CardPreview = ({cardData, isLive=true, removePadding=false}) => {
  
  const theme = useTheme();

  return (
    <MainCard
      headerPadding={1}
      title={ !isLive && <Box sx={{marginBottom: "24px"}}>
        <AvatarBanner image={cardData?.banner} picture={cardData?.picture} />
      </Box>}
      sx={{
        minHeight: "calc(100vh - 180px)",
        width: "100%"
      }}
    >
      <Stack spacing={2}>

          { isLive && <Stack justifyContent={"center"} alignItems={"center"} sx={{width: "100%", mb: 1}} spacing={0.6}>
            <Typography variant='h5'>Card Live Preview</Typography>
            <Stack direction={"row"} sx={{color: theme.palette.primary.main}} spacing={0.5} alignItems={"center"}>
              <Typography variant='caption' sx={{cursor: "pointer"}} onClick={()=> window.open(cardData.cardLink, "_blank")}>View Card</Typography>
              <IoMdOpen />
            </Stack>
          </Stack> }

          { isLive && <div style={{ position: 'relative', marginBottom: "-20px" }}>
            <Banner image={cardData?.banner??BANNER_PLACEHOLDER} theme={cardData?.theme}/>
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
          </div> }
          <Stack spacing={2} sx={{background: `linear-gradient(to bottom, ${cardData?.theme} 0%, #fff 100%)`, pt: 6, pl: 2, pr: 2}}>

            <Stack display={'flex'} alignItems={'center'} sx={{marginTop: "30px"}}>
              <Typography variant="h4">{cardData?.name?.prefix} {cardData?.name?.firstName} {cardData?.name?.middleName} {cardData?.name?.lastName}</Typography>
              <Typography variant="body1">{cardData?.company?.title}</Typography>
            </Stack>

            <Typography variant="body2" sx={{ textAlign: 'center', color: 'grey' }}>
              {cardData?.bio}
            </Typography>
          </Stack>

          <Stack spacing={2} sx={{pl: 2, pr: 2}}>
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
            cardData?.address && (
              <Stack direction={'row'} alignItems={'center'} spacing={2}>
                <EnvironmentOutlined />
                <Typography>{cardData?.address?.addressLine1}, {cardData?.address?.city}, {cardData?.address?.state}, {cardData?.address?.country} - {cardData?.address?.pincode}</Typography>
              </Stack>
            )
          }

          {
            cardData?.company?.companyWebsite && (
              <Stack direction={'row'} alignItems={'center'} spacing={2}>
                <GlobalOutlined />
                <Typography>{cardData?.company?.companyWebsite}</Typography>
              </Stack>
            )
          }

          { cardData?.company?.companyDescription && <MainCard>
          <Typography variant="body2" sx={{ textAlign: "justify" }}>
            {cardData?.company?.companyDescription}
          </Typography>
          </MainCard> }

          {cardData?.badges && cardData?.badges?.length>0 && <Divider/> }
         
          <Grid container spacing={0}>
            {
              cardData?.badges?.map((badge, idx)=>{
                return <Grid key={idx} xs={3} item>
                  <Box
                      component={"img"}
                      src={badge}
                      width={"100%"}
                      height={"100%"}
                      p={1}
                  />
                </Grid>
              })
            }
          </Grid>

          {
            cardData?.fields && cardData?.fields.length>0 && (
              <Divider>
                <Typography variant="body2">Follow Me On</Typography>
              </Divider>
            )
          }
          </Stack>
      </Stack>

      <Grid container  alignItems={"center"} justifyContent={"center"} spacing={2}>
      {
        cardData?.fields?.map((item)=>(
          
          <Grid item key={item.id} xs={ !item.highlight ? 2 : 12}>

            <ListItem sx={{ my: 2, px: 0, py: '4px', alignItems: 'center', justifyContent: item.highlight ? 'start': 'center' }}>
              <ListItemIcon sx={{ minWidth: '32px', marginRight: '8px' }}>
                <Avatar src={`https://firebasestorage.googleapis.com/v0/b/bizcard-web.appspot.com/o/${item.icon}?alt=media`} />
              </ListItemIcon>
              {
                item.highlight && <Stack sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                  <Typography variant="body1">{item.title}</Typography>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'grey' }}>
                      {item.description}
                    </Typography>
                  </Box>
                </Stack>  
              }
            </ListItem>

          </Grid>

        ))
      }
      </Grid>

    </MainCard>
  );
};

export default CardPreview;
