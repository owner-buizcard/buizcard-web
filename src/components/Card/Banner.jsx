import { CardMedia } from '@mui/material'
import React from 'react'

const Banner =({image, height, sharpEdge})=>{

  const isEmpty  = image==null || image?.length<=0;

  const handleImageError = (e) => {
      e.target.onerror = null;
      e.target.src = "https://firebasestorage.googleapis.com/v0/b/bizcard-web.appspot.com/o/pexels-melvin-buezo-18946900.jpg?alt=media&token=c9369725-dfb3-4417-a855-efc3bd4ff97a"
  }

  return (
    <CardMedia
        component="img"
        height= { height ?? 'auto' }
        image={ isEmpty ? 'none' : image}
        alt="Paella dish"
        onError={handleImageError}
        sx={{background: "#f5f5f5", borderRadius: sharpEdge ? 0 : "6px"}}
    />
  )
}

export default Banner