import { useTheme } from '@emotion/react';
import { Grid, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const GalleryView = ({backgrounds, onClick, selected}) => {

  const theme = useTheme();

  return (
    backgrounds?.map((data, index)=>(
        <Fragment key={index} >
        <Grid item xs={12}>
            <Typography variant="body1" color={"gray"}>{data.category}</Typography>
        </Grid>
        {data.items.map((image, imageIndex) => (
            <Grid item xs={12} sm={4} key={imageIndex}>
                <LazyLoadImage
                    effect="blur"
                    height={'140px'}
                    width={'100%'}
                    src={image.normal}
                    alt={data.category}
                    style={{
                    border: selected._id==image._id ?`3px solid ${theme.palette.primary.main}` : 'none',
                    borderRadius: "6px",
                    top: '0',
                    left: '0',
                    objectFit: 'cover', 
                    cursor: 'pointer'
                    }}
                    onClick={() => onClick(image)}
                />
            </Grid>
        ))}
        </Fragment>
    )
  ));
};

export default GalleryView;
