import { CloseOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { IconButton, Stack } from "@mui/material";
import { useState } from "react";

const CloseButton = styled(IconButton)(({ theme }) => ({
    borderRadius: 25,
    '&:hover': {
      backgroundColor: '#000000',
    },
    '&.MuiIconButton-sizeLarge': {
      width: theme.spacing(5.5),
      height: theme.spacing(5.5),
      fontSize: '1.25rem',
    },
    '&.MuiIconButton-sizeMedium': {
      width: theme.spacing(4.5),
      height: theme.spacing(4.5),
      fontSize: '1rem',
    },
    '&.MuiIconButton-sizeSmall': {
      width: theme.spacing(3.75),
      height: theme.spacing(3.75),
      fontSize: '0.75rem',
    }
  }));

const ImagePicker =({id, children, value, height, width, onRemove, onChange})=>{

    const [image, setImage] = useState(value);

    const removeImage = ()=>{
        setImage((_)=>{
            onRemove();
            return null;
        });
    }

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
          const selectedFile = e.target.files[0];
          const reader = new FileReader();
          reader.onload = () => {
            setImage(reader.result);
            onChange(reader.result);
          };
          reader.readAsDataURL(selectedFile);
        }
    };

    return ( 
        <Stack
            sx={{
                cursor: "pointer",
                position: "relative"
            }}
        >
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id={`fileInput-${id}`}
            />
            { image && <CloseButton size="small" onClick={removeImage} sx={{position: "absolute", zIndex: "1000", top: -6, right: -6, background: "#00000088"}}>
                    <CloseOutlined style={{color: "white"}} fontSize={"18px"} />
                </CloseButton> }
            <label htmlFor={`fileInput-${id}`}>
                {
                    image
                        ? <img src={image} width={width} height={height} style={{borderRadius: "8px", cursor: "pointer"}} alt="Preview" />
                        : children
                }
            </label>
        </Stack>
    )
}

export default ImagePicker;