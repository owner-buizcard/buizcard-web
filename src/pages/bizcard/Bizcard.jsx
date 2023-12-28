import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar, Box, Button, CircularProgress, Divider, Fab, Grid, ListItem, ListItemIcon, ListItemText, Skeleton, Stack, Typography } from "@mui/material";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { DownloadOutlined, EnvironmentOutlined, GlobalOutlined, MailOutlined, PhoneOutlined, ShareAltOutlined, UserOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";

import MainCard from "../../components/MainCard";
import Banner from "../../components/Card/Banner";
import ShareDialog from "../../components/dialogs/ShareDialog";
import CardsDialog from "../../components/dialogs/CardsDialog";
import { getCardPreviewDetails } from "../../network/service/cardService";
import { checkCookies, downloadFile, generateVcard } from "../../utils/utils";
import { addCardLog } from "../../network/service/analyticsService";
import AvatarBanner from "../../components/Card/AvatarBanner";
import { connectPeople } from "../../network/service/connectService";
import ConnectFormDialog from "../../components/dialogs/ConnectFormDialog";

let count = 0;

const ICON_SIZE = "20px";
const MAX_CARD_WIDTH = "440px";

const Bizcard = () => {
  const { cardId } = useParams();
  const navigate = useNavigate();

  const fieldTypes = useSelector((state)=>state.app.fieldTypes);

  const [loading, setLoading] = useState(true);
  const [connectBtnloading, setConnectBtnLoading] = useState(false);
  const [cardData, setCardData] = useState(null);
  const [open, setOpen] = useState(false);
  const [openCards, setOpenCards] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const isLoggedIn = checkCookies();
  const cards = useSelector((state) => state.app.cards);
  const isOwnCard = cards && cards?.some((item) => item._id === cardId);
  let by = null;

  if (isLoggedIn) {
    by = useSelector((state) => state.app.user);
  }

  useEffect(() => {
  
    const init = async () => {
      const isVisited = Cookies.get("visited");
      const logType = isVisited ? 'view' : 'unique-visit';

      Cookies.set("visited", true);

      if(fieldTypes!=null && count===0){
        const [data] = await Promise.all([
          getCardPreviewDetails(cardId),
          addCardLog(cardId, by, logType)
        ]);
        count++;
        setCardData(data);
        setLoading(false);
      }
    };
  
    init();
  }, [loading]); 

  const saveCard = async () => {
    const vcfData = generateVcard(cardData);
    downloadFile (vcfData, `${cardData?.name?.firstName}-${cardData?.name?.lastName}-Bizcard`);
    await addCardLog(cardId, by, 'save');
    setOpenForm(true);
  };

  const goTocreate = () => {
    navigate('/register');
  };

  const onWebClick = async (item) => {
    window.open(item.link, "_blank", 'noopener,noreferrer');
    await addCardLog(cardId, by, 'webclick');
  };

  const connectCard =async ()=>{
    setConnectBtnLoading(true);
    await connectPeople(cardId);
    setConnectBtnLoading(false);
    setOpenCards(true)
  }

  return (
    <Box sx={{height: "100vh", position: "relative", display: "flex", justifyContent: "center"}}>
      <CardsDialog open={openCards} cardData={cardData} handleCancel={() => setOpenCards(false)} />
      {/* <ShareDialog open={open} cardId={cardData?._id} handleCancel={() => setOpen(false)} /> */}
      <ConnectFormDialog open={openForm} cardData={cardData} handleCancel={() => setOpenForm(false)} />

      {loading && <Skeleton variant="rectangular" sx={{maxWidth: MAX_CARD_WIDTH, width: "100%", height: "100vh"}} />}

      {!isOwnCard && !loading && (
        <Stack direction={"row"} sx={{position: "fixed", justifyContent: "center", bottom: 16, display: "flex", zIndex: 1000, maxWidth: MAX_CARD_WIDTH, width: "100%", px: 2}} spacing={3}>
          {/* <Fab variant="extended" color="primary" sx={{width: "100%", background: "#000"}} onClick={() => setOpen(true)}>
            <ShareAltOutlined style={{marginRight: ICON_SIZE, fontSize: ICON_SIZE}} />
            <Typography variant="body1">Share</Typography>
          </Fab> */}
          {isLoggedIn ? (
            <Fab variant="extended" color="primary" sx={{width: "50%", background: "#000"}} onClick={connectCard}>
              {
                connectBtnloading
                  ? <CircularProgress sx={{color: 'white'}} size={'1.5rem'}/>
                  : <>
                      <UserOutlined style={{marginRight: ICON_SIZE, fontSize: ICON_SIZE}} />
                      <Typography variant="body1">Connect</Typography>
                    </>
              }
            </Fab>
          ) : (
            <Fab variant="extended" color="primary" sx={{width: "50%", background: "#000"}} onClick={saveCard}>
              <DownloadOutlined style={{marginRight: ICON_SIZE, fontSize: ICON_SIZE}} />
              <Typography variant="body1">Save</Typography>
            </Fab>
          )}
        </Stack>
      )}

      {!loading && (
        <Box sx={{display: "flex", justifyContent: "center", px: 1, pt: 2, pb: 14, overflow: "auto", height: "fit-content"}}>
          <MainCard
            contentSX={{padding: "24px 8px"}}
            headerPadding={0}
            sx={{maxWidth: MAX_CARD_WIDTH, width: "100%"}}
            title={<AvatarBanner image={cardData?.banner} picture={cardData?.picture} />}
          >
          <Stack display={'flex'} alignItems={'center'} sx={{mt: 5}}>
          <Typography variant="h4">{cardData?.name?.prefix} {cardData?.name?.firstName} {cardData?.name?.middleName} {cardData?.name?.lastName}</Typography>
          <Typography variant="body1">{cardData?.company?.title}</Typography>
      </Stack>

      <Typography variant="body2" sx={{ textAlign: 'center', color: 'grey', px: 4, mt: 1 }}>
      {cardData?.bio}
      </Typography>
      
      <Grid container spacing={2} sx={{m: 0}}>

          <Grid item xs={12}>
          {
              cardData?.email && (
                  <Stack direction={'row'} alignItems={'center'} spacing={1}>
                  <MailOutlined />
                  <Typography>{cardData?.email}</Typography>
                  </Stack>
              )
          }
          </Grid>

          <Grid item xs={12}>
          {
              cardData?.phoneNumber && (
                  <Stack direction={'row'} alignItems={'center'} spacing={1}>
                  <PhoneOutlined />
                  <Typography>{cardData?.phoneNumber}</Typography>
                  </Stack>
              )
          }
          </Grid>

          <Grid item xs={12}>
          {
              cardData?.company?.companyWebsite && (
                  <Stack direction={'row'} alignItems={'center'} spacing={1}>
                  <GlobalOutlined />
                  <Typography>{cardData?.company?.companyWebsite}</Typography>
                  </Stack>
              )
          }
          </Grid>


          <Grid item xs={12}>
          {
              cardData?.address && (
                  <Stack direction={'row'} alignItems={'center'} spacing={1}>
                  <EnvironmentOutlined />
                  <Typography>{cardData?.address?.addressLine1}, {cardData?.address?.city}, {cardData?.address?.state}, {cardData?.address?.country} - {cardData?.address?.pincode}</Typography>
                  </Stack>
              )
          }
          </Grid>

      </Grid>

      <Divider sx={{my: 2}}/>

      {
          cardData?.company?.companyName && (
              <ListItem sx={{ px: '12px', alignItems: 'flex-start' }}>
              <ListItemIcon sx={{ minWidth: '32px', marginTop: '8px', marginRight: '8px' }}>
                  <Avatar src={cardData?.logo}>
                  <HiBuildingOffice2 />
                  </Avatar>
              </ListItemIcon>
              <ListItemText sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                  <Stack>
                      <Typography variant="h5">{cardData?.company?.companyName}</Typography>
                      <Typography variant="caption">{cardData?.company?.department}</Typography>
                  </Stack>
              </ListItemText>
              </ListItem>
          )
      }

      <Typography variant="body1" sx={{ textAlign: "justify", px: 2, mt: 1 }}>
      {cardData?.company?.companyDescription}
      </Typography>

      <Divider sx={{my: 3}}><Typography variant="caption">Follow me on</Typography></Divider>

      <Grid container sx={{justifyContent: "center", m: 0.5}}>

      {
          cardData?.fields?.map((item)=>(
              <Grid key={item.icon} item md={2} xs={3}>
                  <Box sx={{justifyContent: "center", display: "flex", cursor: "pointer"}} onClick={()=>onWebClick(item)}>
                      <img style={{width: "48px", height: "48px"}} src={`https://firebasestorage.googleapis.com/v0/b/bizcard-web.appspot.com/o/${item.icon}?alt=media`} />
                  </Box>
              </Grid>
          ))
      }

      </Grid>

      { !isLoggedIn &&  <Stack alignItems={"center"} sx={{mt: 8}}>
          <Typography variant="labelLight" sx={{color: "#FF8C00", fontWeight: 600}}> Want to create your Digital card? </Typography>
          <Button variant="outlined" sx={{boxShadow: 4, width: "300px", padding: "8px", my: 2}} onClick={goTocreate}>Create Your Own Profile</Button>
          <Typography variant="labelLight" > Join Bizcard Now ! </Typography>
      </Stack> }
          </MainCard>
        </Box>
      )}
    </Box>
  );
};

export default Bizcard;
