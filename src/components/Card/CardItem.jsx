import { Avatar, Box, Button, Chip, Divider, Stack, Typography } from '@mui/material';
import MainCard from '../MainCard';
import Banner from './Banner';
import { BANNER_PLACEHOLDER, CARD_IMAGE_PATH } from '../../utils/global';
import CardOptions from './CardOptions';
import { useNavigate } from 'react-router-dom';
import { formatDateDistance } from '../../utils/utils';

const CardItem = ({cardData, handlePreviewClick, handleDeleteClick}) => {

  const navigate = useNavigate();

  const isUpdated = cardData.updated;

  const timestamp = `${isUpdated ? 'Updated ': 'Created '} ${formatDateDistance(isUpdated ?? cardData.created)}`;

  return (
    <MainCard
      title={
        <div style={{ position: 'relative' }}>
          <Banner image={cardData?.banner ?? BANNER_PLACEHOLDER}/>
          <Avatar
            src={`${CARD_IMAGE_PATH}${cardData._id}%2F${cardData.picture? 'profile': cardData.logo ? 'logo': 'banner'}.jpg?alt=media`}
            sx={{
              border: '4px solid white',
              width: 84,
              height: 84,
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translate(-50%, 50%)'
            }}
          />
        </div>
      }
    >
      <Stack spacing={2}>
        <Box display={'flex'}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h5">{cardData?.name?.firstName} {cardData?.name?.lastName}</Typography>
            <Typography variant="body2" sx={{ color: 'gray' }}>
              {cardData?.company?.title} at {cardData?.company?.companyName}
            </Typography>
          </Box>
          <Box sx={{ flexShrink: 0, ml: 0.75 }}>
            <CardOptions
              cardData={cardData}
              onDelete={handleDeleteClick}
              onEdit={()=>navigate(`/dashboard/card?cardId=${cardData._id}`)}
            />
          </Box>
        </Box>
        <Divider />
        <Typography variant="body1">
          {cardData?.bio}
        </Typography>
        <div>
          <Chip size="small" variant="outlined" label={cardData?.cardName} sx={{ color: 'grey' }} />
        </div>

        <Box display="flex" justifyContent={"space-between"} alignItems={"center"}>
          <Typography variant="caption" sx={{color: "grey"}}> {timestamp} </Typography>
          <Button variant="outlined" size="small" sx={{ height: '30px' }} onClick={handlePreviewClick}>
            View
          </Button>
        </Box>
      </Stack>
    </MainCard>
  );
};

export default CardItem;
