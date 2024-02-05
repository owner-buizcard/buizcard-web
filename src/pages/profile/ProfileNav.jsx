import { Avatar, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import MainCard from "../../components/MainCard";
import { useSelector } from "react-redux";
import { CreditCardOutlined, UserOutlined } from "@ant-design/icons";

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
  const textColor = 'text.primary';
  const iconSelectedColor = 'primary.main';

  return (
    <MainCard>
      <Stack alignItems="center" spacing={2}>
        <Avatar sx={{ width: 100, height: 100 }} />
        <Stack spacing={0.2}>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center", color: "gray" }}>
            {user.designation}
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
