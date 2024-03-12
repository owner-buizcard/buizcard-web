import { forwardRef } from "react";
import QRCodeView from "../QRCodeView";

const QrExportView = forwardRef(({cardData}, ref)=>{
    return (
        <div ref={ref} style={{ position: 'absolute', left: '-9999px' }}>
            <QRCodeView
                
                cardLink={cardData?.cardLink}
                // logo={cardData?.qr?.logo}
                qrStyle={cardData?.qr?.codeStyle}
                fgColor={cardData?.qr?.fgColor}
                eyeColor={cardData?.qr?.eyeColor}
                eyeStyle={cardData?.qr?.eyeStyle}
            />
        </div>        
    )               
})

export default QrExportView;