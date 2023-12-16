import { Stack, Typography } from '@mui/material';
import MainCard from '../MainCard';
import { useSelector } from 'react-redux';
import QRCodeView from '../QRCodeView';

const QrCodePreview = ({cardData}) => {

  return (
    <MainCard
      headerPadding={1}
      sx={{
        minHeight: "200px",
        width: "100%"
      }}    
    >
            <Stack justifyContent={"center"} alignItems={"center"} sx={{height: "100%"}} spacing={0.6}>
                <Typography variant='h5'>My QR Code</Typography>
                <Typography variant='caption'>Your customized qr code</Typography>

                <div style={{height: '16px'}}/>
                
                <div id="qrcode-container">
                    <QRCodeView
                        cardId={'test'} 
                        logo={cardData?.qr?.logo}
                        qrStyle={cardData?.qr?.codeStyle}
                        fgColor={cardData?.qr?.fgColor}
                        eyeColor={cardData?.qr?.eyeColor}
                        eyeStyle={cardData?.qr?.eyeStyle}
                    />
                </div>
            </Stack>

    </MainCard>
  );
};

export default QrCodePreview;
