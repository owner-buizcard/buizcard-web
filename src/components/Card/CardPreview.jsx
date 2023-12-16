import { Avatar, Box, Button, Divider, Grid, ListItem, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import Banner from './Banner';
import { EnvironmentOutlined, GlobalOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import MainCard from '../MainCard';
import { HiBuildingOffice2 } from 'react-icons/hi2';
import { useSelector } from 'react-redux';
import { BANNER_PLACEHOLDER } from '../../utils/global';
import { IoMdOpen } from 'react-icons/io';
import { useTheme } from '@emotion/react';

const CardPreview = ({cardData}) => {
  
  const theme = useTheme();

  return (
    <MainCard
      headerPadding={1}
      sx={{
        minHeight: "calc(100vh - 180px)",
        width: "100%"
      }}
    >
      <Stack spacing={2}>

          <Stack justifyContent={"center"} alignItems={"center"} sx={{width: "100%", mb: 1}} spacing={0.6}>
            <Typography variant='h5'>Card Live Preview</Typography>
            <Stack direction={"row"} sx={{color: theme.palette.primary.main}} spacing={0.5} alignItems={"center"}>
              <Typography variant='caption' >View Card</Typography>
              <IoMdOpen />
            </Stack>
          </Stack>

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

        <Stack display={'flex'} alignItems={'center'} sx={{mt: 2}}>
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
