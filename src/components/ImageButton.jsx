import React, { useState } from "react";
import Button from "@mui/material/Button";
import ImageUpload from "./ImageUpload";

function ImageButton({tag, onUpload, type, disabled}) {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        handleOpen();
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const  handleUpload = async(type, blob, isDelete) => {
    if(blob){
      // const imageUrl = URL.createObjectURL(blob);
      handleClose();
      onUpload(blob);
    }
  };

  const pickImage = ()=>{
    document.getElementById(`${tag}-raised-button-file`).click();
  }

  return (
    <div>
      <Button variant="contained" onClick={pickImage} disabled={disabled}>Upload</Button>
      <input
        style={{ display: "none" }}
        id={`${tag}-raised-button-file`}
        onChange={handleImageChange}
        type="file"
        accept=".jpg,.png,.jpeg,.webpp"
      />
      {isOpen && (
        <ImageUpload
          isOpen={isOpen}
          handleClose={handleClose}
          aspectRatio={ type=="rect" ? 2 : 1}
          type="cover" 
          title="Crop Image"
          isPreview={false}
          selectedImage={selectedImage}
          handleUpload={handleUpload}
          changeImage={handleImageChange}
        />
      )}
    </div>
  );
}

export default ImageButton;
