import { CardMedia } from '@mui/material'
import React from 'react'
import { BANNER_PLACEHOLDER } from '../../utils/global';

const Banner =({image, height, sharpEdge, theme})=>{

  const isEmpty  = image==null || image?.length<=0;

  const handleImageError = (e) => {
      e.target.onerror = null;
      e.target.src = BANNER_PLACEHOLDER
  }

  return (
    <CardMedia
        component="img"
        height= { height ?? 'auto' }
        image={ isEmpty ? 'none' : image}
        alt=""
        onError={handleImageError}
        sx={{background: "#f5f5f5", borderRadius: sharpEdge ? 0 : "6px"}}
    />
  )
}

export default Banner