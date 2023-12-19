import { Box } from '@mui/material'
import React from 'react'
import { QRCode } from 'react-qrcode-logo'
import { useTheme } from '@emotion/react';

function QRCodeView({cardLink, qrStyle, fgColor, eyeColor, eyeStyle, logo, ignoreOutline}) {

    const eyeRadius = eyeStyle==='leaf'
        ? [[10, 10, 0, 10], [10, 10, 10, 0], [10, 0, 10, 10]]
        : eyeStyle==='square'
        ? [0, 0, 0]
        : eyeStyle==='circle'
        ? [10, 10, 10]
        : [[10, 10, 0, 10], [10, 10, 10, 0], [10, 0, 10, 10]];

    const theme = useTheme();

  return (
    <Box sx={{
        m: 3,
        width: "200px",
        height: "200px",
        position: "relative",
        border: ignoreOutline? "none" :"1px dashed grey",
        borderRadius: "8px",
    }}>

        <Box 
        sx={{
            background: "#fff",
            borderRadius: ignoreOutline?  "3px":"100px",
            position: "absolute",
            left: -15,
            top: -15,
            width: "230px",
            height: "230px",
        }}/>

        <Box
            sx={{
                position: "absolute",
                padding: "16px"
            }}
        >
            <QRCode
                quietZone={0}
                size={168}
                logoWidth={168 * 0.25}
                logoHeight={168 * 0.25}
                fgColor={fgColor ?? '#000'}
                value={cardLink}
                logoImage={logo}  
                eyeRadius={eyeRadius}
                qrStyle= {qrStyle ?? 'dots'}
                eyeColor={ eyeColor ?? theme.palette.secondary.main}
            />
        </Box>
    </Box>
  )
}

export default QRCodeView