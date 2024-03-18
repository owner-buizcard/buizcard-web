import { Avatar, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import MainCard from "../../components/MainCard";
import { useSelector } from "react-redux";
import { CreditCardOutlined, UserOutlined } from "@ant-design/icons";
import { uploadCardImage } from "../../network/service/cardService";
import { useDispatch } from "react-redux";
import ImagePicker from "../../components/ImagePicker";
import AvatarPicker from "../../components/AvatarPicker";
import { useState } from "react";
import { updateAppUser } from "../../store/reducers/app";

const navigationItems = [
  { index: 0, icon: <UserOutlined />, label: "Personal Information" },
  { index: 1, icon: <CreditCardOutlined />, label: "Subscriptions" },
];

const ProfileNavItem = ({ item, index, onChange, textColor, iconSelectedColor }) => (
  <ListItemButton
    onClick={() => onChange(item.index)}
    selected={index === item.index}
    sx={{
      '&.Mui-selected': {
        bgcolor: 'primary.lighter',
        color: iconSelectedColor,
        '&:hover': {
          color: iconSelectedColor,
          bgcolor: 'primary.lighter',
        },
      },
    }}
  >
    <ListItemIcon
      sx={{
        color: index === item.index ? iconSelectedColor : textColor,
        ...(index === item.index && {
          bgcolor: 'primary.lighter',
          '&:hover': {
            bgcolor: 'primary.lighter',
          },
        }),
      }}
    >
      {item.icon}
    </ListItemIcon>
    <ListItemText
      primary={<Typography variant="h6">{item.label}</Typography>}
    />
  </ListItemButton>
);

const ProfileNav = ({ index, onChange }) => {

  const user = useSelector((state) => state.app.user);

  console.log(user);

  const textColor = 'text.primary';
  const iconSelectedColor = 'primary.main';

  const dispatch = useDispatch();

  const handleImageChange=(image)=>{
    console.log(image)
    const updatedUser = { ...user, picture: image };
    console.log(updatedUser)
    dispatch(updateAppUser(updatedUser));
  }   

  const uploadPicture = async(blob)=>{
      return await uploadCardImage({cardId: 'user', key: 'picture', file: blob, fileName: 'picture.jpeg' });
  }

  return (
    <MainCard>
      <Stack alignItems="center" spacing={2}>

        <ImagePicker
            tag={'picture'}
            icon={<UserOutlined style={{fontSize: "36px"}}/>}
            value={user?.picture}
            onChange={handleImageChange}
            onUpload={uploadPicture}
        />

        <Stack spacing={0.2}>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            {user?.firstName} {user?.lastName}
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center", color: "gray" }}>
            {user?.designation}
          </Typography>
        </Stack>
        <Stack spacing={1} sx={{ width: "100%" }}>
          {navigationItems.map((item) => (
            <ProfileNavItem
              key={item.index}
              item={item}
              index={index}
              onChange={onChange}
              textColor={textColor}
              iconSelectedColor={iconSelectedColor}
            />
          ))}
        </Stack>
      </Stack>
    </MainCard>
  );
};

export default ProfileNav;
